═════════════════════════════════════════════════════════════════════════════
PRESENTACIÓN: Análisis del Rol Directivo Escolar en Chile
PROYECTO VRIMF 2631 - Universidad de Concepción
═════════════════════════════════════════════════════════════════════════════

ARCHIVOS INCLUIDOS:
─────────────────
✓ presentation.html     (HTML principal - CORREGIDO)
✓ presentation.css      (Estilos - Sin cambios necesarios)
✓ presentation.js       (Lógica JavaScript - Sin cambios necesarios)
✓ README.txt           (Este archivo)

═════════════════════════════════════════════════════════════════════════════
CÓMO PREPARAR LA PRESENTACIÓN
═════════════════════════════════════════════════════════════════════════════

PASO 1: Crear la carpeta de trabajo
─────────────────────────────────
Crea una carpeta llamada "presentacion-directiva" en tu computador
y coloca TODOS estos archivos ahí.

PASO 2: Descargar las IMÁGENES necesarias
──────────────────────────────────────
Necesitas estas imágenes en la MISMA CARPETA:

1. Campanil-udec.jpg
   → La fotografía en blanco y negro del campanario de la UdeC
   → Usada en la diapositiva 1 (portada) y en la final (cierre)

2. fac_educacion-color.png
   → Logo a color de la Facultad de Educación
   → Usada en la portada (esquina superior izquierda)

3. fac_educacion-white-text.png
   → Logo de la Facultad en blanco con texto
   → Usada en la diapositiva final (cierre)

4. VinculaciónConelmedioUdeC.webp
   → Logo de Vinculación con el Medio
   → Usada en portada y cierre (esquina superior derecha)

5. Otras imágenes ilustrativas (OPCIONALES):
   - question_orange.png
   - float_orange.png
   - thinker_orange.png
   - edificio-facultad-de-educacion.jpg

   Si no las tienes, las slides funcionarán igual (solo sin las ilustraciones)

PASO 3: Abrir la presentación
────────────────────────────
• Doble-clic en "presentation.html"
• Se abrirá en tu navegador por defecto

═════════════════════════════════════════════════════════════════════════════
CÓMO NAVEGAR
═════════════════════════════════════════════════════════════════════════════

TECLADO:
 → Flecha derecha / Espacio / AvPág    : Siguiente diapositiva
 → Flecha izquierda / RePág            : Diapositiva anterior
 → T (mayúscula o minúscula)           : Cambiar tema (Vibrante/Minimalista)
 → F (mayúscula o minúscula)           : Pantalla completa

RATÓN:
 → Botones ◀ y ▶ en la parte inferior
 → Selector de tema (Vibrante / Minimalista)
 → Botón de pantalla completa (⛶)

INTERACTIVIDAD:
 → Click en "Restitución Interpretativa Preliminar" (Slide 3)
   → Lleva a la diapositiva final con MagicRings
 
 → Click en las tarjetas de Dimensiones (D1, D2, D3, D4) en Slide 3
   → Abre una ruleta interactiva con subitems
   → Click en "(Ver imagen)" lleva a slides relacionadas

═════════════════════════════════════════════════════════════════════════════
ESTRUCTURA DE LAS DIAPOSITIVAS (12 total)
═════════════════════════════════════════════════════════════════════════════

Slide 1:  Portada y Propósito
Slide 2:  Coordinación y Equipo de Investigación
Slide 3:  Propósito y Volumen de la Realidad (con Dimensiones)
Slide 4:  Interrupciones cotidianas (Dimensión 1)
Slide 5:  Preguntas de Reflexión (Convivencia)
Slide 6:  Liderazgo Colaborativo (Dimensión 3 - Carrusel)
Slide 7:  Preguntas de Reflexión (Liderazgo)
Slide 8:  Urgencia Pedagógica y Mejora (Dimensión 4 - Prisma 3D)
Slide 9:  Preguntas de Reflexión (Pedagógico)
Slide 10: Cierre con Campanil, MagicRings y Cita
Slide 11: Pregunta principal sobre la complejidad del liderazgo
Slide 12: Matriz Orbital de Articulación Directiva

═════════════════════════════════════════════════════════════════════════════
CORRECCIONES REALIZADAS (Versión final)
═════════════════════════════════════════════════════════════════════════════

✓ Etiqueta </html> faltante → AGREGADA
✓ Restos de numeración de líneas en body → ELIMINADOS
✓ Contador de slides "1/13" → CORREGIDO A "1/12"
✓ Bug en patchMagicRingSlide() → CORREGIDO (logo ahora es <img>)
✓ Código muerto en showMagicRingSlide() → LIMPIADO
✓ Transiciones conectadas de slide 3 → VERIFICADAS y CORRECTAS
   - Dimensión 1.5 → Slide 4 ✓
   - Dimensión 3.2 → Slide 6 ✓
   - Dimensión 4.2 → Slide 8 ✓
✓ Slide 10 (MagicRings) → MANTIENE SU POSICIÓN (índice 9)
   - Los dos logos están configurados igual que en Slide 1
   - Campanil en blanco y negro con efecto MagicRings
   - Cita de cierre entre comillas

═════════════════════════════════════════════════════════════════════════════
NOTAS TÉCNICAS
═════════════════════════════════════════════════════════════════════════════

NAVEGACIÓN:
• Las slides 4, 6, 8 y 10 (Pitch slides) cambian automáticamente a tema
  Minimalista para mayor contraste
• El resto mantiene el tema seleccionado (Vibrante por defecto)

INTERACTIVIDAD:
• MagicRings (efecto de anillos animados) se renderiza con Three.js
• Ruleta de Dimensiones es scrollable (scroll vertical)
• Prisma 3D en Slide 8 es interactivo al mover el ratón
• Matriz Orbital en Slide 12 responde a movimientos del ratón
  (efecto 3D parallax)

COMPATIBILIDAD:
• Funciona mejor en navegadores modernos (Chrome, Firefox, Edge, Safari)
• Se recomienda pantalla a 1920x1080 o superior
• En móviles/tablets se adapta automáticamente

═════════════════════════════════════════════════════════════════════════════
SOLUCIÓN DE PROBLEMAS
═════════════════════════════════════════════════════════════════════════════

P: No aparecen las imágenes
R: Asegúrate de que todas las imágenes (.jpg, .png, .webp) estén en la 
   misma carpeta que los archivos HTML, CSS y JS

P: El MagicRings (anillos animados) no se ve
R: Necesitas conexión a internet para cargar Three.js desde CDN
   (https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)

P: Los logos no se alinean en la esquina
R: Probablemente necesites actualizar el navegador (cache)
   - Presiona Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)

P: Las transiciones de Slide 3 no funcionan
R: Abre la consola del navegador (F12 → Console) y verifica si hay errores
   Contacta si ves mensajes de error

P: El tema no cambia
R: Presiona la tecla T para cambiar entre Vibrante y Minimalista

═════════════════════════════════════════════════════════════════════════════
CONTACTO Y SOPORTE
═════════════════════════════════════════════════════════════════════════════

Proyecto VRIMF 2631
Facultad de Educación
Universidad de Concepción

Para cambios o consultas sobre la presentación, revisa el archivo HTML
y modifica los contenidos directamente en el editor de texto.

═════════════════════════════════════════════════════════════════════════════
Versión: 2.0 (Corregida - Julio 2026)
═════════════════════════════════════════════════════════════════════════════
