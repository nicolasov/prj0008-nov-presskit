'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * "NOV" behaves like light: a museum title projected onto a wall.
 *
 * One fullscreen shader plane. The word is a canvas texture (real
 * Newsreader glyphs) revealed through a noise threshold — developed like a
 * photograph, not faded — with fbm smoke kept under ~6% luminance
 * variance, a tiny opacity breathing, sub-pixel drift, and a soft
 * displacement radius around the pointer. No bounce, no scale, no rotation.
 *
 * The 2026-07-03 sprint added a scrollytelling sequence, all derived from
 * one `uScroll` value (0→1, driven by Arrival's own pinned scroll range —
 * see components/sections/Arrival.tsx and docs/04-motion-system.md).
 * Retimed later the same day (Sprint 6.6: the red sweep runs ~35% longer,
 * and the word no longer disappears into the photograph — it floats above
 * it, tinted toward the signal red, at low opacity, until it disperses):
 *
 *   hold (0–0.35)        → nothing changes, the word simply stays.
 *   sweep (0.35–0.62)    → the red signal travels once across the glyphs.
 *   photograph (0.58–0.88) → the hero photo becomes visible behind/through
 *                            the letterforms; the word itself turns toward
 *                            red and thins to a low-opacity afterimage
 *                            floating above the frame — it never disappears.
 *   disperse (0.86–1.0)  → only now does the word break apart and fade.
 *
 * If the pacing is retimed, keep these four thresholds in sync with the
 * ones documented in docs/04-motion-system.md.
 */

const HERO_PHOTO = '/images/nov-dj-organic-house-buenos-aires-hero.jpg';

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
  uniform sampler2D uPhoto;
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

    // ---- scroll phases: one source of truth (uScroll) ----
    float sweep = smoothstep(0.35, 0.62, uScroll);
    float photoReveal = smoothstep(0.58, 0.88, uScroll);
    float disperseAmt = smoothstep(0.86, 1.0, uScroll);

    // ---- atmosphere: slow ink drift, <=6% luminance variance ----
    vec2 sp = vec2(uv.x * uPlaneAspect, uv.y);
    float smoke = fbm(sp * 1.6 + vec2(uTime * 0.014, -uTime * 0.009));
    smoke += 0.5 * fbm(sp * 3.4 - vec2(uTime * 0.006, uTime * 0.011));
    smoke = smoothstep(0.55, 1.35, smoke) * 0.055 * (1.0 - photoReveal * 0.6);

    // ---- text uv: match the DOM word's measured box exactly ----
    float scaleY = uWordScale * uPlaneAspect / uTexAspect;
    vec2 tuv = vec2(
      (uv.x - 0.5) / uWordScale + 0.5,
      (uv.y - uWordCenterY) / scaleY + 0.5
    );

    // ---- distortion: sub-pixel drift + pointer displacement ----
    // the word stays crisp through hold/sweep/photograph and only comes
    // apart once disperseAmt rises — dissolve happens after the reveal.
    float driftAmt = 0.0045 + disperseAmt * disperseAmt * 0.06;
    vec2 drift = (vec2(
      noise(sp * (2.4 + disperseAmt * 6.0) + uTime * 0.05),
      noise(sp * (2.4 + disperseAmt * 6.0) - uTime * 0.04)
    ) - 0.5) * driftAmt;

    vec2 toMouse = uv - uMouse;
    float md = exp(-length(vec2(toMouse.x * uPlaneAspect, toMouse.y)) * 5.0);
    vec2 mouseOff = normalize(toMouse + 1e-5) * md * 0.010;

    float glyph = 0.0;
    vec2 suv = tuv + drift + mouseOff;
    bool inBounds = suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0;
    if (inBounds) {
      glyph = texture2D(uText, suv).a;
    }

    // ---- reveal: developed out of darkness, not faded ----
    float grain = fbm(sp * 5.0 + 7.31);
    float reveal = smoothstep(grain - 0.22, grain + 0.22, uReveal * 1.35);

    // ---- breathing settles once the sweep begins — a deliberate moment,
    // not an ambient one ----
    float breath = mix(0.93 + 0.07 * sin(uTime * 0.42), 1.0, sweep);

    vec3 bg = vec3(0.0196);               // #050505
    vec3 ink = vec3(0.918, 0.918, 0.902); // #EAEAE6
    vec3 red = vec3(0.757, 0.216, 0.169); // #C1372B

    // ---- the photograph shows faintly through the letterforms — a
    // ghost of texture, never the dominant read ----
    vec3 letterColor = ink;
    if (inBounds && photoReveal > 0.0) {
      vec3 photoSample = texture2D(uPhoto, suv).rgb;
      float lum = dot(photoSample, vec3(0.299, 0.587, 0.114));
      vec3 graded = vec3(lum) * 0.82 + 0.02;
      letterColor = mix(ink, graded, photoReveal * 0.35);
    }

    // ---- the red signal travels once across the glyphs, then the word
    // itself settles into red — it never disappears into the photograph,
    // it floats above it, thinned to an afterimage ----
    if (inBounds) {
      float sweepPos = sweep * 1.5 - 0.25;
      float sweepBand = exp(-pow((tuv.x - sweepPos) * 3.0, 2.0));
      letterColor = mix(letterColor, red, sweepBand * 0.85 * (1.0 - photoReveal * 0.5));
      letterColor = mix(letterColor, red, photoReveal * 0.6);
    }

    float smokeIn = min(1.0, uTime * 0.6);
    vec3 col = bg + ink * smoke * smokeIn;

    // low, floating opacity once the photograph is present — a mark
    // above the frame, not a solid word
    float floatAlpha = mix(1.0, 0.4, photoReveal);
    float alpha = glyph * reveal * breath * floatAlpha * max(0.0, 1.0 - disperseAmt * 1.15);
    col = mix(col, letterColor, alpha * 0.92);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * True only for hardware-accelerated WebGL. Software rasterizers
 * (SwiftShader, llvmpipe) would burn the main thread compiling and
 * drawing the shader — those machines get the DOM word instead.
 */
function supportsHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    return !/swiftshader|llvmpipe|software/i.test(renderer);
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
  photoTexture: THREE.Texture;
  startTime: number;
};

function Scene({ payload, photoTexture, startTime }: SceneProps) {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.45));
  const wordBox = useRef({ scale: 0.4, centerY: 0.5 });
  const heroElRef = useRef<HTMLElement | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.45) },
      uText: { value: payload.texture },
      uPhoto: { value: photoTexture },
      uPlaneAspect: { value: 1 },
      uTexAspect: { value: payload.aspect },
      uWordScale: { value: 0.4 },
      uWordCenterY: { value: 0.5 },
    }),
    [payload, photoTexture],
  );

  useEffect(() => {
    heroElRef.current = document.getElementById('arrival');
  }, []);

  // match the DOM word's measured box so the canvas word sits exactly
  // where the fallback <h1> renders (seamless handover, honest layout).
  // The stage is position:sticky while pinned, so the box is stable
  // across the whole scroll sequence — no need to re-measure on scroll.
  useEffect(() => {
    const measure = () => {
      const h1 = document.querySelector<HTMLElement>('#arrival h1');
      if (!h1) return;
      const rect = h1.getBoundingClientRect();
      wordBox.current = {
        scale: rect.width / window.innerWidth / payload.wordFrac,
        centerY: 1 - (rect.top + rect.height / 2) / window.innerHeight,
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

    // single source of truth: Arrival's own pinned-scroll progress
    const raw = heroElRef.current
      ? parseFloat(getComputedStyle(heroElRef.current).getPropertyValue('--hero-scroll'))
      : 0;
    mat.uniforms.uScroll.value = Number.isFinite(raw) ? raw : 0;

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
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);
  const [inView, setInView] = useState(true);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!supportsHardwareWebGL()) return;

    let cancelled = false;
    const container = containerRef.current;
    const family = container ? getComputedStyle(container).fontFamily : 'serif';

    document.fonts.load(`300 100px ${family}`).then(() => {
      if (cancelled) return;
      startTimeRef.current = performance.now() + 400; // texture first, word at +400ms
      setPayload(makeTextTexture(family));
      onReady?.();
    });

    new THREE.TextureLoader().load(HERO_PHOTO, (tex) => {
      if (cancelled) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      setPhotoTexture(tex);
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
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 font-serif"
      style={{ opacity: 'calc(1 - var(--hero-disperse, 0) * 0.98)' }}
    >
      {payload && photoTexture && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop={inView ? 'always' : 'never'}
          gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
          className="!absolute !inset-0"
        >
          <Scene payload={payload} photoTexture={photoTexture} startTime={startTimeRef.current} />
        </Canvas>
      )}
    </div>
  );
}
