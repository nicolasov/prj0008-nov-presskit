# EDITORIAL SYNC — prj0008 vs Notion (Artist OS) vs nicOS

**Fecha:** 2026-07-19 · **Estado:** borrador de trabajo, sin commit
**Jerarquía de fuentes acordada:**
1. **nicOS** (Vault, `prj0000-nic-os`) — fuente de verdad *permanente* del ecosistema.
2. **Notion "📁 NOV" → Artist OS** — referencia editorial *de trabajo* (curaduría en progreso, no versión final).
3. **La web (este repo)** — artefacto público; hoy parcialmente desactualizado respecto a Notion.

**Flujo objetivo:** Notion (curaduría) → aprobación de Nico → web (`lib/i18n.tsx` + componentes + `docs/`) → destilación a nicOS al cerrar la curaduría. La web nunca es fuente; nicOS no recibe borradores.

## 0 · Decisiones de Nico (2026-07-19)

> Estado oficial de las preguntas abiertas. **Regla vigente: no implementar ningún cambio editorial que dependa de estas decisiones hasta que Nico confirme que la curaduría de Notion quedó terminada.**

1. **Carlos Alfonsín (#1b): SÍ debe estar.** Compartió cabina con él; forma parte de la bio/carrera cuando corresponda. (Nico deberá sumarlo a la bio de Notion durante su curaduría.)
2. **Bio (#1): los dos conjuntos de datos son correctos.** La versión de Notion está desactualizada porque la curaduría sigue en curso — **Nico mismo va a actualizar Notion**. NO sincronizar la bio de la web hasta que esa actualización termine. Las propuestas de §3.1–3.2 quedan en espera (deberán regenerarse contra la versión final de Notion).
3. **Influences (#2): dejar como están.** Decisión temporal — probablemente cambien o desaparezcan más adelante. No tocar.
4. **Lema (#3): mantener como está.** Nico lo revisará durante la curaduría editorial.
5. **Email de booking (#6): sin cambios por ahora.** Nico lo definirá más adelante.

Sin decisión aún: #4 (Sound), #5 (idioma EN de las bios), #7 (press photos hi-res), #8 (fotos de Live con artistas), #9 (criterio de venues).

Fuentes revisadas: las 9 páginas del Artist OS en Notion (madre, Artist OS, Manifesto, Brand Bible, Press Kit, Social Voice, Content Library, Ideas & Research, Roadmap); nicOS `03 Projects/NOV Presskit.md` y `02 Knowledge/NOV.md`; en el repo `lib/i18n.tsx` (copy central), `components/sections/*` (Arrival, Philosophy, About, Live, Gallery, Radio, PressKit, Booking), `lib/sets.ts`, `lib/live-photos.ts`, `components/Footer.tsx`, y los documentos de dirección creativa en `docs/` (01–13 + brief).

---

## 1 · Qué ya está alineado con Notion

| Elemento | Web | Notion | Nota |
|---|---|---|---|
| **Press Facts** | `lib/i18n.tsx` → `pressKit.facts` (Origin / Sound / Set Philosophy / Booking) | Press Kit §6 | Alineado **por construcción** — Notion los importó desde la web, marcados "importado — revisar". Alineación provisoria, no aprobación. |
| **Rider técnico** | `pressKit.rider` (EN/ES) | Press Kit §7 | Ídem: importado desde la web. Idéntico ítem por ítem. |
| **Downloads (3 de 4)** | `PressKit.tsx` `photoDownloads` + `downloadsMeta` | Press Kit §8 | Press photos / Live stills / Artist mark existen en ambos. El **Bio PDF** falta en ambos (Notion lo marca placeholder). |
| **Perfiles** | Footer, `app/layout.tsx` (sameAs), Booking, SoundCloudPlayer | Press Kit "Estado y fuentes" | SoundCloud y YouTube idénticos en todas partes. Los "# placeholders" de links sociales ya no existen en la web (Footer tiene SoundCloud/YouTube/WhatsApp/Instagram reales). |
| **Voz y tono** | `docs/06-copywriting.md`, `docs/09-brand-principles.md` | Brand Bible | Mismo espíritu: contenido, sin hipérbole, editorial, "hablar poco pero con peso". Sin contradicciones de fondo (matices en §6). |
| **Producción** | La web dice "DJ and producer" sin prometer releases | Brand Bible "Relación con producción" | Alineado: la producción existe pero no ocupa lugar forzado. |
| **Filosofía de set (fondo)** | Philosophy + About ("New music chosen before every night") | Manifesto | La idea central (curaduría previa → libertad en vivo, lectura de la sala) coincide. Divergen los matices retóricos (§6.2). |
| **Regla anti-sobrepromesa** | `docs/07` ("do not imply these exist"), `lib/sets.ts` (no fabricar notas) | Roadmap: "No prometer una versión futura de NOV que todavía no existe" | Misma regla escrita en ambos lados. Buena señal de coherencia. |

## 2 · Qué está desactualizado (web vs Notion)

1. **La bio (divergencia principal).** `pressKit.bioLines` (EN/ES) dice *"shared the booth across Buenos Aires and the Argentine coast with Jimmy Van M, Popof, Martín García **and others**"*. La bio larga de Notion suma **Fernando Ferreyra** y **Nicolas Rada** y nombra venues concretos: **UFO Point, Under Club, Carnal y Bali (Morocco)**. Además la estructura de la bio de Notion es distinta (preparación/improvisación como una misma idea; sonido con matices down/oscuro/minimal; cierre "dejar que la música hable antes que las palabras" — que hoy no existe en la web).
2. **Sound.** Notion: "Progressive, Deep y Organic House como punto de partida, con espacio para momentos downtempo, minimal deep tech, techno fino u oscuros". Web: "Progressive House, Deep House, Organic House, Hypnotic Groove" (facts + About). El matiz de los otros registros no está en la web; "Hypnotic Groove" no está en Notion.
3. **Estructura del Press Kit.** Notion define 8 bloques: bio larga, bio corta, filosofía, **Sound**, **Listening/Influences**, press facts, rider, downloads. La web tiene 3 drawers (Biography = solo la versión corta, Rider, Photos). Faltan en la web como piezas propias: bio larga, Sound como texto, Listening/Influences dentro del Press Kit (hoy Influences vive en About), Bio PDF.
4. **`docs/06-copywriting.md` TODO "Canonical biography".** Registra que "nunca llegó una bio oficial". Ya no es cierto: el borrador base ahora existe en Notion (aunque en curaduría). Actualizar ese TODO para apuntar a Notion como lugar de la bio en curso.
5. **`docs/08-roadmap.md`.** No sabe nada del Artist OS ni del flujo Notion→web→nicOS; su ítem "Canonical biography" quedó viejo por lo mismo que docs/06.
6. **nicOS `03 Projects/NOV Presskit.md`** (desactualizado hacia el otro lado — ver tabla §7): pendientes viejos ("links sociales en placeholder" ya resuelto; "videos de YouTube sin cargar" ya no aplica — `MusicPlayer.tsx`/`YT_VIDEOS` no existe más, Radio usa SoundCloud), y no menciona Notion como referencia editorial de trabajo. **No se actualiza ahora** (regla de esta tarea); queda anotado para la destilación post-curaduría.

## 3 · Textos que deberían cambiar (propuesta concreta)

> Todo lo de esta sección queda **condicionado a que Nico apruebe la bio de Notion como canónica** (pregunta abierta #1). Son propuestas listas para pegar, no cambios hechos.

### 3.1 `lib/i18n.tsx` → `pressKit.bioLines` (ES)

Hoy (5 líneas, resumen viejo) → propuesta basada casi textual en la bio corta + cierre de la bio larga de Notion:

```
'NOV es un DJ y productor de Buenos Aires.',
'Prepara cada fecha con curaduría específica; en vivo, la sala y el momento definen el recorrido real.',
'Su sonido se mueve entre el progressive, el deep y el organic house, con momentos más down, finos o minimalistas cuando la noche lo pide.',
'Compartió cabina con Jimmy Van M, Popof, Martín García, Fernando Ferreyra y Nicolas Rada, en espacios como UFO Point, Under Club, Carnal y Bali (Morocco).',
'Su enfoque es simple: preparar mucho para tocar con libertad, y dejar que la música hable antes que las palabras.',
```

### 3.2 `lib/i18n.tsx` → `pressKit.bioLines` (EN)

```
'NOV is a DJ and producer from Buenos Aires.',
'Every date is prepared with specific curation; live, the room and the moment decide the actual route.',
'His sound moves through progressive, deep and organic house, with darker, finer or more minimal passages when the night asks for them.',
'He has shared the booth with Jimmy Van M, Popof, Martín García, Fernando Ferreyra and Nicolas Rada, in rooms such as UFO Point, Under Club, Carnal and Bali (Morocco).',
'His approach is simple: prepare deeply to play freely — and let the music speak before the words.',
```

*(Traducción de trabajo mía — la versión EN no existe en Notion; ver pregunta abierta #5.)*

### 3.3 `lib/i18n.tsx` → facts "Sound" (si se aprueba el matiz de Notion)

- EN: `['Sound', 'Progressive, Deep & Organic House — with darker, downtempo and minimal registers']`
- ES: `['Sonido', 'Progressive, Deep y Organic House — con registros más down, oscuros y minimalistas']`

Ojo Brand Bible ("evitar listas largas de géneros sin contexto"): si esto se siente lista, la alternativa es dejar el fact corto ("Progressive, Deep & Organic House") y mover el matiz al texto "Sound" del drawer (§4.2).

### 3.4 `components/sections/Live.tsx` → línea de la sección (i18n `live.lines`)

Hoy: "Buenos Aires and the Argentine coast." Si la bio canónica suma venues internacionales (Bali — Morocco), esta línea queda corta. Propuesta mínima: `'Buenos Aires, the Argentine coast — and rooms beyond.'` / `'Buenos Aires, la costa argentina — y salas más allá.'` (O dejarla: es editorial, no factual. Decisión de Nico.)

### 3.5 `docs/06-copywriting.md` → TODO "Canonical biography"

Reemplazar el párrafo por: la bio canónica se está curando en Notion (📰 Press Kit del Artist OS); cuando Nico la apruebe, se sincroniza acá y se elimina el TODO.

## 4 · Contenido que falta (existe en Notion, no en la web)

1. **Bio larga** como pieza propia (el drawer Biography solo tiene "the short version"). Candidato: segundo bloque del drawer o página/descarga.
2. **Bio PDF** — placeholder en Notion, inexistente en la web. (Roadmap Notion lo tiene en "Más adelante".)
3. **Sección "Listening / Influences" del Press Kit** — Notion la define como bloque del press kit orientado a bookers/productores, con nombres de nicho *aún sin definir*. En la web hoy hay un "Influences" en About con 5 nombres que Notion no registra (ver inconsistencia §6.3).
4. **Texto "Filosofía" del press kit** (bloque 3 de Notion) — la web tiene Philosophy como sección narrativa, pero el press kit descargable/consultable no incluye ese texto.
5. **Sistema de captions / textos de archivo** (Social Voice + Content Library) — no aplica a la web hoy, pero es contenido aprobable que podría alimentar captions de galería (`lib/sets.ts`-style) más adelante.

## 5 · Componentes que deberían alimentarse del Artist OS

| Componente / archivo | Bloque del Artist OS | Cómo |
|---|---|---|
| `lib/i18n.tsx` → `pressKit.bioLines` | Press Kit §1–2 (bios) | Espejo manual post-aprobación, con comentario de procedencia y fecha de sync. |
| `lib/i18n.tsx` → `pressKit.facts` | Press Kit §6 | Ídem (hoy ya coinciden). |
| `lib/i18n.tsx` → `pressKit.rider` | Press Kit §7 | Ídem. |
| `components/sections/About.tsx` (Influences hardcodeado) | Press Kit §5 Listening/Influences | Cuando se definan nombre y nombres, mover la lista a `lib/i18n.tsx` o `lib/` y citar el bloque de Notion. |
| `components/sections/Philosophy.tsx` + `philosophy.lines` | Manifesto | Revisar líneas contra los "Principios" aprobados (§6.2). |
| `lib/sets.ts` (Editor's Notes) | Content Library (frases de criterio, cierres) | Banco de textos reutilizables para notas nuevas — manteniendo la regla "nunca fabricar". |
| `docs/06-copywriting.md`, `docs/09-brand-principles.md` | Brand Bible | Son el mismo documento en dos idiomas/lugares; al cerrar curaduría, decidir cuál manda y referenciar el otro. |

**Propuesta de mecánica (simple, sin infraestructura):** mantener `lib/i18n.tsx` como único punto de copy en código, agregando un encabezado de procedencia (`// Fuente editorial: Notion Artist OS → Press Kit, sync AAAA-MM-DD`) por bloque sincronizado, y usar este archivo (EDITORIAL_SYNC.md) como registro de qué se sincronizó y cuándo. No automatizar mientras la curaduría siga abierta.

## 6 · Inconsistencias encontradas

1. **Carlos Alfonsin.** Está en la web (marquee de Live + `lib/live-photos.ts` con foto asignada por Nico) pero **no** en la bio de Notion (que nombra 5 artistas). O falta en Notion, o sobra en la bio — decisión de Nico (#1b).
2. **"Not a playlist. A guided journey." vs el Manifesto.** La web desdeña la palabra "playlist" (About) y centra todo en el lema "Not playing tracks. Curating journeys." El Manifesto de Notion, en cambio, reivindica que NOV *"organiza playlists específicas para esa fecha"* como parte del método, y no usa el lema en ningún lado. No es contradicción dura (una habla del resultado, otra del método) pero la retórica choca; si el Manifesto es la voz canónica, About podría reformularse (#3).
3. **Influences.** About muestra "Guy J · Hernán Cattáneo · John Digweed · Simon Vuarambon · Sahar Z" hardcodeado; Ideas & Research dice que los nombres de nicho están *"todavía sin definir"* y que hasta el nombre de la sección ("Listening" vs "Influences") está abierto. La web se adelantó a la curaduría (#2).
4. **booking@nov.dj sin dominio.** Booking.tsx usa `booking@nov.dj` como mailto y fallback de error del form. Con `nov.dj` sin configurar, **el fallback "honesto" también rebota**: si Resend falla, el usuario es enviado a escribir a una casilla inexistente. La pieza de UX más sólida del form descansa sobre el pendiente de infraestructura. (Mitigación interina posible: fallback a una casilla real hasta tener el dominio — decisión de Nico, #6.)
5. **"High-resolution" vs "Web optimized".** `rowMeta.photos` y `downloadsMeta` prometen "High-resolution studio press photos"; los archivos reales (y el cambio reciente de Nico en `PressKit.tsx`) son "JPG · Web optimized" (~0.2–0.3 MB). Notion heredó el texto "alta resolución". Prometer alta resolución a prensa con JPGs comprimidos es sobrepromesa — contra la regla del Roadmap de Notion (#7).
6. **Fotos de Live recién mapeadas.** El contrato de `Live.tsx`/`lib/live-photos.ts` es estricto: la foto aparece solo si existe una foto genuina de NOV **con** ese artista. Los alts nuevos de Nico describen a NOV solo ("NOV in a focused club portrait…"). Si no son fotos con el artista, el sistema estaría mostrando algo que su propia regla prohíbe (#8). *(No tocado: es trabajo en curso de Nico.)*
7. **Venues públicos no reconciliados.** La web ya publica venues vía Radio (`lib/sets.ts`: Privilege · San Bernardo, Mazovia · Zárate) y captions de galería ("UFO Point — 2025"); la lista de venues de la bio de Notion no los incluye (ni ellos a Under Club/Carnal/Bali). No es error — son listas con propósitos distintos — pero conviene decidir un criterio (#9).
8. **nicOS Knowledge NOV.md** es un esqueleto en estado "borrador" — hoy no cumple el rol de fuente permanente para NOV (no tiene ni la definición del alias ni la identidad). Correcto según el flujo (se llena al destilar), pero significa que **hoy la única fuente rica es Notion, que es explícitamente no-final.** Nada del sitio debería cambiarse "porque lo dice Notion" sin aprobación explícita.

## 7 · nicOS vs Notion vs Web — tabla de diferencias

| Tema | nicOS (permanente) | Notion (curaduría) | Web (público) | Estado |
|---|---|---|---|---|
| Identidad NOV | `02 Knowledge/NOV.md`: esqueleto "borrador" | Artist OS completo (idea central, manifesto, brand bible) | Implícita en copy/diseño | Notion adelante; destilar a nicOS al cerrar |
| Bio | No existe | Bio larga + corta (borrador base) | `bioLines` viejas (3 artistas, sin venues) | **DIVERGE** — decisión #1 |
| Artistas compartidos | No listados | 5 (JVM, Popof, M. García, Ferreyra, Rada) | Bio: 3 + "others"; Live marquee: 6 (incl. **Carlos Alfonsin**) | **DIVERGE** — decisión #1b |
| Venues | No listados | UFO Point, Under Club, Carnal, Bali (Morocco) | Solo captions: UFO Point (galería), Privilege, Mazovia (Radio) | **DIVERGE** — decisión #9 |
| Sound | No documentado | Prog/Deep/Organic + registros down/minimal/techno fino | Prog/Deep/Organic + "Hypnotic Groove" | Matiz — decisión #4 |
| Filosofía de set | No documentada | Manifesto (preparación→libertad, sin lema) | "Not playing tracks. Curating journeys." + Philosophy lines | Compatible; lema sin registrar — #3 |
| Rider | No | Importado de la web ("revisar") | `pressKit.rider` | Alineado por construcción |
| Press facts | No | Importados de la web ("revisar") | `pressKit.facts` | Alineado por construcción |
| Downloads | No | 3 assets + Bio PDF placeholder | 3 JPG "web optimized" | Alineado salvo PDF + #7 (hi-res) |
| Influences | No | Sin definir (nombre y nombres abiertos) | 5 nombres hardcodeados en About | **Web se adelantó** — #2 |
| Booking email | Pendiente "dominio nov.dj" | Señalado como dependiente del dominio | `booking@nov.dj` en mailto/fallback | Bloqueado por infra — #6 |
| Perfiles sociales | Solo SC + YT | SC + YT | SC, YT, Instagram, WhatsApp | nicOS y Notion no registran IG/WhatsApp |
| Pendientes del sitio | Lista vieja (placeholders, YT_VIDEOS) | — | Placeholders resueltos; YT_VIDEOS ya no existe | nicOS desactualizado; corregir al destilar |
| Galería revelado | "pedida y no construida" | — | Existe v1 (develop desde negro); spec nueva en curso (rama `feat/gallery-darkroom-develop`) | nicOS desactualizado |

## 8 · Preguntas abiertas (para Nico)

1. **Pregunta abierta para Nico — bio canónica:** ¿la bio larga/corta de Notion es la versión que va a la web? (Notion mismo la marca como pregunta abierta.) **1b:** ¿Carlos Alfonsin se suma a la lista de artistas de la bio, o queda solo en el marquee de Live?
2. **Pregunta abierta para Nico — Influences:** ¿"Listening" o "Influences"? ¿Los 5 nombres que hoy muestra About (Guy J, Cattáneo, Digweed, Vuarambon, Sahar Z) están aprobados, o se reemplazan por los "nombres de nicho" pendientes de definir?
3. **Pregunta abierta para Nico — lema:** ¿"Not playing tracks. Curating journeys." sigue siendo el eje del hero/Philosophy? No aparece en el Artist OS; si es canónico, conviene registrarlo en la Brand Bible; si no, hay que repensar hero/About.
4. **Pregunta abierta para Nico — Sound:** ¿el fact público incluye los registros down/minimal/techno fino, o eso queda para el texto largo? ¿"Hypnotic Groove" sigue?
5. **Pregunta abierta para Nico — idioma:** las bios de Notion están solo en ES. ¿La versión EN la curás vos en Notion, o se traduce al implementar (como §3.2)?
6. **Pregunta abierta para Nico — email interino:** hasta configurar `nov.dj`, ¿el mailto/fallback del form apunta a una casilla real (¿cuál?) o se deja como está sabiendo que rebota?
7. **Pregunta abierta para Nico — press photos:** ¿subir los originales en alta resolución (y mantener el copy "High-resolution"), o ajustar el copy a "web optimized"?
8. **Pregunta abierta para Nico — fotos de Live:** las `nov-artist-*.jpg` que mapeaste, ¿son fotos reales con cada artista? La regla del componente exige foto genuina "con" el artista; si no, conviene revisar el mapeo o la regla.
9. **Pregunta abierta para Nico — venues:** ¿un solo criterio de venues públicos (bio + Radio + captions) o listas independientes por contexto?

## 9 · Prioridad sugerida de implementación

1. **Decidir #1 (bio canónica)** — bloquea casi todo lo editorial.
2. **Sincronizar bios** en `lib/i18n.tsx` (EN/ES, §3.1–3.2) + actualizar TODO de `docs/06`. Cambio chico y de alto impacto.
3. **Resolver el email de booking interino (#6)** — operativo, protege el canal de negocio ya.
4. **Influences/Listening (#2)** y **Sound (#4)** — segundo pase de copy.
5. **Bio larga en el drawer + Bio PDF** (§4.1–4.2) — completa el press kit según la estructura de Notion.
6. **Press photos hi-res o copy honesto (#7).**
7. **Después de cerrar curaduría:** destilar a nicOS (`02 Knowledge/NOV.md` con la identidad aprobada; `03 Projects/NOV Presskit.md` con pendientes corregidos — placeholders resueltos, YT_VIDEOS obsoleto, estado real de la galería).
8. **Recién entonces, la capa visual:** galería "revelado darkroom" (implementación ya preparada y guardada, rama `feat/gallery-darkroom-develop`) y demás mejoras — sobre esta base editorial, no antes.

---
*Generado como parte de la revisión editorial overnight 2026-07-18/19. Sin commit deliberadamente: es material de trabajo para que Nico lo revise, edite o descarte.*
