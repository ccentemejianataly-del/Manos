# Manos — demo de Lengua de Señas Peruana (LSP)

Demo web navegable y responsive para explorar una experiencia de aprendizaje de **Lengua de Señas Peruana (LSP)** con una progresión inspirada en Duolingo, pero sin vidas, energía, anuncios, paywall ni contenido bloqueado.

> **Contenido de demostración.** Las señas, ilustraciones, descripciones y ejercicios son simulados. La validación lingüística con la comunidad sorda peruana está pendiente. Esta demo sirve para evaluar flujo, estética y claridad de producto; no enseña LSP de forma certificada ni reconoce señas con cámara.

## Qué incluye

- Onboarding de 3 pasos con objetivo diario y resumen del plan.
- 2 unidades, 10 lecciones y 20 señas de demostración.
- 4 tipos de ejercicio: seña → significado, significado → seña, unir parejas y ordenar fotogramas.
- Secuencias de fotogramas, diagramas SVG, puntos interactivos y alternativas textuales.
- Diccionario con búsqueda, filtros por categoría y alfabeto dactilológico.
- Perfil con progreso, racha, XP y 6 logros.
- Ajustes de tema, movimiento reducido, descripciones, secuencias en espejo y meta diaria.
- Práctica libre y clasificación como pantallas **“Próximamente”**, claramente señalizadas.
- Persistencia local del progreso en `localStorage`.
- Diseño responsive para teléfono, tablet y escritorio; navegación por teclado.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router 6 (`HashRouter`)
- Zustand 4 con persistencia local
- Framer Motion
- Lucide React

Las tipografías se sirven localmente con `@fontsource`; la demo no depende de servicios externos.

## Cómo ejecutar

### Windows: inicio rápido

Haz doble clic en:

```text
iniciar-demo.cmd
```

El script usa Node.js del sistema o el Node incluido en `.tools\node`, instala dependencias si hace falta y abre la demo en el navegador.

### Manual

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre `http://127.0.0.1:5173/`.

### Build de producción

```bash
npm run build
npm run preview
```

El resultado queda en `dist/`. La app usa rutas con hash y recursos relativos, así que puede publicarse en un hosting estático o dentro de una subcarpeta. Para verla localmente, usa `npm run preview` (no abras `index.html` directamente con `file://`).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run typecheck` | Verificación de TypeScript sin emitir archivos. |
| `npm run build` | Typecheck y build de producción en `dist/`. |
| `npm run preview` | Sirve el build de producción localmente. |

## Rutas principales

| Ruta | Pantalla |
|---|---|
| `#/onboarding` | Onboarding inicial. |
| `#/aprender` | Inicio, camino de unidades y lecciones. |
| `#/diccionario` | Diccionario LSP. |
| `#/diccionario/:signId` | Detalle de una seña. |
| `#/leccion/:lessonId` | Reproductor de lección. |
| `#/leccion/:lessonId/resultado` | Resultado de la lección. |
| `#/practicar` | Práctica libre (stub “Próximamente”). |
| `#/clasificacion` | Liga Manos (stub “Próximamente”). |
| `#/perfil` | Perfil, progreso y logros. |
| `#/ajustes` | Ajustes de la demo. |

El progreso se guarda bajo la clave `manos-lsp-demo-v1`. Puedes borrarlo desde **Ajustes → Datos de la demo → Reiniciar demo**.

## Estructura del proyecto

```text
src/
  components/     Componentes reutilizables (sign art, mascota, navegación, modales…)
  data/           Señas, unidades, lecciones, categorías y logros simulados
  lib/            Generación determinista de ejercicios y utilidades
  pages/          Onboarding, inicio, lección, diccionario, perfil y ajustes
  store/          Estado global y persistencia con Zustand
Docs/             Plan de implementación y criterios de alcance
.tools/           Scripts de captura y QA usados durante el desarrollo
.screens/         Capturas generadas durante la QA visual
```

## Accesibilidad

- Controles con estados de foco visibles y navegación por teclado.
- Alternativas textuales para las ilustraciones.
- Respeto por `prefers-reduced-motion` y opción de movimiento reducido en Ajustes.
- Tema claro, oscuro o según el sistema.
- Sin dependencia de video para comprender una seña.

## Alcance y límites de la demo

Esta entrega no incluye backend, cuentas, sincronización en la nube, cámara, reconocimiento automático, videos, pagos ni notificaciones. La práctica libre y la clasificación son visuales y están marcadas como próximas versiones. El XP y la racha son motivación visual, no una evaluación de aprendizaje.

## QA

Durante el desarrollo se validaron el flujo completo de una lección, la persistencia, los logros, el onboarding, el tema oscuro, los ajustes de accesibilidad y el reinicio de la demo. Los scripts de apoyo están en `.tools/` y las capturas en `.screens/`.

Para repetir las pruebas con el servidor de desarrollo activo:

```bash
node .tools/flow-test.mjs
node .tools/qa-test.mjs
```

Los scripts usan `puppeteer-core` y una instalación local de Google Chrome; ajusta la ruta de Chrome en el script si tu equipo usa otra ubicación.
