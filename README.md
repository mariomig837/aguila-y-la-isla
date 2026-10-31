# El Águila y la Isla — Museo Napoleónico de La Habana

Web one-page de una exposición de arte del Primer Imperio. Proyecto de portfolio de **Mario Rodríguez**.

**Demo online:** https://aguila-y-la-isla.netlify.app

## Cómo verla

Ábrela con un servidor local (algunas funciones fallan con `file://`):

```bash
python -m http.server 5173
```

Después abre http://localhost:5173

## Estructura

```
index.html          Marcado de todas las secciones
css/styles.css      Estilos (tokens en :root, responsive al final)
js/data.js          Colección, salas y créditos de imagen
js/main.js          Animaciones e interacción
assets/img/         Imágenes WebP (Wikimedia Commons) + creditos.json
```

Librerías por CDN: GSAP 3.12.5 (ScrollTrigger, Flip) y Lenis 1.1.13.

## Efectos

| Sección | Efecto |
|---|---|
| Preloader | Águila dibujada en SVG, contador y cortina |
| Hero | Título letra a letra; arco con **scroll interno** de la imagen; las líneas se separan al hacer scroll |
| Exposición | Las palabras del manifiesto se iluminan con el scroll; contadores animados |
| Salas | Tarjetas con **scroll interno** (efecto «captura de web») y una segunda imagen que se revela en círculo desde el cursor |
| La Consagración | Sección fijada con un recorrido de cámara por el cuadro de David y notas sobre cada detalle |
| El gusto Imperio | Dos **carruseles infinitos** en sentidos opuestos; aceleran y se inclinan según la velocidad del scroll y se frenan al pasar el ratón |
| Pieza destacada | Imagen fija (sticky) que se abre mientras avanzan los textos |
| Colección | Filtros animados con GSAP Flip y lightbox con navegación por teclado |
| Global | Smooth scroll, cursor personalizado, header que se oculta al bajar, grano de película y `prefers-reduced-motion` |

## Imágenes

Todas proceden de Wikimedia Commons (dominio público o licencias CC). La atribución completa está en el footer («Créditos de imagen») y en `assets/img/creditos.json`. Las fotografías con licencia CC BY-SA necesitan atribución si se publica la web.
