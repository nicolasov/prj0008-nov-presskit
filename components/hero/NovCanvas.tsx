'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * "NOV" behaves like light: a museum title projected onto a wall.
 *
 * One fullscreen shader plane. The word is a canvas texture (real
 * Newsreader glyphs) revealed through a noise threshold — developed
 * like a photograph, not faded — with fbm smoke kept under ~6%
 * luminance variance, a tiny opacity breathing, sub-pixel drift, and
 * a soft displacement radius around the pointer. No bounce, no scale,
 * no rotation.
 */

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uReveal;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform sampler2D uText;
  uniform float uPlaneAspect;
  uniform float uTexAspect;
  uniform float uWordScale;
  uniform float uWordCenterY;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // ---- atmosphere: slow ink drift, <=6% luminance variance ----
    vec2 sp = vec2(uv.x * uPlaneAspect, uv.y);
    float smoke = fbm(sp * 1.6 + vec2(uTime * 0.014, -uTime * 0.009));
    smoke += 0.5 * fbm(sp * 3.4 - vec2(uTime * 0.006, uTime * 0.011));
    smoke = smoothstep(0.55, 1.35, smoke) * 0.055;

    // ---- text uv: match the DOM word's measured box exactly ----
    float scaleY = uWordScale * uPlaneAspect / uTexAspect;
    vec2 tuv = vec2(
      (uv.x - 0.5) / uWordScale + 0.5,
      (uv.y - uWordCenterY) / scaleY + 0.5
    );

    // ---- distortion: sub-pixel drift + pointer displacement ----
    vec2 drift = (vec2(
      noise(sp * 2.4 + uTime * 0.05),
      noise(sp * 2.4 - uTime * 0.04)
    ) - 0.5) * 0.0045;

    vec2 toMouse = uv - uMouse;
    float md = exp(-length(vec2(toMouse.x * uPlaneAspect, toMouse.y)) * 5.0);
    vec2 mouseOff = normalize(toMouse + 1e-5) * md * 0.010;

    float glyph = 0.0;
    vec2 suv = tuv + drift + mouseOff;
    if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0) {
      glyph = texture2D(uText, suv).a;
    }

    // ---- reveal: developed out of darkness, not faded ----
    float grain = fbm(sp * 5.0 + 7.31);
    float reveal = smoothstep(grain - 0.22, grain + 0.22, uReveal * 1.35);

    // ---- breathing + scroll response ----
    float breath = 0.93 + 0.07 * sin(uTime * 0.42);
    float alpha = glyph * reveal * breath * (1.0 - uScroll * 0.7);

    vec3 bg = vec3(0.0196);            // #050505
    vec3 ink = vec3(0.918, 0.918, 0.902); // #EAEAE6

    // smoke enters first (quick fade on mount), the word develops after
    float smokeIn = min(1.0, uTime * 0.6);
    vec3 col = bg + ink * smoke * smokeIn;
    col = mix(col, ink, alpha * 0.92);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

type TextPayload = {
  texture: THREE.CanvasTexture;
  aspect: number;
  /** Fraction of the texture width the glyphs actually occupy. */
  wordFrac: number;
};

/** Draw "NOV" with the real loaded serif into an offscreen canvas. */
function makeTextTexture(fontFamily: string): TextPayload {
  const fontSize = 480;
  const word = 'NOV';
  const tracking = fontSize * 0.06; // mirrors the DOM 0.06em

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `300 ${fontSize}px ${fontFamily}`;
  const widths = [...word].map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (word.length - 1);

  const padX = fontSize * 0.06; // room for drift/displacement sampling
  const width = Math.ceil(total + padX * 2);
  const height = Math.ceil(fontSize * 1.3);
  canvas.width = width;
  canvas.height = height;

  // context resets on resize — set again
  ctx.font = `300 ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';

  let x = padX;
  [...word].forEach((ch, i) => {
    ctx.fillText(ch, x, height / 2);
    x += widths[i] + tracking;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  return { texture, aspect: width / height, wordFrac: total / width };
}

type SceneProps = {
  payload: TextPayload;
  startTime: number;
};

function Scene({ payload, startTime }: SceneProps) {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.45));
  const wordBox = useRef({ scale: 0.4, centerY: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.45) },
      uText: { value: payload.texture },
      uPlaneAspect: { value: 1 },
      uTexAspect: { value: payload.aspect },
      uWordScale: { value: 0.4 },
      uWordCenterY: { value: 0.5 },
    }),
    [payload],
  );

  // match the DOM word's measured box so the canvas word sits exactly
  // where the fallback <h1> renders (seamless handover, honest layout)
  useEffect(() => {
    const measure = () => {
      const h1 = document.querySelector<HTMLElement>('#arrival h1');
      if (!h1) return;
      const rect = h1.getBoundingClientRect();
      const scrollTop = window.scrollY;
      wordBox.current = {
        scale: rect.width / window.innerWidth / payload.wordFrac,
        centerY: 1 - (rect.top + scrollTop + rect.height / 2) / window.innerHeight,
      };
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [payload]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uPlaneAspect.value = viewport.width / viewport.height;
    mat.uniforms.uWordScale.value = wordBox.current.scale;
    mat.uniforms.uWordCenterY.value = wordBox.current.centerY;

    // reveal over ~3.2s after the texture is ready, eased out
    const t = Math.min(1, Math.max(0, (performance.now() - startTime) / 3200));
    mat.uniforms.uReveal.value = 1 - Math.pow(1 - t, 3);

    // scroll: how far the hero has left the viewport
    mat.uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

    // pointer follows physically (slow lerp)
    (mat.uniforms.uMouse.value as THREE.Vector2).lerp(mouseTarget.current, 0.045);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} vertexShader={VERTEX} fragmentShader={FRAGMENT} uniforms={uniforms} />
    </mesh>
  );
}

type NovCanvasProps = {
  /** Fires once the canvas is live and the DOM word can hand over. */
  onReady?: () => void;
};

export default function NovCanvas({ onReady }: NovCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [payload, setPayload] = useState<TextPayload | null>(null);
  const [inView, setInView] = useState(true);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!supportsWebGL()) return;

    let cancelled = false;
    const container = containerRef.current;
    const family = container ? getComputedStyle(container).fontFamily : 'serif';

    document.fonts.load(`300 100px ${family}`).then(() => {
      if (cancelled) return;
      startTimeRef.current = performance.now() + 400; // texture first, word at +400ms
      setPayload(makeTextTexture(family));
      onReady?.();
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 font-serif">
      {payload && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop={inView ? 'always' : 'never'}
          gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
          className="!absolute !inset-0"
        >
          <Scene payload={payload} startTime={startTimeRef.current} />
        </Canvas>
      )}
    </div>
  );
}
