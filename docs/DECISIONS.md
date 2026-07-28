# Decisiones de arquitectura — prj0008-nov

Este documento registra el **porqué**, no el qué. El código ya dice qué hace.
Lo que se pierde con el tiempo es la razón, y sin la razón alguien "arregla"
algo que estaba bien.

Arquitectura congelada el 2026-07-28 (Architecture Freeze). Cualquier cambio
sobre lo de acá abajo requiere reabrir explícitamente y justificarlo con un
problema real de uso, no con una hipótesis.

---

## 1. Un solo proyecto, un solo Press Kit

Todo el sitio de NOV vive en un único proyecto Next.js. No hay proyectos
separados para press kit, redirects, landing o booking.

**Por qué:** partirlo significaría dos pipelines, dos configuraciones, dos
superficies de deploy y dos lugares donde la analítica se fragmenta — para
servir unos pocos kilobytes de redirects.

La Home (`/`) **es** el Press Kit. No hay una landing separada. Con el tiempo la
Home crecerá; hoy muestra un press kit.

---

## 2. Los QR nunca apuntan directo a una plataforma

Todo destino externo se alcanza por una URL propia (`/ig`, `/spotify`, …).

**Por qué:** un QR impreso no se puede revocar, corregir ni reimprimir una vez
que está pegado en la pared de un club. Si el QR apuntara directo a Instagram,
cambiar de usuario significaría reimprimir todo. Con la indirección, cambiar de
destino es una línea en `lib/config/links.ts`.

**Esta es la razón de ser de toda la capa de redirects.**

---

## 3. 🔴 307 — nunca 301 ni 308

**La decisión más importante del proyecto.**

Los redirects permanentes (301/308) son cacheados por el navegador de forma
agresiva y casi indefinida, sin manera práctica de limpiarlos.

Un celular que escaneó el QR de la cabina una vez seguiría resolviendo al
destino **viejo para siempre**, incluso después de cambiar la config. Eso
destruiría exactamente la propiedad por la que existe la decisión 2.

El destino es temporal por diseño, así que el redirect es temporal por diseño.

Hay un test que lo verifica. **No lo cambies.**

---

## 4. Medición del lado del servidor, no del cliente

Un 307 no renderiza HTML, así que `gtag.js` nunca puede ver un escaneo de QR.

Pero incluso si se pudiera, no habría que hacerlo: medir desde el navegador
significa pedirle a un celular con datos móviles en un club que descargue un
script de `googletagmanager.com` antes de navegar. Con mala conexión el escaneo
se pierde — y ése es justamente el tráfico que importa.

`lib/analytics/redirect-tracking.ts` lo manda desde el servidor: captura del
100% y costo cero para el visitante.

**Dos invariantes que no se rompen:**
1. No puede demorar el redirect — se despacha con `after()`, post-respuesta.
2. No puede romper el redirect — todos los errores son silenciosos a propósito.
   La analítica nunca vale un QR muerto.

Se manda `page_view` y no un evento custom porque GA4 parsea los `utm_*` desde
`page_location`, así que los informes estándar de adquisición funcionan sin
configurar dimensiones personalizadas.

**Los crawlers de vista previa se excluyen.** Compartir un redirect por WhatsApp
hace que su crawler pegue en la URL — un request real sin ningún humano detrás.
Contarlos inflaría en silencio todas las campañas.

---

## 5. Slugs de destino, no de superficie

Se evaluó `/booth` (nombrar la superficie física) contra `/ig` (nombrar el
recurso). **Ganó `/ig`.**

**Por qué:** el cartel de la cabina lleva el logo de Instagram impreso. El
objeto físico ya está comprometido con Instagram por su arte, no por su URL. Si
alguna vez hubiera que apuntar ese QR a otro lado, habría que reimprimir igual.
La flexibilidad que `/booth` prometía era inalcanzable en ese cartel.

**Consecuencia aceptada:** con un único `/ig` no se puede distinguir el tráfico
del cartel del de la bio. Cuando eso importe, se resuelve con `?s=booth` en el
QR — sin cambiar el slug ni la arquitectura.

---

## 6. Rutas reservadas

`/music`, `/booking` y `/contact` **no** son redirects. Están reservadas para
páginas reales.

**Por qué:** cada slug de redirect consume para siempre un path raíz. Si
`/music` fuera un redirect impreso en un flyer, nunca podría ser la página de
discografía sin romper una URL que ya está en el mundo.

El handler las rechaza explícitamente, y hay un test que lo verifica. Hoy
devuelven 404 — eso es correcto, no un bug.

---

## 7. Un destino vacío da 404, no fallback al home

`spotify` y `beatport` están vacíos en `LINKS` porque todavía no existen.

**Por qué 404:** un QR que promete Spotify y deja al visitante en el home
esconde el problema. Un 404 lo hace visible. Un fallo silencioso en material
impreso es peor que uno ruidoso.

---

## 8. `/press` redirige, no duplica

`/press` devuelve 307 hacia `/`.

**Por qué no renderizar el mismo contenido en las dos URLs:** serían dos URLs
para un mismo documento, con la autoridad de SEO partida entre ambas, y haría
falta un `rel=canonical` para resolverlo. Los canonical fallan en silencio. Un
redirect no puede.

El `Location` es **relativo** a propósito: una URL absoluta construida desde
`SITE.domain` mandaría al visitante al dominio que esa constante nombre en ese
momento — mal en cada preview, y mal en producción mientras la constante vaya
atrasada respecto del host real.

**Cuando el sitio crezca esto se invierte:** `/` pasa a ser la landing y
`/press` la página real del Press Kit. Ese día este archivo se borra, no se
reescribe. Un redirect permanente cacheado le sobreviviría.

---

## 9. `SITE.domain` tiene que nombrar el host real

Alimenta `metadataBase`, y por lo tanto Open Graph, Twitter cards y JSON-LD.

Un valor aspiracional rompe **todas** las vistas previas de enlace en silencio,
porque las URLs absolutas de las imágenes resuelven contra un host que no
responde. Ya pasó una vez: `nov.vercel.app` estuvo configurado sin existir, y
las vistas previas de WhatsApp estaban rotas — que es justamente el canal por el
que un press kit llega a un booker.

**Migrar al dominio propio es esta línea, y solo esta línea.**

---

## 10. Alcance de los tests

Doce tests, un archivo. No es cobertura — es **radio de impacto**.

Cubren lo único que un deploy no puede deshacer, porque sale del repositorio
dentro de un QR hacia un objeto físico irrecuperable: integridad de los
destinos, colisiones de namespace, y que el redirect sea 307.

No hay tests de componentes ni E2E. Para un press kit de una página sería costo
sin retorno.

---

## 11. El formulario de booking usa Formspree, no Resend

El form postea directo a Formspree. No hay API route propia, ni servicio de
email, ni secreto detrás.

**Por qué se revirtió Resend:** su única ventaja real es enviar desde una
dirección propia con HTML controlado, y eso **requiere un dominio verificado**
que el proyecto no tiene. Sin dominio, Resend caía en `onboarding@resend.dev`
—el remitente compartido— y no aportaba nada sobre Formspree, mientras sumaba
un servicio, una variable de entorno, una API route y un 503 en producción.

**Y resolvía peor un problema:** `/api/contact` era un endpoint público sin
rate limiting, sin captcha y sin honeypot. Cualquiera podía hacer POST en loop,
con costo real en cuota de envío y en la casilla. Formspree trae filtrado de
spam del lado de ellos.

Formspree ya estaba implementado acá antes (commit `7552e95`) y el rediseño lo
reemplazó. Se reutiliza la misma cuenta que el resto del ecosistema, en línea
con el hallazgo de `_reports/2026-07-19-vision-cto-ecosistema.md`: había tres
soluciones a medias para el mismo problema.

El endpoint es público a propósito: es un form action, no una credencial.

**Cuándo reconsiderar Resend:** si hiciera falta mail transaccional propio
—confirmación automática al que consulta, plantillas—. No es el caso.

Se conserva el fallback a `mailto`: si el envío falla, el form no finge éxito y
ofrece la consulta pre-cargada hacia la casilla de booking.

---

## 12. Consecuencia conocida: el 404 de la capa de redirects

`app/[slug]/route.ts` captura todo path raíz no matcheado. Como un Route Handler
devuelve `Response` y no UI, un typo como `/hme` recibe un 404 plano en vez del
404 de marca de `app/not-found.tsx`.

Es el precio de enrutar todos los redirects por Route Handlers, que es lo que la
arquitectura congelada define. Se acepta conscientemente.

---

## Pendientes que dependen de una decisión externa

- **Dominio propio.** `nov.dj` no lo vende Vercel y su `whois` no responde: el
  registro de Djibouti es opaco. `booking@nov.dj` sigue en el código como un
  supuesto heredado **sin validar**. Alternativas verificadas y libres:
  `novdj.com` (~$11/año), `novmusic.com`, `wearenov.com`.
- **`GA4_API_SECRET`.** Sin él la medición de redirects no cuenta nada. El
  redirect funciona igual.
- **Renombrar el proyecto en Vercel** a `prj0008-nov`. Postergado a propósito
  hasta definir el dominio: renombrarlo cambia el host `*.vercel.app` y Vercel
  no deja redirect del viejo.
