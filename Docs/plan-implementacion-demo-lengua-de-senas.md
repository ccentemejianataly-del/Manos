# Plan de implementación — Demo visual de app para aprender Lengua de Señas Peruana (LSP)

| Campo | Valor |
|---|---|
| Proyecto | App de aprendizaje de Lengua de Señas Peruana (LSP) (nombre provisional: **Manos**) |
| Tipo de entrega | Demo inicial navegable (MVP visual), web responsive (móvil + escritorio) |
| Alcance | Flujo principal; funcionalidades completas fuera de alcance |
| Lengua de señas | **Lengua de Señas Peruana (LSP) — Perú** |
| Versión del documento | 1.3 |
| Fecha | 22 de octubre de 2026 |
| Estado | Listo para revisión |
| Ubicación | `/Docs/plan-implementacion-demo-lengua-de-senas.md` |

> **Idea en una frase:** una experiencia cálida y sin fricción, inspirada en la progresión de Duolingo, donde la persona recorre un camino de lecciones, practica señas de la **Lengua de Señas Peruana (LSP)** con imágenes y recursos interactivos, y consulta un diccionario, todo con contenido simulado y sin energía, vidas, bloqueos ni paywall.

> **Naturaleza de la entrega:** esta es una **demo inicial** para explorar el funcionamiento y la dirección visual del producto. No es un producto completo: algunas pantallas serán simplificadas, simuladas o quedarán como “próximamente”.

> **Alcance lingüístico:** toda la demo se centra en la **Lengua de Señas Peruana (LSP)**, reconocida oficialmente en Perú. No se presentan otras lenguas de señas ni se asume que la LSP sea universal.

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Objetivos](#2-objetivos)
3. [Alcance de la demo](#3-alcance-de-la-demo)
4. [Público objetivo y principios de experiencia](#4-público-objetivo-y-principios-de-experiencia)
5. [Decisiones de producto](#5-decisiones-de-producto)
6. [Arquitectura de información](#6-arquitectura-de-información)
7. [Especificación de pantallas](#7-especificación-de-pantallas)
8. [Sistema de diseño](#8-sistema-de-diseño)
9. [Diseño responsive](#9-diseño-responsive)
10. [Contenido y datos simulados](#10-contenido-y-datos-simulados)
11. [Tipos de ejercicio](#11-tipos-de-ejercicio)
12. [Arquitectura técnica](#12-arquitectura-técnica)
13. [Accesibilidad e inclusión](#13-accesibilidad-e-inclusión)
14. [Rendimiento](#14-rendimiento)
15. [Plan de trabajo y cronograma](#15-plan-de-trabajo-y-cronograma)
16. [QA y criterios de aceptación](#16-qa-y-criterios-de-aceptación)
17. [Riesgos y mitigaciones](#17-riesgos-y-mitigaciones)
18. [Evolución futura](#18-evolución-futura)
19. [Anexos](#19-anexos)

---

## 1. Resumen ejecutivo

Se construirá una **demo visual navegable** de una aplicación para aprender **Lengua de Señas Peruana (LSP)**, pensada primero para teléfono y adaptada a escritorio. La demo permitirá recorrer el flujo principal —onboarding, camino de aprendizaje, lección interactiva, resultados, diccionario, perfil y ajustes— sin backend, sin autenticación real y sin contenido lingüístico definitivo. Práctica y clasificación se muestran como “próximamente”.

El objetivo no es medir aprendizaje ni validar la precisión de las señas, sino **validar la experiencia, la estética y la claridad de las interfaces** con stakeholders, personas usuarias y miembros de la comunidad sorda peruana. Por eso, todo el contenido será simulado y estará claramente etiquetado como demostración.

**Esta entrega es una demo inicial, no el producto completo.** Se prioriza el recorrido **onboarding → home → lección → resultado → diccionario → perfil**, con datos mock y funcionalidades mínimas. La práctica adaptativa, la liga, la cámara real, las cuentas y el contenido lingüístico definitivo quedan fuera o se muestran solo como “próximamente”.

**Decisiones clave:**

- **Demo navegable, no maqueta estática.** Todos los botones principales responden, las lecciones se pueden completar y el progreso se conserva en `localStorage`.
- **Sin restricciones.** No hay vidas, energía, anuncios, paywall ni contenido bloqueado. XP y racha existen solo como motivación visual; la clasificación es un stub “Próximamente”.
- **Mobile-first.** Se diseña a 360 px y se escala a tablet y escritorio, no al revés.
- **Contenido mock centralizado.** Un único dataset en TypeScript alimenta lecciones, diccionario y ejercicios.
- **Enfoque en la LSP.** Todo el vocabulario, las glosas y las traducciones se refieren a la Lengua de Señas Peruana; no se mezclan señas de otros países.
- **Modo placeholder visual.** Si aún no hay ilustraciones o secuencias de señas, la interfaz funciona con imágenes de manos, diagramas SVG y textos alternativos.
- **Accesibilidad desde el inicio.** Alternativas textuales para cada seña, descripciones de los recursos visuales, navegación por teclado y respeto por `prefers-reduced-motion`.

---

## 2. Objetivos

### 2.1 Objetivo general

Entregar una demo web responsive, navegable y visualmente pulida que permita experimentar cómo se sentiría aprender **Lengua de Señas Peruana (LSP)** con una mecánica tipo Duolingo, sin las restricciones habituales de ese modelo.

### 2.2 Objetivos específicos

1. Comunicar en menos de 30 segundos la propuesta de valor: aprender señas de la LSP de forma breve, divertida y accesible.
2. Validar la arquitectura de navegación en móvil y escritorio.
3. Probar la claridad del camino de aprendizaje, la lección y el diccionario.
4. Evaluar el tono visual, la identidad y las microinteracciones.
5. Disponer de un artefacto desplegable y compartible por URL para presentaciones.
6. Dejar una base técnica y de contenidos reutilizable para una futura versión funcional.

### 2.3 Criterios de éxito de la demo

| Criterio | Meta |
|---|---|
| Flujo principal | Onboarding → home → lección → resultado → diccionario → perfil sin callejones sin salida |
| Responsive | Sin scroll horizontal entre 360 px y 1920 px |
| Rendimiento | Lighthouse Performance ≥ 90 y Accesibilidad ≥ 95 en móvil |
| Claridad | Una persona ajena completa una lección sin explicación previa |
| Alcance | Flujo principal completo; módulos secundarios como stub visual o “próximamente” |
| Presentación | Demo de 3–5 minutos ejecutable sin conexión a servicios externos |
| Accesibilidad | Navegación completa por teclado y alternativa textual en todo recurso visual |

### 2.4 No objetivos

- Enseñar LSP de forma certificada o evaluar competencia real.
- Traducir español a LSP ni reconocer señas con cámara o IA.
- Crear cuentas, sincronizar entre dispositivos o persistir en la nube.
- Implementar pagos, suscripciones, anuncios o mecánicas de retención reales.
- Producir un catálogo lingüístico completo y validado.
- Publicar en App Store o Google Play (la demo será web; el diseño será mobile-first).

---

## 3. Alcance de la demo

### 3.1 Enfoque de demo inicial

La demo no intenta replicar el producto final. Se divide en tres niveles:

| Nivel | Qué significa |
|---|---|
| Núcleo funcional | Onboarding, home, lección, resultados, diccionario, detalle, perfil y ajustes mínimos. Se puede navegar y completar el flujo. |
| Visual / stub | Práctica y clasificación: pantalla o tarjeta “Próximamente”, sin lógica real. |
| Fuera de alcance | Backend, cuentas, cámara real, videos, contenido validado, pagos y notificaciones. |

**Regla de oro:** ningún módulo incluido puede terminar en un botón muerto. Si una función no existe, se muestra “Próximamente” o se omite del menú.

### 3.2 Módulos y alcance

| Módulo | Demo inicial | Visión completa |
|---|---|---|
| Onboarding | 3 pasos: bienvenida, meta y resumen | 5 pasos con LSP, nivel y meta |
| Aprender (home) | 2 unidades y 10 lecciones | 6 unidades y 30 lecciones |
| Lección | 4 tipos de ejercicio | 8 tipos |
| Resultados | XP, precisión, confeti y aviso de logro | + tiempo y combo |
| Diccionario | 20 señas + alfabeto | 60 señas y filtros avanzados |
| Práctica | Tarjeta “Próximamente” | Hub completo de repaso |
| Perfil | XP, racha y 6 logros | Estadísticas y actividad semanal |
| Clasificación | Tarjeta “Próximamente” | Liga completa |
| Ajustes | Tema, movimiento reducido, meta diaria, texto alternativo y reinicio | Todas las preferencias |
| Estados | Carga, vacío y 404 | Todos los estados |

### 3.3 Excluido de esta entrega

| Excluido | Motivo |
|---|---|
| Backend y base de datos | La demo usa datos mock y `localStorage` |
| Login, registro y recuperación de cuenta | Se entra como invitado |
| Cámara real y análisis de manos | No se implementa en la demo; la autoevaluación queda como visión y no se graba nada |
| Producción audiovisual (videos) | La enseñanza se basa en imágenes y recursos interactivos; no se usan videos |
| Notificaciones push | No se implementan; quedan fuera de la demo |
| Multi-idioma de interfaz | Interfaz en español, estructura preparada para i18n |
| Otras lenguas de señas (LSE, LSA, LSCh, ASL, etc.) | La demo se limita a la LSP; la arquitectura queda preparada para ampliarla |
| Validación pedagógica completa | La demo no certifica aprendizaje; el contenido se revisa de forma mínima y se validará a fondo antes de producción |

### 3.4 Principio “sin restricciones”

- No hay corazones, vidas ni energía.
- Todas las unidades y lecciones están desbloqueadas desde el inicio.
- Se puede repetir cualquier lección cuantas veces se quiera.
- Los errores no bloquean: muestran la respuesta correcta y permiten continuar.
- No hay anuncios, paywall ni compras.
- La racha y la XP son decorativas; la liga es un stub y no condiciona el acceso.
- La persona puede saltar el onboarding y explorar libremente.

> **Nota de interpretación:** “demo únicamente visual” se entiende como *interfaz navegable con datos simulados*, no como un conjunto de capturas estáticas. Si el alcance real fuera solo maquetas, el cronograma podría reducirse a una semana, pero se perdería la validación de interacciones.

> **Alcance lingüístico:** la demo usa la **Lengua de Señas Peruana (LSP)** como única lengua de contenido. Las señas, glosas, descripciones y el alfabeto dactilológico se refieren a la LSP y deben validarse con personas sordas peruanas antes de usarse en producción.

---

## 4. Público objetivo y principios de experiencia

### 4.1 Personas

| Persona | Necesidad | Qué prueba en la demo |
|---|---|---|
| Persona oyente principiante (18–35) | Aprender señas básicas de forma entretenida | Onboarding, lección, racha y logros |
| Familiar de una persona sorda | Comunicarse en situaciones cotidianas | Diccionario por categorías y detalle de seña |
| Docente o intérprete en formación | Repasar vocabulario y dactilología | Buscador, alfabeto y detalle de seña |
| Persona sorda o miembro de la comunidad sorda peruana | Verificar representación respetuosa y utilidad en LSP | Calidad de imágenes, secuencias, textos, glosas y tono |
| Stakeholder / inversor | Entender el producto en una demo corta | Flujo principal y pulido visual |

### 4.2 Principios de experiencia

1. **Aprender haciendo.** Cada pantalla invita a una acción; se evita el texto explicativo largo.
2. **Fricción cero.** Sin registro, sin vidas, sin esperas. Todo está a un toque.
3. **Feedback inmediato y amable.** Los errores se explican sin castigar.
4. **Celebrar el avance.** XP, racha, combo y confeti refuerzan el progreso.
5. **Mobile-first de verdad.** Zonas táctiles cómodas, contenido esencial arriba y acciones al alcance del pulgar.
6. **La seña es la protagonista.** La imagen o secuencia ilustrada ocupa el mayor espacio visual; la interfaz no compite con ella.
7. **Respeto cultural.** La LSP no es “español con gestos”: es una lengua con gramática propia. El contenido se presenta como glosa, no como traducción literal.
8. **Accesible por defecto.** Nunca se depende solo del color, el audio o el movimiento.

---

## 5. Decisiones de producto

### 5.1 Lengua de Señas Peruana (LSP)

La demo se centra en la **Lengua de Señas Peruana (LSP)**, reconocida oficialmente en Perú (Ley N.º 29535). La LSP no es una versión gestual del español ni una lengua universal: tiene gramática, vocabulario y variación regional propias.

| Aspecto | Decisión para la demo |
|---|---|
| Lengua | Lengua de Señas Peruana (LSP) |
| País | Perú |
| Reconocimiento | Ley N.º 29535, que otorga reconocimiento oficial a la LSP |
| Variedad de referencia | LSP de una región o referente urbano por confirmar con la comunidad sorda peruana |
| Contenido | Vocabulario básico simulado: saludos, familia, números, colores, comida y frases |
| Otras lenguas de señas | Fuera de alcance; no se muestran como opción seleccionable |
| Producción visual | Ilustraciones, secuencias de fotogramas y diagramas interactivos etiquetados como LSP, validados con personas sordas peruanas |

**Decisión:** la demo no ofrecerá un selector de lenguas de señas. Mostrará la LSP como la lengua del producto y, si se necesita comunicar escalabilidad, incluirá una nota “Otras lenguas, próximamente” sin contenido ni opción activa. Esto evita mezclar señas de distintos países y prometer contenido inexistente.

**Variación regional:** la LSP presenta variaciones entre regiones y comunidades. Antes de producir los medios definitivos se debe definir la variedad de referencia (por ejemplo, la usada por la comunidad sorda de Lima u otra región) y documentarla en el dataset. Para la demo, cada seña lleva `variant: "LSP"` y una nota interna sobre la variedad usada.

**Validación obligatoria:** cada seña debe revisarse con al menos una persona sorda signante de la LSP, idealmente vinculada a la variedad de referencia. La validación cubre configuración de la mano, movimiento, expresión facial, uso y traducción aproximada al español peruano.

### 5.2 Estrategia de enseñanza visual e interactiva

La plataforma **no usa videos**. La seña se enseña con imágenes de alta calidad y recursos interactivos que permiten observarla, descomponerla y practicarla.

**Recursos didácticos:**

1. **Imagen clave.** Fotografía o ilustración de la seña en su momento más representativo, con fondo neutro y encuadre de medio cuerpo.
2. **Secuencia de fotogramas.** 2–4 imágenes en la demo inicial (hasta 5 en la visión completa) que muestran inicio, movimiento y fin de la seña. La persona puede avanzar y retroceder fotograma a fotograma o reproducir la secuencia a un ritmo controlado.
3. **Diagrama interactivo.** SVG con zonas activas (mano, brazo, rostro) que explican la configuración, la ubicación y el movimiento. Al tocar una zona se muestra una etiqueta y una descripción.
4. **Recursos interactivos de práctica.** Selección de la imagen correcta, ordenar fotogramas, unir seña e imagen, marcar el punto de inicio del movimiento, completar la glosa y emparejar.
5. **Placeholder didáctico.** Si aún no existe el material final, se usa una ilustración de manos con la glosa y una secuencia simulada, claramente etiquetada como “Contenido de demostración”.

**Formatos:** WebP/AVIF para imágenes, SVG para diagramas y secuencias de archivos o sprites para animaciones. No se usan MP4, WebM, GIF ni videos incrustados. Cualquier animación es vectorial o fotograma a fotograma.

**Producción:** las imágenes se producen con ilustrador/a y se validan con personas sordas signantes de la LSP. Cada recurso incluye una descripción textual y un `alt` por fotograma.

Reglas de contenido:

- Usar **glosa** en mayúsculas (`HOLA`, `GRACIAS`) y una traducción aproximada al español peruano.
- No presentar la glosa como oración gramatical española.
- Incluir marcadores no manuales cuando apliquen (expresión facial, movimiento de cejas, contacto visual).
- Evitar estereotipos, infantilización y el relato de “persona oyente que salva a persona sorda”.
- Validar cada seña con al menos una persona sorda signante de la LSP antes de publicar.

### 5.3 Persistencia simulada

Se usará `localStorage` con la clave versionada `manos.demo.v1` para que la demo “recuerde” onboarding, XP, racha, lecciones completadas, logros y ajustes. No hay datos personales ni llamadas de red. En Ajustes habrá un botón **“Reiniciar demo”** que limpia el estado y vuelve al onboarding.

### 5.4 Idioma e internacionalización

- Interfaz en **español peruano neutro**, con posibilidad de ajustar términos regionales.
- Traducciones de las señas al español peruano, marcadas como aproximaciones y no como equivalentes literales.
- Todos los textos en un archivo de constantes o diccionario (`es-PE.ts`), sin cadenas sueltas en componentes.
- Fechas y números con `Intl` y locale `es-PE`.
- Estructura preparada para añadir `en.ts` en el futuro, aunque la demo no incluya selector de idioma de interfaz.

### 5.5 Identidad visual

- **Nombre provisional:** Manos.
- **Tono:** cercano, optimista, inclusivo, sin infantilizar.
- **Mascota:** personaje original redondeado con manos expresivas (no replicar la mascota de Duolingo). Para la demo puede usarse una ilustración simple o un SVG animado.
- **Paleta:** violeta eléctrico como color de marca, ámbar para racha/XP, verde para acierto y coral para error.
- **Formas:** esquinas redondeadas, tarjetas suaves, botones con relieve sutil.

## 6. Arquitectura de información

### 6.1 Mapa de navegación

```
                    ┌───────────────┐
                    │  Onboarding   │
                    └───────┬───────┘
                            │ completar / saltar
                            ▼
   ┌──────────────┐    ┌───────────────┐    ┌──────────────┐
   │ Diccionario  │◄───│    Aprender   │───►│   Lección    │
   └──────┬───────┘    │     (Home)    │    │   (player)   │
          │            └───┬───┬───┬───┘    └──────┬───────┘
          ▼                │   │   │               │ completar
   ┌──────────────┐        │   │   │               ▼
   │ Detalle seña │        │   │   │        ┌──────────────┐
   └──────────────┘        │   │   │        │  Resultado   │
                           │   │   │        └──────┬───────┘
                           ▼   ▼   ▼               │
                    ┌────────┐ ┌──────────┐        │
                    │Práctica│ │Clasificación│     │
                    └────────┘ └──────────┘        │
                           │                        │
                           ▼                        ▼
                    ┌────────┐               ┌────────┐
                    │ Perfil │◄──────────────│  Home  │
                    └────────┘               └────────┘
```

Ajustes se abre desde el avatar de la barra superior (móvil) o desde la barra lateral (escritorio). Práctica y Clasificación existen como rutas de estado “Próximamente”; no forman parte del flujo funcional de la demo. El detalle de seña podrá abrir una práctica contextual en la visión completa.

### 6.2 Rutas

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/` | Redirección según onboarding | Pública |
| `/onboarding` | Bienvenida y configuración | Pública |
| `/aprender` | Home / camino de aprendizaje | Pública (invitado) |
| `/leccion/:lessonId` | Lección | Pública, todas desbloqueadas |
| `/leccion/:lessonId/resultado` | Resultados de la lección | Requiere haber completado |
| `/practicar` | Práctica (estado “Próximamente”) | Pública |
| `/diccionario` | Diccionario y alfabeto | Pública |
| `/diccionario/:signId` | Detalle de seña | Pública |
| `/perfil` | Perfil y logros | Pública |
| `/clasificacion` | Liga (estado “Próximamente”) | Pública |
| `/ajustes` | Preferencias y reinicio | Pública |
| `*` | 404 amigable | Pública |

### 6.3 Navegación responsive

**Móvil y tablet (< 1024 px):**

- Barra inferior fija de 4 ítems: **Aprender**, **Diccionario**, **Clasificación** (muestra “Próximamente”), **Perfil**.
- Altura 64 px + `env(safe-area-inset-bottom)`.
- Ítem activo con icono relleno, etiqueta y punto/indicador de color.
- Ajustes y práctica se alcanzan desde el avatar y desde el home, respectivamente.
- En lección se oculta la barra para evitar salidas accidentales.

**Escritorio (≥ 1024 px):**

- Barra lateral fija de 240 px con logo, 6 destinos (Aprender, Diccionario, Práctica, Clasificación, Perfil, Ajustes) y bloque de racha/meta. Práctica y Clasificación muestran “Próximamente”.
- Contenido centrado con ancho máximo de 1120–1200 px.
- Home con columna principal y rail derecho de widgets.
- La lección oculta la barra lateral y centra el player.

### 6.4 Reglas globales de navegación

- Cambio de ruta siempre hace scroll al inicio y mueve el foco al `h1` de la pantalla.
- El botón “atrás” del navegador funciona de forma predecible.
- Salir de una lección en curso pide confirmación.
- Ningún botón queda muerto: si una función no existe en la demo, muestra un toast “Disponible en la versión completa”.
- El logo lleva a `/aprender`.

---

## 7. Especificación de pantallas

Cada pantalla define objetivo, composición, interacciones y criterios de aceptación. Los tamaños son orientativos y se ajustan al sistema de diseño de la sección 8.

### 7.0 Prioridad de pantallas en la demo inicial

| Pantalla | Demo inicial | Nota |
|---|---|---|
| Onboarding | Simplificado | 3 pasos; se omiten LSP y nivel |
| Home | Sí | 2 unidades |
| Lección | Sí | 4 tipos de ejercicio |
| Resultado | Sí | Métricas básicas |
| Práctica | Stub | Tarjeta “Próximamente” |
| Diccionario | Sí | 20 señas |
| Detalle | Sí | Imagen, secuencia y descripción |
| Perfil | Mínimo | XP, racha y logros |
| Clasificación | Stub | Tarjeta “Próximamente” |
| Ajustes | Mínimo | Tema, texto y reinicio |
| Estados | Sí | Carga, vacío y 404 |

Las especificaciones siguientes describen la **visión completa** de cada pantalla. En la demo inicial se implementa solo lo indicado en esta tabla; el resto se simplifica o se marca como “Próximamente”.

### 7.1 Onboarding

> **Demo inicial:** se implementan 3 pasos (bienvenida, meta y resumen). Los pasos de LSP y nivel quedan como visión. En la demo, los pasos 1, 4 y 5 se renumeran como 1–3.

**Objetivo:** presentar la propuesta y capturar preferencias visuales en menos de 60 segundos.

**Ruta:** `/onboarding`

**Composición móvil:**

- Pantalla completa, una sola columna, contenido centrado.
- Barra superior con logo pequeño, indicador de pasos (3 puntos en demo inicial; 5 en visión) y botón “Saltar”.
- Ilustración o mascota en la mitad superior.
- Título grande, subtítulo breve y opciones en tarjetas apiladas.
- CTA fijo al fondo, ancho completo, respetando el área segura.

**Composición escritorio:**

- Tarjeta central de 960 px en dos columnas: ilustración a la izquierda (40 %) y contenido a la derecha (60 %).
- Misma secuencia de pasos; sin barra inferior.

**Pasos:**

| Paso | Contenido | Interacción |
|---|---|---|
| 1. Bienvenida | “Aprende Lengua de Señas Peruana a tu ritmo. Sin vidas, sin prisas.” | CTA “Empezar”; enlace “Solo quiero explorar” |
| 2. Lengua (visión) | “Esta demo enseña Lengua de Señas Peruana (LSP)” con la LSP seleccionada y nota “Otras lenguas, próximamente” | CTA “Continuar” |
| 3. Nivel (visión) | “¿Cuánto sabes ya?” con 3 opciones (desde cero, algunas señas, conversación) | Selección única; CTA “Continuar” |
| 4. Meta | “¿Cuánto quieres practicar al día?” con 10/20/30 min | Selección única; CTA “Crear mi plan” |
| 5. Resumen | “Tu plan está listo” + meta elegida (LSP y nivel en visión) | CTA “Empezar a aprender” → `/aprender` |

**Interacciones:**

- “Atrás” vuelve al paso anterior conservando la selección.
- “Saltar” completa el onboarding con valores por defecto y lleva al home.
- Las selecciones se guardan en el store al confirmar el paso.
- Animación de transición entre pasos de 250–300 ms; desactivada con movimiento reducido.

**Estados:**

- Sin selección: CTA deshabilitado con explicación visual (no solo color).
- Guardado: breve estado de carga simulado (300 ms) y avance.
- Regreso con onboarding ya completado: redirige a `/aprender` salvo que se acceda con `?reset=1` desde Ajustes.

**Criterios de aceptación:**

- Se puede completar en menos de 60 segundos.
- Funciona a 360 px sin scroll horizontal.
- El botón “Saltar” siempre está visible.
- Las preferencias se reflejan en Ajustes y en el home.

### 7.2 Aprender (home)

**Objetivo:** ser el centro de la demo: mostrar progreso, motivar y dar acceso inmediato a la siguiente lección.

**Ruta:** `/aprender`

**Composición móvil (de arriba a abajo):**

1. **Top bar:** avatar, racha (icono de fuego + días), indicador circular de meta diaria y botón de ajustes.
2. **Saludo:** “Hola, {nombre}” (por defecto “invitado”) y frase breve del día.
3. **Tarjeta “Continúa”:** próxima lección, unidad, progreso del día y CTA “Continuar” (o “Explorar diccionario” si todo está completo).
4. **Camino de unidades:** secciones con cabecera de color, título, descripción, progreso `x/y` y sendero serpenteante de nodos.
5. **Nodos:** completado (check), actual (pulso), disponible (estrella/play) y checkpoint (cofre/trofeo).
6. **CTA secundario:** “Explorar diccionario” y “Práctica (próximamente)”.
7. **Bottom nav.**

**Composición escritorio:**

- Barra lateral izquierda de 240 px.
- Columna central de 640 px con saludo, tarjeta de continuación y camino.
- Rail derecho de 320 px con: racha y calendario, meta diaria, tarjeta de liga “Próximamente” y acceso a perfil.
- Fondo con formas suaves y color por unidad; sin saturar.

**Contenido del camino (mock):**

| # | Unidad | Lecciones | Color |
|---|---|---|---|
| 1 | Primeros pasos | 5 | Violeta |
| 2 | Saludos y presentaciones | 5 | Coral |

La visión completa añade 4 unidades: Familia y personas, Números y tiempo, Colores y descripciones, y Comida y vida diaria.

**Interacciones:**

- Tocar un nodo abre una hoja con título, objetivo, XP y botón “Empezar” (o “Repetir”).
- El nodo actual tiene animación de flotación sutil (2 s, infinita) y un halo.
- La tarjeta “Continúa” lleva directamente a la primera lección no completada.
- “Practicar” abre `/practicar` en estado “Próximamente”.
- El indicador de racha abre un modal con calendario semanal.
- La tarjeta de liga abre `/clasificacion` en estado “Próximamente”.

**Estados:**

- **Primera visita:** nodo 1 destacado, XP 0, racha 0, copia “Tu primera lección te espera”.
- **En progreso:** nodo actual y tarjeta de continuación con la lección correspondiente.
- **Todo completado:** banner “¡Completaste la demo!” con CTA “Repetir unidad 1” y “Explorar diccionario”.
- **Carga:** skeletons de top bar, tarjeta y 3 nodos.
- **Error simulado:** tarjeta con mensaje y botón “Reintentar” (se activa con un flag de desarrollo).

**Criterios de aceptación:**

- Todos los nodos son clicables y abren la lección correcta.
- El progreso visual coincide con `localStorage`.
- La racha y la meta se actualizan al terminar una lección.
- No hay scroll horizontal a 320 px.
- En escritorio se ven las tres columnas sin que el camino quede estrecho.

### 7.3 Lección (player)

**Objetivo:** ofrecer una experiencia enfocada, rápida y satisfactoria de práctica.

**Ruta:** `/leccion/:lessonId`

**Composición (misma lógica en móvil y escritorio, con más aire en desktop):**

- **Barra superior:** botón cerrar (X), barra de progreso segmentada por ejercicio, contador `3/6` y combo actual.
- **Zona de ejercicio:** tarjeta central con instrucción, recurso visual o prompt y opciones.
- **Barra inferior fija:** botón principal “Comprobar” / “Continuar”, deshabilitado hasta que haya respuesta.
- **Feedback:** hoja inferior (bottom sheet) que cubre parcialmente el contenido, con color de acierto/error, icono, título, respuesta correcta y explicación breve.
- **Ancho máximo:** 720 px; en escritorio se permite un recurso visual más grande.
- **Sin corazones, sin temporizador límite, sin anuncios.**

**Flujo interno:**

1. Tarjeta de introducción de la lección: objetivo, ejemplo de seña y CTA “Empezar”.
2. 4–6 ejercicios en orden mixto (6–8 en la visión completa).
3. Pantalla de resultado dentro de la misma ruta o ruta hija.

**Interacciones:**

- Seleccionar una opción la marca; “Comprobar” valida.
- Enter comprueba y luego continúa; el foco se mantiene accesible.
- Tras el feedback, “Continuar” avanza al siguiente ejercicio.
- El botón X abre un modal: “¿Salir de la lección? Perderás el progreso de esta sesión” con “Seguir aprendiendo” y “Salir”.
- Al completar, se guardan XP, precisión, combo máximo y lección completada.
- No se puede avanzar sin comprobar, pero sí se puede salir en cualquier momento.

**Estados:**

- Carga de lección: skeleton de la tarjeta y barra.
- Ejercicio respondido: opción seleccionada, CTA activo.
- Feedback correcto/incorrecto.
- Progreso completo: transición a resultado.
- Error de datos: mensaje “No pudimos cargar esta lección” + volver al home.

**Criterios de aceptación:**

- Se completa una lección de principio a fin sin usar el mouse (solo teclado).
- El progreso de la barra refleja el ejercicio actual.
- El feedback nunca tapa el botón de continuar en móvil.
- El estado se actualiza en el store al finalizar.
- Salir y volver a entrar reinicia la sesión, pero conserva las lecciones ya completadas.

### 7.4 Resultado de lección

**Objetivo:** cerrar el ciclo con recompensa emocional y datos claros.

**Ruta:** `/leccion/:lessonId/resultado`

> **Demo inicial:** XP, precisión, confeti y aviso de logro. Tiempo y combo máximo quedan como visión.

**Composición:**

- Fondo con confeti (desactivado con movimiento reducido).
- Trofeo o mascota celebrando.
- Título: “¡Lección completada!” + frase aleatoria.
- Tres métricas en tarjetas: XP ganada, precisión (%), combo máximo.
- Tiempo total y lecciones completadas de la unidad.
- Anillo de meta diaria actualizado.
- CTA principal “Continuar” → home.
- CTA secundario “Repetir lección”.

**Interacciones:**

- La XP se suma una sola vez por lección completada; repetirla otorga XP de práctica (visual).
- Si se alcanza un hito (3 días de racha, 5 lecciones, 100 XP), se muestra un toast de logro.
- “Continuar” lleva al home con scroll al nodo actual.

**Estados:**

- Resultado normal.
- Resultado con nuevo logro (banner adicional).
- Acceso directo sin haber completado: redirige a la lección.

**Criterios de aceptación:**

- Las métricas coinciden con la sesión.
- El confeti no bloquea la interacción.
- La XP y la racha persisten al recargar.

### 7.5 Práctica

> **Demo inicial:** solo tarjeta “Próximamente”; el hub completo queda como visión.

**Objetivo:** dar un punto de entrada claro al repaso sin la estructura de unidades.

**Ruta:** `/practicar`

**Composición:**

- Título “Practica lo que quieras”.
- Tarjeta destacada “Repaso inteligente” con explicación simulada: “Basado en las señas que más te cuestan”.
- Grid de tarjetas por categoría: Saludos, Familia, Números, Colores, Comida, Alfabeto.
- Tarjeta “Señas falladas” con contador mock.
- CTA “Empezar repaso” en cada tarjeta.
- En escritorio, grid de 3 columnas; en móvil, una columna.

**Interacciones:**

- Cada tarjeta inicia una sesión de práctica con 5–6 ejercicios generados del dataset.
- La sesión reutiliza el player con un modo `practice` (sin título de lección, sin progreso de unidad).
- Al terminar, muestra un resultado simplificado y vuelve a `/practicar`.
- Si no hay señas falladas, estado vacío amable con CTA al diccionario.

**Criterios de aceptación:**

- Las sesiones de práctica se completan y no afectan el progreso de unidades.
- El estado vacío no parece un error.
- Los filtros por categoría generan ejercicios coherentes.

### 7.6 Diccionario

**Objetivo:** permitir explorar señas de forma libre y rápida, sin depender de una lección.

**Ruta:** `/diccionario`

> **Demo inicial:** 20 señas en 6 categorías (sin Animales) + alfabeto. La visión completa añade la categoría Animales y más señas.

**Composición móvil:**

- Título “Diccionario” y contador de señas disponibles.
- Buscador sticky con icono de lupa y botón de limpiar.
- Chips horizontales desplazables: Todas, Alfabeto, Saludos, Familia, Números, Colores, Comida, Frases (Animales en visión).
- Acceso destacado al **alfabeto dactilológico** (A–Z + Ñ).
- Grid de 2 columnas de tarjetas de seña.
- Estado vacío con ilustración y sugerencias.
- Bottom nav.

**Composición escritorio:**

- Barra lateral.
- Cabecera con buscador ancho (máx. 560 px).
- Grid de 4 columnas y filtros en una fila.
- Panel de detalle lateral opcional; se prioriza la navegación a página completa.

**Tarjeta de seña (`SignCard`):**

- Imagen 1:1 o 4:3 con portada/placeholder y botón “Ver secuencia”.
- Glosa en mayúsculas y traducción debajo.
- Chip de categoría y badge “LSP”.
- Indicador de dificultad (1–3 puntos).
- Hover: elevación leve y vista previa de la secuencia en desktop (respetando movimiento reducido).

**Interacciones:**

- Búsqueda instantánea, insensible a mayúsculas y acentos.
- Filtro por categoría combinable con búsqueda.
- Tocar una tarjeta abre `/diccionario/:signId`.
- El alfabeto abre una vista de 27 letras con mano ilustrada; cada letra lleva a su detalle.
- “Limpiar filtros” restablece la vista.

**Estados:**

- Carga: skeletons de 8 tarjetas.
- Sin resultados: “No encontramos esa seña. Prueba con otra palabra o explora una categoría.”
- Error simulado: mensaje con “Reintentar”.
- Búsqueda con foco: borde de marca y teclado móvil sin zoom (fuente ≥ 16 px).

**Criterios de aceptación:**

- La búsqueda responde en menos de 150 ms con el dataset mock.
- Nunca se muestra una tarjeta sin glosa, traducción y alternativa textual.
- Funciona con teclado y lector de pantalla.
- El grid no rompe el layout con títulos largos (truncado a 2 líneas + tooltip).

### 7.7 Detalle de seña

**Objetivo:** mostrar la seña con claridad y dar contexto para practicarla.

**Ruta:** `/diccionario/:signId`

> **Demo inicial:** se implementan imagen/secuencia, diagrama interactivo cuando exista, espejo, glosa, descripción, expresión no manual y señas relacionadas. “Practicar esta seña” muestra “Próximamente”.

**Composición móvil:**

- Botón atrás y acciones (compartir/marcar) en la barra superior.
- Imagen, secuencia o diagrama interactivo grande 4:3 o 1:1 con controles: fotograma anterior/siguiente, reproducir secuencia, repetir y espejo.
- Glosa grande + traducción.
- Chips: categoría, LSP, dificultad.
- Descripción textual de la seña (alternativa accesible).
- Bloque “Diagrama” con hotspots tocables si la seña tiene zonas activas; cada hotspot muestra su etiqueta y descripción.
- Bloque “Expresión no manual” si aplica.
- Sección “Señas relacionadas” con carrusel horizontal.
- CTA fijo “Practicar esta seña” (en la demo inicial muestra “Próximamente”).
- Nota “Contenido de demostración”.

**Composición escritorio:**

- Dos columnas: recurso visual a la izquierda (55 %), información y CTA a la derecha (45 %).
- Señas relacionadas debajo, en grid de 4.

**Interacciones:**

- Al pulsar “Reproducir”, la secuencia se repite en bucle sin audio; el botón de pausa detiene la animación.
- La secuencia se reproduce fotograma a fotograma (150–250 ms por fotograma) o de forma manual; “Reproducir” solo avanza las imágenes.
- Espejo aplica `transform: scaleX(-1)` al recurso visual y a la secuencia completa.
- En la visión completa, “Practicar” genera 5 ejercicios con esa seña como protagonista.
- Compartir copia la URL al portapapeles y muestra toast (sin redes sociales reales).

**Estados:**

- Seña inexistente: 404 con CTA al diccionario.
- Recurso visual no disponible: placeholder con descripción y aviso “Ilustración en preparación”.
- Preferencia de reproducción/espejo recordada durante la sesión.

**Criterios de aceptación:**

- Toda seña tiene texto alternativo y descripción.
- Los controles son accesibles por teclado y tienen etiquetas `aria-label`.
- Los recursos visuales no se reproducen automáticamente: la persona decide cuándo avanzar.
- La URL es compartible y recargable.

### 7.8 Perfil

> **Demo inicial:** versión mínima con avatar, XP, racha, lecciones completadas y 6 logros. Sin gráfico semanal ni precisión media; el resto queda como visión.

**Objetivo:** resumir el avance y reforzar la identidad y la motivación.

**Ruta:** `/perfil`

**Composición:**

- Cabecera con avatar, nombre editable (“Invitado” por defecto), nivel y fecha de inicio ficticia.
- Botón de ajustes.
- Tarjetas de estadísticas: XP total, racha actual, lecciones completadas, señas exploradas, precisión media.
- Gráfico de actividad semanal (barras CSS/SVG con datos mock).
- Grid de logros: desbloqueados a color, bloqueados en gris con pista.
- Acceso a “Reiniciar demo” solo dentro de Ajustes.
- En escritorio, cabecera ancha y grid de 3–4 columnas.

**Interacciones:**

- Editar nombre abre un input inline o modal; se guarda en `localStorage`.
- Tocar un logro abre un modal con descripción y condición.
- Las estadísticas se calculan del store, no están hardcodeadas (salvo la fecha de inicio).
- El gráfico muestra los últimos 7 días; si no hay datos, barras en cero.

**Estados:**

- Perfil nuevo: logros bloqueados, estadísticas en cero, copy motivador.
- Perfil avanzado: logros desbloqueados y gráfico con actividad.
- Sin conexión: no aplica (todo local).

**Criterios de aceptación:**

- Las métricas se actualizan tras completar lecciones.
- Los logros desbloqueados coinciden con las condiciones.
- El nombre persiste al recargar.
- El grid es legible a 360 px.

### 7.9 Clasificación

> **Demo inicial:** solo tarjeta “Próximamente”; la liga completa queda como visión.

**Objetivo:** mostrar la mecánica social sin implicar competencia real ni restricciones.

**Ruta:** `/clasificacion`

**Composición:**

- Título “Liga semanal” y temporizador ficticio (“Termina en 3 días”).
- Podio de los 3 primeros con avatares, nombres y XP.
- Lista del 4.º al 15.º con fila propia resaltada.
- Zona de ascenso/descenso solo como referencia visual.
- Nota “Datos ficticios de demostración”.
- En escritorio, tarjeta central de 720 px con fondo decorativo.

**Interacciones:**

- Cambio de pestaña “Liga” / “Amigos” (Amigos muestra estado vacío con CTA a invitar, sin función real).
- Tocar un participante muestra un perfil público mock en modal.
- El usuario demo aparece con su XP real y posición calculada contra los datos mock.

**Estados:**

- Liga normal.
- Amigos vacío.
- Empate en XP: orden estable por nombre.

**Criterios de aceptación:**

- La posición del usuario se calcula correctamente.
- La lista no se rompe con nombres largos.
- Queda claro que los datos son ficticios.

### 7.10 Ajustes

> **Demo inicial:** tema, movimiento reducido, meta diaria, texto alternativo y reinicio. Las preferencias avanzadas quedan como visión.

**Objetivo:** concentrar preferencias y permitir reiniciar la demo.

**Ruta:** `/ajustes`

**Composición:**

- Secciones agrupadas en tarjetas: Cuenta, Aprendizaje, Recursos visuales, Accesibilidad, Apariencia, Demo.
- Cada fila: título, descripción breve y control a la derecha.
- En móvil, una columna; en escritorio, ancho máximo 720 px centrado.
- Footer con versión y enlace “Ver plan de implementación” (opcional).

**Controles:**

| Sección | Control | Comportamiento |
|---|---|---|
| Cuenta | “Invitado” + botón “Crear cuenta” | Toast “Disponible en la versión completa” |
| Aprendizaje | Lengua de señas | LSP fija (Perú); nota “Otras lenguas, próximamente” sin opción activa |
| Aprendizaje | Meta diaria | 10/20/30 min → 20/30/50 XP |
| Recursos visuales | Reproducción de secuencia | Manual / automática |
| Recursos visuales | Espejo por defecto | Switch |
| Recursos visuales | Mostrar descripción textual | Switch |
| Accesibilidad | Movimiento reducido | Switch; también respeta el sistema |
| Accesibilidad | Texto alternativo visible | Switch |
| Apariencia | Tema | Claro / Oscuro / Sistema |
| Demo | Reiniciar demo | Modal de confirmación + limpieza de `localStorage` |

**Interacciones:**

- Cada cambio se guarda al instante y muestra un toast breve.
- “Reiniciar demo” exige escribir o confirmar en modal; al aceptar, redirige a `/onboarding`.
- Los switches tienen estado, etiqueta y descripción accesibles.

**Criterios de aceptación:**

- Todos los ajustes persisten al recargar.
- El tema oscuro se aplica sin destellos blancos.
- El reinicio deja la app como recién instalada.
- Ningún control parece roto: los no implementados explican su estado.

### 7.11 Estados globales y pantallas auxiliares

- **404:** mascota confundida, “Esta página no existe en la demo”, CTA “Volver a aprender”.
- **Sin conexión:** no aplica; los assets se sirven localmente o desde CDN.
- **Toasts:** duración 3 s, cierre manual, `aria-live="polite"`.
- **Modales:** foco atrapado, Esc cierra, fondo oscurecido, scroll bloqueado.
- **Skeletons:** solo en primeras cargas simuladas; nunca parpadeos prolongados.
- **Modo demo:** badge discreto “Demo” en el footer de Ajustes y en el detalle de seña.

---

## 8. Sistema de diseño

### 8.1 Principios visuales

- **Alegre, no infantil.** Colores vivos con abundante espacio en blanco y tipografía redondeada solo en títulos.
- **Jerarquía clara.** Una acción principal por pantalla.
- **Profundidad suave.** Sombras difusas y bordes de 1 px; sin neumorfismo exagerado.
- **Movimiento con propósito.** Animaciones para dar feedback, no para decorar.
- **Contraste alto.** Texto legible sobre fondos de color.

### 8.2 Tokens de color

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#F7F7FB` | `#101018` | Fondo de la app |
| `--surface` | `#FFFFFF` | `#1A1A26` | Tarjetas y hojas |
| `--surface-alt` | `#F0EFF8` | `#232334` | Campos, chips, skeletons |
| `--text` | `#1B1B2F` | `#F5F5FA` | Texto principal |
| `--text-muted` | `#5F5F78` | `#A7A7BC` | Texto secundario |
| `--border` | `#E4E3EF` | `#2E2E42` | Bordes y divisores |
| `--primary` | `#5B4BF5` | `#8B7DFF` | Marca y CTA |
| `--primary-strong` | `#4636D6` | `#A79DFF` | Hover y texto sobre claro |
| `--primary-soft` | `#ECE9FE` | `#2A2550` | Fondos suaves |
| `--accent` | `#F5A524` | `#FFC24B` | Racha, XP, estrellas |
| `--success` | `#2FBF71` | `#4ADE80` | Acierto |
| `--error` | `#E5484D` | `#FF6B6F` | Error |
| `--info` | `#2E90FA` | `#60A5FA` | Información |

**Colores por unidad:** violeta `#5B4BF5`, coral `#F97066`, teal `#14B8A6`, ámbar `#F5A524`, azul `#2E90FA`, fucsia `#D946EF`. Cada unidad usa su color en cabecera, nodo y detalles, con texto blanco o tinta según contraste.

### 8.3 Tipografía

| Rol | Fuente | Tamaño / línea | Peso |
|---|---|---|---|
| Display | Baloo 2 | 32/38 px (móvil 28/34) | 700 |
| H1 | Baloo 2 | 28/34 px | 700 |
| H2 | Baloo 2 | 24/30 px | 600 |
| H3 | Inter | 20/28 px | 600 |
| Body | Inter | 16/24 px | 400 |
| Body strong | Inter | 16/24 px | 600 |
| Small | Inter | 14/20 px | 400 |
| Caption | Inter | 12/16 px | 500 |

- Fuentes autoalojadas (Fontsource) para evitar dependencias externas y flashes.
- Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- No usar más de 3 pesos por pantalla.
- En móvil, el cuerpo nunca baja de 16 px en campos de entrada.

### 8.4 Espaciado, radios y sombras

- **Escala base 4 px:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- **Radios:** 8 px (chips pequeños), 12 px (inputs), 16 px (tarjetas), 24 px (hojas/modales), 999 px (píldoras).
- **Sombras:**
  - `sm`: `0 1px 2px rgba(27,27,47,.06)`
  - `md`: `0 8px 24px rgba(27,27,47,.08)`
  - `lg`: `0 16px 40px rgba(27,27,47,.12)`
- **Bordes:** 1 px `--border`; en modo oscuro, sin sombras duras.

### 8.5 Botones

| Variante | Uso | Estilo |
|---|---|---|
| Primario | Acción principal | Fondo `--primary`, texto blanco, sombra inferior 3 px más oscura |
| Secundario | Acción alternativa | Fondo `--primary-soft`, texto `--primary-strong` |
| Terciario / ghost | Enlaces y acciones menores | Sin fondo, texto `--primary-strong` |
| Peligro | Reiniciar, salir | Fondo `--error`, texto blanco |
| Icono | Cerrar, ajustes, play | 44×44 px mínimo, `aria-label` obligatorio |

- Alturas: 40 px (sm), 48 px (md), 52 px (lg). En lección, 52–56 px.
- Estado disabled: opacidad 45 % + cursor `not-allowed`; nunca solo cambio de color.
- Estado loading: spinner y texto “Comprobando…”, mantiene el ancho.
- Foco visible: anillo de 2 px `--primary` con offset de 2 px.

### 8.6 Componentes reutilizables

| Componente | Descripción |
|---|---|
| `AppShell` | Layout con sidebar/bottom nav y contenido |
| `TopBar` | Avatar, racha, meta, ajustes |
| `BottomNav` | Navegación móvil de 4 ítems |
| `Sidebar` | Navegación de escritorio |
| `Button` / `IconButton` | Variantes y estados |
| `Card` | Superficie base con padding y radio |
| `Chip` | Filtros y etiquetas |
| `ProgressBar` | Progreso lineal y segmentado |
| `ProgressRing` | Meta diaria / racha |
| `SignVisual` | Imagen, secuencia de fotogramas, diagrama SVG o placeholder accesible |
| `FrameStepper` | Navegación anterior/siguiente y reproducción de la secuencia |
| `HotspotDiagram` | Diagrama SVG con zonas activas y etiquetas explicativas |
| `SignCard` | Tarjeta del diccionario |
| `PathNode` | Nodo del camino con estados |
| `UnitHeader` | Cabecera de unidad con color |
| `StatTile` | Métrica con icono y valor |
| `AchievementBadge` | Logro bloqueado/desbloqueado |
| `Modal` / `BottomSheet` | Diálogos y feedback |
| `Toast` | Mensajes temporales |
| `Switch` | Preferencias booleanas |
| `SegmentedControl` | Velocidad, tema, liga/amigos |
| `Skeleton` | Carga simulada |
| `EmptyState` | Sin resultados / sin datos |
| `Confetti` | Celebración con opción reducida |
| `Avatar` | Iniciales o ilustración |
| `Tabs` | Secciones del perfil o liga |

### 8.7 Iconografía e ilustración

- **Iconos:** Lucide o set propio lineal, trazo 2 px, esquinas redondeadas.
- **Ilustraciones:** estilo flat con texturas suaves; manos simplificadas pero anatómicamente creíbles.
- **Mascota:** original, con manos visibles y expresivas; evitar imitar marcas existentes.
- **Imágenes de señas:** fondo neutro, encuadre de medio cuerpo, iluminación uniforme, sin distracciones; misma composición en todos los fotogramas de una secuencia.
- **Placeholder:** tarjeta con degradado de la unidad, icono de mano y texto “Ilustración en preparación”.

### 8.8 Movimiento

| Token | Duración | Uso |
|---|---|---|
| `fast` | 120 ms | Hover, press, switches |
| `base` | 200 ms | Aparición de tarjetas, feedback |
| `slow` | 320 ms | Cambios de pantalla, bottom sheet |
| `celebration` | 600–900 ms | Confeti, trofeo |

- Easing estándar: `cubic-bezier(.2, .8, .2, 1)`.
- Nodo actual: flotación de 4 px en 2 s, infinita y sutil.
- `prefers-reduced-motion: reduce` desactiva flotación, confeti y transiciones largas; mantiene cambios de opacidad.
- Nunca animar más de 2 elementos simultáneos en móvil.

### 8.9 Modo oscuro

- Implementado con clase `.dark` en `<html>` y tokens CSS.
- Respeta `prefers-color-scheme` cuando el ajuste es “Sistema”.
- Guarda la preferencia explícita en `localStorage`.
- Evitar negro puro: fondos `#101018` y superficies `#1A1A26`.
- Revisar contraste de colores de unidad en oscuro; aclarar un 10–15 % si es necesario.

## 9. Diseño responsive

### 9.1 Breakpoints

| Rango | Ancho | Navegación | Contenido | Notas |
|---|---|---|---|---|
| Móvil | 360–639 px | Bottom nav | 1 columna | Lección a pantalla completa |
| Móvil grande | 640–767 px | Bottom nav | 1–2 columnas | Tarjetas del diccionario a 2 |
| Tablet | 768–1023 px | Bottom nav | 2–3 columnas | Home en 2 columnas sin rail |
| Escritorio | 1024–1439 px | Sidebar 240 px | 3–4 columnas | Home con rail de 320 px |
| Escritorio amplio | ≥ 1440 px | Sidebar | Máx. 1200 px centrado | Fondos decorativos |

Breakpoints de Tailwind: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. El diseño parte de 360 px y se valida también a 320 px (iPhone SE antiguo / zoom 200 %).

### 9.2 Reglas de layout

- **Contenedor:** `width: 100%`, padding lateral de 16 px en móvil, 24 px en tablet, 32 px en escritorio.
- **Ancho máximo:** 1200 px para home y 1120 px para el resto.
- **Home escritorio:** grid `240px minmax(0, 640px) 320px` con gap de 32 px, centrado.
- **Lección:** ancho máximo 720 px, centrada; el fondo ocupa toda la pantalla.
- **Diccionario:** grid `repeat(2, 1fr)` móvil, `repeat(3, 1fr)` tablet, `repeat(4, 1fr)` escritorio.
- **Perfil:** grid de 2 columnas en tablet y 3 en escritorio para estadísticas y logros.
- **Imágenes y secuencias:** `aspect-ratio` fijo, `object-fit: cover`, sin saltos de layout.
- **Textos largos:** `overflow-wrap: anywhere` en glosas y nombres; truncado a 2 líneas con `line-clamp`.

### 9.3 Navegación y ergonomía

- Bottom nav solo visible por debajo de 1024 px; en lección se oculta.
- Zonas táctiles mínimas de 44×44 px, con 8 px de separación.
- Acciones principales al alcance del pulgar: CTA fijo al fondo en onboarding, lección y detalle de seña.
- Respetar `env(safe-area-inset-bottom)` en iOS.
- Evitar `hover` como única affordance: todo hover tiene equivalente táctil.
- En escritorio, los enlaces de la sidebar muestran tooltip si se colapsa a iconos (opcional).

### 9.4 Comportamiento por pantalla

| Pantalla | Móvil | Escritorio |
|---|---|---|
| Onboarding | 1 columna, CTA fijo | Tarjeta 2 columnas |
| Home | Camino + tarjeta continua | Sidebar + camino + rail |
| Lección | Full-screen, feedback en sheet | Centrada, recurso visual más grande |
| Resultado | Métricas apiladas | Métricas en fila |
| Diccionario | 2 columnas, filtros scroll horizontal | 4 columnas, filtros en fila |
| Detalle | Recurso visual + info apiladas, CTA fijo | 2 columnas |
| Perfil | 1 columna | Grid 3 columnas |
| Clasificación | Lista a ancho completo | Tarjeta 720 px |
| Ajustes | 1 columna | 720 px centrado |

### 9.5 Pruebas responsive obligatorias

- 320×568, 360×640, 390×844, 430×932.
- 768×1024 y 1024×768 (tablet horizontal).
- 1366×768, 1440×900, 1920×1080.
- Zoom del navegador al 200 % sin scroll horizontal.
- Orientación horizontal en móvil: la lección no debe cortar el CTA.
- Con teclado abierto en iOS/Android, el CTA no debe quedar tapado.

---

## 10. Contenido y datos simulados

### 10.1 Modelo de datos

```ts
export type LanguageVariant = "LSP"; // Lengua de Señas Peruana

export type SignCategory =
  | "saludos"
  | "familia"
  | "numeros"
  | "colores"
  | "comida"
  | "animales"
  | "frases"
  | "alfabeto";

// Demo inicial: saludos, familia, numeros, colores, comida y frases + alfabeto.
// La visión completa añade animales.

export interface SignFrame {
  id: string;
  src: string;   // /media/signs/hola/frame-01.webp
  alt: string;   // descripción del fotograma
}

export interface Hotspot {
  id: string;
  x: number;     // porcentaje 0–100 sobre la imagen
  y: number;
  label: string;
}

export interface SignVisual {
  cover: string;          // imagen principal (WebP/AVIF)
  frames?: SignFrame[];   // 2–4 fotogramas en demo; hasta 5 en visión
  diagram?: string;       // SVG interactivo opcional
  hotspots?: Hotspot[];   // zonas activas del diagrama
}

export interface Sign {
  id: string;
  gloss: string;              // "HOLA" (glosa, no traducción literal)
  translation: string;        // "Hola"
  category: SignCategory;
  variant: LanguageVariant;
  visual: SignVisual;
  description: string;        // alternativa textual accesible
  nonManualMarkers?: string;  // expresión facial / contacto visual
  difficulty: 1 | 2 | 3;
  related?: string[];
}

export interface ExerciseBase {
  id: string;
  prompt?: string;
}

export type Exercise =
  | (ExerciseBase & { type: "sign_to_meaning"; signId: string; options: string[]; answer: string })
  | (ExerciseBase & { type: "meaning_to_sign"; translation: string; optionSignIds: string[]; answerSignId: string })
  | (ExerciseBase & { type: "fingerspelling"; word: string })
  | (ExerciseBase & { type: "gloss_order"; tokens: string[]; answer: string[]; translation: string })
  | (ExerciseBase & { type: "match_pairs"; pairs: Array<{ signId: string; text: string }> })
  | (ExerciseBase & { type: "frame_order"; signId: string; frameIds: string[]; answer: string[] })
  | (ExerciseBase & { type: "hotspot_select"; signId: string; question: string; answerHotspotId: string })
  | (ExerciseBase & { type: "self_assessment"; signId: string });

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  objective: string;
  xp: number;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export interface UserProgress {
  onboardingCompleted: boolean;
  variant: LanguageVariant;
  dailyGoalXp: number;
  xpTotal: number;
  xpToday: number;
  streakDays: number;
  lastPracticeDate: string | null;
  completedLessonIds: string[];
  bestCombo: number;
  achievements: string[];
}
```

### 10.2 Ejemplo de seña

```json
{
  "id": "sign-hola",
  "gloss": "HOLA",
  "translation": "Hola",
  "category": "saludos",
  "variant": "LSP",
  "visual": {
    "cover": "/media/signs/hola/cover.webp",
    "frames": [
      {
        "id": "frame-01",
        "src": "/media/signs/hola/frame-01.webp",
        "alt": "Mano abierta a la altura del hombro"
      },
      {
        "id": "frame-02",
        "src": "/media/signs/hola/frame-02.webp",
        "alt": "La mano se desplaza brevemente hacia fuera"
      },
      {
        "id": "frame-03",
        "src": "/media/signs/hola/frame-03.webp",
        "alt": "La mano vuelve a la posición inicial"
      }
    ],
    "diagram": "/media/signs/hola/diagram.svg",
    "hotspots": [
      { "id": "mano", "x": 62, "y": 38, "label": "Mano abierta" },
      { "id": "hombro", "x": 48, "y": 55, "label": "Altura del hombro" }
    ]
  },
  "description": "Saludo con la mano abierta a la altura del hombro, movimiento breve y sonrisa. Texto de ejemplo pendiente de validación.",
  "nonManualMarkers": "Contacto visual y sonrisa leve.",
  "difficulty": 1,
  "related": ["sign-buenos-dias", "sign-adios"]
}
```

> Los textos de ejemplo **no sustituyen la validación** de una persona sorda signante de la LSP, preferentemente de la variedad regional de referencia.

### 10.3 Volumen del dataset mock

| Contenido | Demo inicial | Visión completa |
|---|---|---|
| Unidades | 2 | 6 |
| Lecciones | 10 (5 por unidad) | 30 (5 por unidad) |
| Ejercicios | 40–60 (4–6 por lección) | 180–240 (6–8 por lección) |
| Señas | 20 | 60 |
| Fotogramas por seña | 2–4 | 2–5 |
| Diagramas interactivos | 5 | 15–20 |
| Assets visuales | 60–100 imágenes WebP/AVIF | 180–300 |
| Alfabeto dactilológico peruano | 27 (A–Z + Ñ) | 27 (A–Z + Ñ) |
| Categorías de señas | 6 (+ alfabeto) | 7 (+ alfabeto) |
| Logros | 6 | 10 |
| Participantes de liga | 0 (stub “Próximamente”) | 15 ficticios |
| Señas relacionadas | 2 | 2–3 |

En la demo inicial los ejercicios se generan a partir de las 20 señas. Se revisará que no queden opciones duplicadas ni respuestas ambiguas.

### 10.4 Fuente y organización de datos

```
src/data/
├─ signs.ts          # 20 señas + alfabeto
├─ units.ts          # 2 unidades y 10 lecciones
├─ exercises.ts      # ejercicios o generador determinista
├─ achievements.ts   # 6 logros
└─ copy.ts           # textos de interfaz y microcopy
```

- Los identificadores son estables y legibles (`sign-hola`, `unit-saludos`, `lesson-saludos-1`).
- No se usan índices de array como IDs.
- Los datos se validan con Zod en desarrollo (opcional) para detectar referencias rotas entre lecciones y señas.
- El dataset se versiona junto con el código.

### 10.5 Capa de servicio simulada

```ts
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUnits(): Promise<Unit[]> {
  await delay(350); // simula red para mostrar skeletons
  return units;
}

export async function fetchSigns(): Promise<Sign[]> {
  await delay(250);
  return signs;
}
```

- Toda lectura pasa por esta capa, nunca importa el array directamente en la pantalla.
- Un flag `VITE_SIMULATE_ERRORS=true` permite probar estados de error.
- La latencia es de 250–400 ms; no debe superar 600 ms para no frustrar la demo.

### 10.6 Reglas de contenido y tono

- Glosa en mayúsculas, sin artículos ni conjugaciones.
- Traducción al **español peruano** clara y natural, marcada como aproximación.
- Descripciones objetivas: mano dominante, altura, movimiento, orientación y expresión.
- Usar siempre “**Lengua de Señas Peruana (LSP)**”; evitar “lenguaje de señas peruano” y no presentarla como universal.
- No mezclar señas de otras lenguas de señas ni asumir que una seña de otro país es válida en la LSP.
- Documentar la variedad regional de referencia de cada seña cuando se conozca.
- No usar términos como “sordomudo”; usar “persona sorda” o “persona con discapacidad auditiva” según prefiera la comunidad.
- Incluir ejemplos diversos en nombres y situaciones, sin estereotipos.
- Cada pantalla con contenido mock muestra “Contenido de demostración”.

---

## 11. Tipos de ejercicio

### 11.1 Resumen

| Tipo | Prompt | Interacción | Validación | Demo inicial |
|---|---|---|---|---|
| `sign_to_meaning` | Imagen o secuencia de una seña | Elegir 1 de 4 textos | Comparación exacta | Sí |
| `meaning_to_sign` | Palabra o frase | Elegir 1 de 4 imágenes | Comparación de ID | Sí |
| `fingerspelling` | Palabra para deletrear | Tocar letras en orden | Secuencia exacta | No |
| `gloss_order` | Glosa desordenada | Ordenar fichas | Array ordenado | No |
| `match_pairs` | 4 señas y 4 textos | Emparejar | Todos los pares | Sí |
| `frame_order` | 3–4 fotogramas desordenados | Ordenar la secuencia | Orden exacto de IDs | Sí |
| `hotspot_select` | Diagrama con zonas activas | Tocar la zona correcta | ID del hotspot | No |
| `self_assessment` | Seña modelo | Grabar (simulado) y autoevaluar | Autoinforme | No |

**Demo inicial:** 4 tipos (`sign_to_meaning`, `meaning_to_sign`, `match_pairs`, `frame_order`). Los otros 4 quedan documentados para la visión completa. Los diagramas con hotspots sí pueden usarse como recurso de consulta en el detalle de seña.

### 11.2 Significado de la seña

- **Instrucción:** “¿Qué significa esta seña?”
- **Recurso visual:** imagen clave + secuencia de 2–4 fotogramas; controles de anterior/siguiente y repetir.
- **Opciones:** 4 botones de texto verticales, con una sola respuesta correcta y distractores de la misma categoría.
- **Feedback correcto:** “¡Bien! HOLA se usa para saludar.”
- **Feedback incorrecto:** “Casi. La respuesta correcta es «Hola».” + descripción breve.
- **Accesibilidad:** la seña tiene descripción textual disponible con el botón “Describir seña”.

### 11.3 Seña correcta

- **Instrucción:** “¿Cómo se dice «Gracias»?”
- **Prompt:** palabra grande + pista de categoría opcional.
- **Opciones:** 4 tarjetas con imagen/placeholder y botón “Ver secuencia”; al seleccionar, se muestran los fotogramas.
- **Validación:** ID de la seña.
- **Feedback:** muestra la seña correcta y su descripción.
- **Cuidado:** las imágenes deben ser claramente distinguibles entre sí; evitar distractores casi idénticos en la demo.

### 11.4 Dactilología

- **Instrucción:** “Deletrea «SOL» con el alfabeto dactilológico.”
- **Interfaz:** casillas para cada letra + teclado de 27 letras (A–Z, Ñ) en grid de 7×4.
- **Interacción:** tocar una letra la coloca en la siguiente casilla; tocar una casilla llena la borra; botón “Borrar todo”.
- **Ayuda:** al mantener pulsada una letra, se muestra la mano correspondiente en un panel.
- **Validación:** secuencia exacta, sin distinguir mayúsculas.
- **Feedback:** resalta la letra incorrecta y permite reintentar.
- **Alternativa:** en escritorio se acepta teclado físico.

### 11.5 Ordenar glosa

- **Instrucción:** “Ordena la glosa de esta frase.”
- **Contexto:** traducción al español visible (“¿Cómo te llamas?”).
- **Fichas:** tokens como `TÚ`, `NOMBRE`, `¿CUÁL?`; se tocan para añadir a la línea de respuesta y se pueden quitar.
- **Validación:** orden exacto de la glosa de ejemplo.
- **Nota pedagógica:** explicar que la glosa no es una traducción palabra por palabra y que la gramática de la LSP no calca la del español.
- **Feedback:** muestra el orden correcto y una explicación breve.
- **Demo:** usar frases cortas de 3–5 fichas para evitar frustración.

### 11.6 Emparejar

- **Instrucción:** “Une cada seña con su significado.”
- **Layout:** dos columnas (señas a la izquierda, textos a la derecha) o grid de 8 tarjetas en móvil.
- **Interacción:** tocar una seña y luego un texto; los pares correctos se bloquean en verde y desaparecen o se atenúan; los incorrectos vibran y se desmarcan.
- **Validación:** al completar los 4 pares.
- **Accesibilidad:** selección por teclado, anuncio de “par correcto” con `aria-live`.
- **Sin penalización:** los errores no restan XP ni vidas.

### 11.7 Ordenar fotogramas

- **Instrucción:** “Ordena los fotogramas de esta seña.”
- **Interfaz:** 3–4 imágenes desordenadas en una fila o grid; cada una muestra un momento de la seña. Si la seña no tiene suficientes fotogramas, se omite este tipo en esa lección.
- **Interacción:** tocar una imagen la añade a la línea de tiempo; se puede quitar o reordenar con botones accesibles.
- **Validación:** orden exacto de los IDs de los fotogramas.
- **Feedback:** reproduce la secuencia correcta y explica inicio, movimiento y fin.
- **Accesibilidad:** alternativa con lista numerada y botones “Subir/Bajar”; no depende de arrastrar.
- **Demo:** usar secuencias de 3 fotogramas para mantener la rapidez.

### 11.8 Señalar la zona

- **Instrucción:** “¿Dónde se realiza el movimiento?” o “Toca la mano que se mueve.”
- **Interfaz:** diagrama SVG o imagen con zonas activas (`hotspots`) sobre mano, brazo o rostro.
- **Interacción:** tocar una zona; se marca y se valida.
- **Validación:** ID del hotspot correcto.
- **Feedback:** resalta la zona correcta y muestra una etiqueta explicativa.
- **Accesibilidad:** los hotspots también existen como lista de botones con etiqueta; no se depende de la precisión táctil.
- **Demo:** 2–4 zonas por diagrama para evitar ambigüedad.

### 11.9 Autoevaluación con cámara simulada

- **Instrucción:** “Haz esta seña frente a la cámara.”
- **Interfaz:** visor con silueta/placeholder, cuenta atrás 3-2-1, barra de “grabación” de 5 s y botón de detener.
- **Importante:** en la demo **no se accede a la cámara real** ni se graba nada; se muestra un aviso “Grabación simulada”.
- **Post-grabación:** “¿Cómo te fue?” con dos opciones: “Lo logré” (verde) y “Quiero repetir” (neutro).
- **Resultado:** siempre positivo; si elige repetir, vuelve a la cuenta atrás.
- **Futuro:** la versión real podría usar `getUserMedia` y análisis de manos, con consentimiento explícito y procesamiento local.

### 11.10 Reglas del motor de lecciones

- Cada lección tiene 4–6 ejercicios en la demo inicial (6–8 en la visión completa) y una tarjeta de introducción.
- La secuencia mezcla tipos; no se repite el mismo tipo más de dos veces seguidas.
- El progreso se calcula como `ejercicio actual / total`.
- La XP es visual: +10 por acierto al primer intento, +5 si se acierta tras reintento, +20 al completar la lección.
- La precisión es `aciertos al primer intento / total de ejercicios`.
- El combo aumenta con aciertos consecutivos al primer intento; se reinicia con un error.
- No hay límite de tiempo ni de intentos.
- Al salir, se descarta la sesión; las lecciones completadas y la XP ya otorgada se conservan.
- La lección se considera completada al llegar al último ejercicio, aunque haya errores.

## 12. Arquitectura técnica

### 12.1 Stack recomendado

| Capa | Tecnología | Motivo |
|---|---|---|
| Framework | React + TypeScript | Ecosistema, componentes, tipado del dataset |
| Build | Vite | Demo estática, arranque rápido, deploy simple |
| Estilos | Tailwind CSS + tokens CSS | Velocidad de implementación y consistencia |
| Ruteo | React Router | Rutas declarativas, deep links y 404 |
| Animación | Motion (Framer Motion) | Transiciones y microinteracciones |
| Estado | Zustand + `persist` | Store simple con `localStorage` |
| Iconos | Lucide React | Set consistente y liviano |
| Tipografías | Fontsource (Baloo 2, Inter) | Autoalojadas, sin FOUT externo |
| Formularios | React Hook Form + Zod (opcional) | Solo para edición de nombre/ajustes |
| Tests | Vitest + Testing Library, Playwright (smoke) | Verificación del flujo crítico |
| Calidad | ESLint + Prettier + `tsc --noEmit` | Consistencia y detección temprana |
| Deploy | Vercel / Netlify / GitHub Pages | URL compartible en minutos |

**Alternativa:** Next.js si se prevé SEO, backend o contenido dinámico a corto plazo. Para una demo estática, Vite reduce complejidad y tiempo de build.

**Restricciones:** sin backend, sin base de datos, sin autenticación, sin servicios de pago. Todo debe funcionar con `npm run dev` y `npm run build`.

### 12.2 Estructura del repositorio

```
app-lengua-senas/
├─ public/
│  ├─ media/
│  │  ├─ signs/            # imágenes, secuencias y diagramas SVG
│  │  ├─ illustrations/    # mascota y placeholders
│  │  └─ fonts/
│  ├─ favicon.svg
│  └─ manifest.webmanifest # opcional PWA
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ routes.tsx
│  ├─ components/
│  │  ├─ ui/               # Button, Card, Chip, Modal...
│  │  ├─ layout/           # AppShell, Sidebar, BottomNav, TopBar
│  │  ├─ lesson/           # ExerciseRenderer, FeedbackSheet...
│  │  ├─ dictionary/       # SignCard, SignVisual, AlphabetGrid
│  │  └─ feedback/         # Toast, Confetti, EmptyState
│  ├─ features/
│  │  ├─ onboarding/
│  │  ├─ home/
│  │  ├─ lesson/
│  │  ├─ practice/         # stub "Próximamente"
│  │  ├─ dictionary/
│  │  ├─ profile/
│  │  ├─ leaderboard/      # stub "Próximamente"
│  │  └─ settings/
│  ├─ data/
│  ├─ hooks/
│  ├─ lib/                 # utils, formatters, storage, cn
│  ├─ store/               # demoStore.ts
│  ├─ styles/              # tokens.css, globals.css
│  └─ types/
├─ Docs/
├─ tests/
├─ index.html
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

- Cada feature agrupa sus páginas, componentes y tests.
- Los componentes de `ui/` no conocen el dominio de señas.
- No se permiten imports profundos entre features; se pasa por `components` o `lib`.

### 12.3 Rutas y carga

- `React.lazy` + `Suspense` por ruta; skeleton como fallback.
- Precarga de `/aprender` y de la próxima lección tras el onboarding.
- 404 con ruta comodín.
- En GitHub Pages, usar `HashRouter` o configurar fallback SPA; en Vercel/Netlify, rewrites a `index.html`.

### 12.4 Estado global

```ts
interface DemoState extends UserProgress {
  displayName: string;
  settings: {
    theme: "light" | "dark" | "system";
    sequenceAutoplay: boolean;
    mirror: boolean;
    reducedMotion: boolean;
    showTextAlternatives: boolean;
  };
  completeLesson: (lessonId: string, result: LessonResult) => void;
  resetDemo: () => void;
  updateSettings: (patch: Partial<DemoState["settings"]>) => void;
}
```

- `persist` guarda solo datos serializables; las sesiones de lección viven en estado local.
- Clave `manos.demo.v1`; migraciones simples si cambia el esquema.
- `resetDemo` limpia la clave y restablece el estado inicial.
- No se guardan imágenes ni blobs.

### 12.5 Recursos visuales y assets

- **Imagen clave:** WebP/AVIF, 720×720 o 720×900, ≤ 120 KB por imagen.
- **Secuencias:** 2–4 fotogramas por seña en la demo (hasta 5 en visión), mismo encuadre, fondo y escala; ≤ 600 KB por secuencia completa.
- **Diagramas:** SVG optimizados, ≤ 80 KB; los hotspots se definen en el dataset, no dentro del SVG.
- **Prohibido:** videos MP4/WebM, GIF animados y Lottie como recurso principal. Cualquier animación debe ser SVG/CSS o una secuencia de imágenes.
- **Nombres:** `/media/signs/{id}/cover.webp`, `/media/signs/{id}/frame-01.webp`, `/media/signs/{id}/diagram.svg`.
- **Carga:** `loading="lazy"`, `srcset` para tamaños responsables y precarga solo del ejercicio actual y el siguiente.
- **Optimización:** usar sharp o Squoosh; para WebP:

```bash
cwebp -q 80 raw.png -o cover.webp
```

### 12.6 Despliegue

1. `npm ci`
2. `npm run build`
3. Publicar `dist/` en Vercel, Netlify o GitHub Pages.
4. Configurar fallback SPA y cabeceras de caché para `/media`.
5. Verificar en HTTPS (aunque la demo no use cámara real).
6. Añadir `robots.txt` con `noindex` si la demo no debe indexarse.

### 12.7 Scripts esperados

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

---

## 13. Accesibilidad e inclusión

### 13.1 Estándar

Se apunta a **WCAG 2.2 nivel AA** en las pantallas principales. La accesibilidad no es una fase final: se implementa con los componentes.

### 13.2 Requisitos

| Área | Requisito |
|---|---|
| Contraste | Texto normal ≥ 4.5:1; texto grande ≥ 3:1 |
| Foco | Visible en todos los interactivos, 2 px, nunca `outline: none` sin reemplazo |
| Teclado | Flujo completo sin mouse; orden lógico; Esc cierra modales |
| Touch | Áreas mínimas de 44×44 px y separación de 8 px |
| Semántica | Un `h1` por pantalla; landmarks (`header`, `nav`, `main`) |
| Formularios | Etiquetas visibles, `aria-describedby` para ayudas y errores |
| Feedback | `aria-live="polite"` para acierto/error y toasts |
| Recursos visuales | Alternativa textual obligatoria, controles accesibles, sin reproducción automática |
| Color | Nunca único indicador; añadir icono, texto o patrón |
| Movimiento | Respetar `prefers-reduced-motion`; sin parpadeos > 3 Hz |
| Zoom | 200 % sin pérdida de contenido ni scroll horizontal |
| Idioma | `<html lang="es-PE">`; términos en otra lengua con `lang` si aplica |
| Enlaces | Texto descriptivo; evitar “haz clic aquí” |
| Imágenes | `alt` significativo; decorativas con `alt=""` |
| Modales | Foco atrapado, retorno al disparador, `aria-modal="true"` |

### 13.3 Accesibilidad específica de la LSP

- Cada recurso visual (imagen, secuencia o diagrama) tiene una descripción escrita y `alt` por fotograma.
- Botón “Describir seña” siempre disponible, también en lecciones.
- No se usa audio ni video: toda la información es visual y textual.
- No se evalúa la seña de la persona; la autoevaluación es opcional y privada.
- La secuencia se puede avanzar y retroceder fotograma a fotograma y repetir sin límite.
- Los hotspots tienen un equivalente en lista de botones con etiqueta.
- Se evita el texto sobre imágenes sin capa de contraste.
- Se ofrece modo espejo para practicar frente a la pantalla.
- La LSP tiene gramática propia: las traducciones al español son aproximaciones, no equivalencias literales.
- Las descripciones y glosas usan terminología validada por la comunidad sorda peruana.

### 13.4 Pruebas

- `axe-core` en las rutas principales (automatizado).
- Recorrido manual con teclado en Chrome y Firefox.
- Lector de pantalla: NVDA en Windows y VoiceOver en iOS.
- Revisión con zoom 200 % y movimiento reducido activado.
- Prueba con una persona sorda peruana signante de la LSP para validar claridad y respeto.

---

## 14. Rendimiento

### 14.1 Presupuestos

| Métrica | Objetivo |
|---|---|
| LCP en 4G | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| JS inicial (gzip) | < 250 KB |
| Peso inicial total | < 1.5 MB sin recursos visuales de lección |
| Secuencia visual por seña | ≤ 600 KB |
| Lighthouse Performance | ≥ 90 en móvil |
| Lighthouse Accessibility | ≥ 95 |

### 14.2 Estrategias

- División de código por ruta y por feature.
- Fuentes autoalojadas con `font-display: swap` y subset latino.
- Imágenes con `width`/`height`, `loading="lazy"`, `srcset` y formatos modernos.
- Secuencias cargadas solo al entrar en viewport o al abrir la lección; se precargan los fotogramas del ejercicio actual y el siguiente.
- Precarga del siguiente ejercicio y de la siguiente lección probable.
- Evitar librerías pesadas para gráficos; usar CSS/SVG.
- Animaciones con `transform` y `opacity`, no con propiedades que fuercen layout.
- Memoizar listas largas del diccionario y usar virtualización solo si supera 100 elementos (no es el caso de la demo).
- Medir con Lighthouse y el panel de rendimiento antes de cerrar.

## 15. Plan de trabajo y cronograma

### 15.1 Supuestos

- **Duración objetivo:** 10–12 días laborables (≈ 2.5 semanas) para la demo inicial.
- 1 desarrollador frontend full-time.
- Apoyo de diseño UX/UI part-time (≈ 24 h) para tokens, pantallas clave e ilustraciones.
- Asesoría de contenido de una persona sorda signante de LSP en Perú (≈ 4 h) para tono, variedad regional y revisión de señas de ejemplo.
- Alcance congelado al inicio de la fase 1; los cambios nuevos van a un backlog posterior.
- No hay producción audiovisual dentro de este cronograma; se usan ilustraciones, secuencias de fotogramas y diagramas interactivos, con modo placeholder si es necesario.

### 15.2 Fases

| Fase | Duración | Entregables |
|---|---|---|
| 0. Definición y kickoff | 0.5–1 día | Alcance de demo inicial, variedad de referencia de la LSP y asesoría confirmadas, criterios de aceptación |
| 1. Fundaciones | 2 días | Repo, tokens, tipografías, layout responsive, navegación y componentes base |
| 2. Onboarding y home | 2 días | Onboarding de 3 pasos, home con 2 unidades y progreso mock |
| 3. Lección y resultados | 2–3 días | Player, 4 tipos de ejercicio, feedback y resultados |
| 4. Diccionario y detalle | 2 días | 20 señas, alfabeto, `SignVisual`, secuencias y detalle |
| 5. Perfil y ajustes mínimos | 1 día | XP, racha, 6 logros, tema, texto alternativo y reinicio |
| 6. QA y deploy | 1–2 días | Responsive, accesibilidad, pruebas en dispositivos, deploy y guion de demo |
| **Total** | **10–12 días laborables** | **Demo inicial desplegada y presentable** |

En calendario, aproximadamente **2.5 semanas** con revisión y márgenes. La visión completa (8 tipos de ejercicio, 30 lecciones, práctica, liga y 60 señas) vuelve al cronograma de ~18 días laborables.

### 15.3 Hitos

1. **M1 — Esqueleto navegable (día 3):** se puede ir de onboarding a home en móvil y escritorio.
2. **M2 — Lección completa (día 6):** una lección se completa con feedback y resultados.
3. **M3 — Núcleo completo (día 9):** diccionario, detalle, perfil y ajustes mínimos.
4. **M4 — Demo lista (día 11):** deploy, QA y guion de presentación.

### 15.4 Backlog inicial (priorizado)

**Must have**

- Onboarding de 3 pasos y persistencia.
- Home con 2 unidades y progreso mock.
- Lección con 4 tipos de ejercicio: significado, seña correcta, emparejar y ordenar fotogramas.
- Resultados.
- Diccionario de 20 señas y detalle con secuencia de imágenes.
- Perfil mínimo con 6 logros.
- Ajustes mínimos con tema, movimiento reducido, meta diaria, texto alternativo y reinicio.
- Responsive 360–1920 px.
- Contenido de ejemplo en LSP, etiquetado como demostración.
- Accesibilidad básica y alternativa textual.

**Should have**

- Completar los 8 tipos de ejercicio.
- Práctica contextual.
- Clasificación.
- Estadísticas y logros ampliados.

**Could have**

- PWA instalable.
- Sonidos de interfaz (con control de mute).
- Animaciones avanzadas de mascota.
- Compartir resultado como imagen.

**Won't have (esta entrega)**

- Backend, login, cámara real, IA, pagos y notificaciones.

### 15.5 Rituales

- Daily breve de 15 minutos.
- Demo review al final de cada fase con stakeholder.
- Checkpoint de accesibilidad y responsive en cada review, no solo al final.
- Cambios de alcance solo por escrito y con impacto en fecha.

---

## 16. QA y criterios de aceptación

### 16.1 Checklist funcional

- [ ] El onboarding se completa y se puede saltar.
- [ ] Las preferencias elegidas se ven en Ajustes.
- [ ] El home muestra la próxima lección correcta.
- [ ] Todos los nodos abren su lección.
- [ ] Se completa una lección de principio a fin.
- [ ] El feedback acierta/falla con la respuesta correcta.
- [ ] La precisión, XP y combo coinciden con la sesión.
- [ ] Al recargar se conservan XP, racha, lecciones y ajustes.
- [ ] Repetir una lección no duplica XP de forma descontrolada.
- [ ] La racha aumenta una vez por día simulado.
- [ ] El buscador filtra por texto y categoría.
- [ ] El detalle de seña avanza/retrocede fotogramas y activa el espejo.
- [ ] El alfabeto muestra las 27 letras.
- [ ] El perfil mínimo refleja XP, racha y logros.
- [ ] Práctica y clasificación muestran “Próximamente” sin ser callejones sin salida.
- [ ] Los módulos no incluidos se omiten o se marcan como “Próximamente”.
- [ ] No hay botones muertos en el flujo principal.
- [ ] La demo se presenta explícitamente como inicial, no como producto completo.
- [ ] “Reiniciar demo” vuelve al onboarding.
- [ ] Las rutas inexistentes muestran 404.
- [ ] Los controles no implementados muestran un toast claro.
- [ ] Todo el contenido se identifica como LSP y no mezcla señas de otras lenguas.
- [ ] Las señas de ejemplo fueron revisadas por una persona sorda peruana.
- [ ] La variedad regional de referencia está documentada en el dataset.

### 16.2 Checklist de responsive

- [ ] 320, 360, 390, 430 px sin scroll horizontal.
- [ ] 768 y 1024 px sin saltos de layout.
- [ ] 1366, 1440 y 1920 px con contenido centrado.
- [ ] Bottom nav respeta el área segura en iOS.
- [ ] Teclado abierto no tapa el CTA de la lección.
- [ ] Orientación horizontal funcional.
- [ ] Textos largos no rompen tarjetas ni botones.

### 16.3 Checklist de accesibilidad

- [ ] Navegación completa por teclado.
- [ ] Foco visible y lógico.
- [ ] Modales con foco atrapado y Esc.
- [ ] Contraste AA en claro y oscuro.
- [ ] Todos los recursos visuales tienen descripción textual y `alt` por fotograma.
- [ ] Las secuencias y diagramas se pueden usar solo con teclado.
- [ ] `aria-live` en feedback y toasts.
- [ ] Iconos con `aria-label` cuando no tienen texto.
- [ ] Movimiento reducido respetado.
- [ ] Zoom 200 % sin pérdida de contenido.
- [ ] axe sin errores críticos.

### 16.4 Matriz de dispositivos y navegadores

| Dispositivo | Navegador | Prioridad |
|---|---|---|
| iPhone SE / 13 mini | Safari | Alta |
| iPhone 14/15 | Safari | Alta |
| Android 360 px | Chrome | Alta |
| iPad | Safari | Media |
| Laptop 1366 | Chrome, Edge | Alta |
| Desktop 1920 | Chrome, Firefox | Media |

### 16.5 Definición de terminado (DoD)

Una tarea está terminada cuando:

1. Cumple los criterios de aceptación de su pantalla.
2. Funciona en móvil y escritorio.
3. Pasa lint, typecheck y build.
4. Tiene estados de carga, vacío y error cuando aplica.
5. Es accesible por teclado y tiene textos alternativos.
6. No introduce errores en consola.
7. Está revisada visualmente contra el sistema de diseño.
8. Está desplegada en la URL de preview.

---

## 17. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Contenido de señas inexacto o regionalmente incorrecto | Alta | Alto | Etiquetar como demo, definir la variedad de referencia de la LSP y validar con personas sordas peruanas |
| Falta de ilustraciones o secuencias con licencia | Alta | Medio | Modo placeholder obligatorio; producir ilustraciones propias o usar material con licencia |
| Confusión entre LSP y traducción literal del español | Media | Alto | Usar glosas, notas pedagógicas y revisión de contenido |
| Mezclar LSP con otras lenguas de señas | Media | Alto | Usar un único dataset LSP, revisar glosas y no reutilizar imágenes de otros países |
| Representar la LSP como si fuera universal | Media | Alto | Badge “LSP · Perú”, textos explícitos y nota de alcance en onboarding y ajustes |
| Scope creep por ser una demo | Alta | Medio | Congelar alcance, backlog separado y fechas por fase |
| Secuencias de imágenes pesadas que arruinan el rendimiento móvil | Media | Alto | Optimización WebP/AVIF, lazy loading y presupuesto de 600 KB por seña |
| Inconsistencia visual entre pantallas | Media | Medio | Tokens y componentes compartidos; review con checklist |
| Problemas de responsive al final | Media | Alto | Mobile-first y pruebas desde la fase 1 |
| Accesibilidad dejada para el final | Media | Alto | Checklist por fase y axe en CI |
| `localStorage` con esquema viejo | Baja | Bajo | Clave versionada y botón de reinicio |
| Dependencia de fuentes/iconos externos | Baja | Bajo | Autoalojar fuentes y usar SVG locales |
| Expectativa de que la demo “enseña de verdad” | Media | Alto | Badge “Demo”, avisos y guion de presentación claro |
| La demo se percibe como producto terminado | Alta | Medio | Comunicar alcance inicial, badge “Demo”, pantallas “Próximamente” y guion de 3–5 minutos |

---

## 18. Evolución futura

Si la demo valida la dirección, las siguientes fases podrían ser:

1. **Contenido real y validado.** Producir ilustraciones y secuencias de fotogramas con personas sordas signantes de LSP, guion pedagógico y revisión por variedad regional.
2. **Backend y cuentas.** Sincronización de progreso, perfiles y recuperación de cuenta (Supabase o similar).
3. **Repaso espaciado (SRS).** Algoritmo real de repetición para señas difíciles.
4. **Cámara y feedback.** Análisis de manos con MediaPipe/ML, procesamiento local y consentimiento explícito.
5. **Modo docente.** Grupos, asignaciones y seguimiento sin exponer datos sensibles.
6. **Otras lenguas de señas e idiomas.** Ampliar el contenido a otras lenguas de señas y variantes regionales, con interfaz internacionalizada.
7. **Comunidad.** Retos, contribuciones de señas y validación colaborativa.
8. **PWA/offline.** Descarga de lecciones y práctica sin conexión.
9. **Accesibilidad certificada.** Auditoría externa y pruebas con personas sordas y con discapacidad visual.
10. **Monetización ética.** Solo si se define; nunca bloquear el aprendizaje básico.

---

## 19. Anexos

### A. Guion de demo (3–5 minutos)

| Minuto | Acción | Mensaje |
|---|---|---|
| 0:00 | Abrir en vista móvil | “Así se ve aprender Lengua de Señas Peruana sin fricción.” |
| 0:20 | Completar onboarding | Mostrar que la demo se centra en la LSP y la meta diaria |
| 0:50 | Home | Señalar racha, meta y camino; las 2 unidades abiertas |
| 1:20 | Entrar a la lección | Resaltar que no hay vidas ni energía |
| 1:40 | Resolver 2 ejercicios | Mostrar feedback amable y combo |
| 2:40 | Terminar lección | Ver resultado, XP, confeti y aviso de logro |
| 3:10 | Diccionario | Buscar “hola”, abrir detalle, avanzar fotogramas y activar espejo |
| 3:50 | Perfil | Mostrar logros y estadísticas mínimas; la liga es “Próximamente” |
| 4:20 | Ajustes | Cambiar a modo oscuro y movimiento reducido |
| 4:40 | Escritorio | Redimensionar y mostrar sidebar y rail |
| 5:00 | Cierre | “Todo es simulado; el siguiente paso es validar la LSP con la comunidad sorda peruana.” |

### B. Microcopy de referencia

- Bienvenida: “Aprende Lengua de Señas Peruana a tu ritmo. Sin vidas, sin prisas.”
- Onboarding, lengua: “Esta demo está enfocada en la Lengua de Señas Peruana (LSP).”
- Onboarding, meta: “¿Cuánto quieres practicar al día?”
- Home vacío: “Tu primera lección te espera.”
- Home completo: “¡Completaste la demo! Ahora puedes repetir una lección o explorar el diccionario.”
- Feedback correcto: “¡Muy bien!” / “¡Excelente!” / “¡Lo tienes!”
- Feedback incorrecto: “Casi. La respuesta correcta es…”
- Salida de lección: “¿Salir de la lección? Perderás el progreso de esta sesión.”
- Diccionario vacío: “No encontramos esa seña. Prueba con otra palabra o explora una categoría.”
- Reinicio: “¿Reiniciar la demo? Se borrarán tu progreso, racha y logros.”
- Función no disponible: “Próximamente en la versión completa.”
- 404: “Esta página no existe en la demo.”
- Badge: “Contenido de demostración.”

### C. Checklist de entrega

- [ ] Repositorio con README de instalación y scripts.
- [ ] Demo desplegada en URL pública o entorno local reproducible.
- [ ] Alcance de demo inicial documentado y visible en la presentación.
- [ ] Pantallas no incluidas marcadas como “Próximamente” o fuera del menú.
- [ ] Dataset mock completo y etiquetado.
- [ ] Assets placeholder o ilustraciones/secuencias con licencia documentada.
- [ ] Guion de demo y credenciales (no hay login).
- [ ] Informe breve de QA con dispositivos probados.
- [ ] Lista de decisiones abiertas y próximos pasos.
- [ ] Nota de accesibilidad y limitaciones conocidas.

### D. Decisiones abiertas

| Decisión | Opciones | Responsable | Fecha límite |
|---|---|---|---|
| Variedad de referencia de la LSP | LSP de Lima / otra región / referente urbano | Producto + contenido + comunidad sorda | Antes de fase 1 |
| Nombre y mascota | Manos / otra propuesta | Marca | Antes de fase 2 |
| Medios | Ilustraciones propias / stock con licencia / secuencias de fotogramas | Producción | Antes de fase 4 |
| Cámara real | No en demo / evaluación futura | Producto | Después de la demo |
| Deploy | Vercel / Netlify / GitHub Pages | Desarrollo | Antes de fase 6 |
| Modo oscuro | Incluido en la demo / ampliar preferencias | Diseño | Antes de fase 5 |
| PWA | Incluida / post-demo | Desarrollo | Antes de fase 6 |

### E. Referencias de buenas prácticas

- WCAG 2.2 (W3C) para accesibilidad web.
- Ley N.º 29535, que otorga reconocimiento oficial a la Lengua de Señas Peruana.
- Guías de la comunidad sorda peruana para terminología, variedad regional y representación.
- Documentación de React, Vite, Tailwind CSS, React Router, Zustand y Motion.
- Buenas prácticas de imágenes responsive: formatos modernos, `srcset`, dimensiones explícitas y carga diferida.

---

**Próximo paso:** revisar las decisiones abiertas de la sección 19.D, confirmar la variedad de referencia de la LSP y la asesoría con la comunidad sorda peruana, y convertir la fase 1 en tareas accionables del repositorio.

