# Photo Editor App

A browser-based photo editor built with plain JavaScript. Upload an image, adjust it with live filters, rotate or flip it, and download the edited result. Everything runs in the browser — no image is uploaded to a server.

**Live demo:** https://sanjeet-saini.github.io/image-editor-app/

## Features

- **Live filters:** brightness, contrast, saturation, invert and blur, controlled with a single slider
- **Rotate** left/right in 90° steps and **flip** horizontally or vertically
- **Reset** all edits in one click
- **Save image:** exports the edited photo as a `.jpg`, including filters, rotation and flips

## Tech stack

- JavaScript (ES6+)
- HTML5 Canvas API and CSS `filter`
- HTML5 and CSS3
- Font Awesome icons

## How it works

- While editing, the preview uses CSS `filter` and `transform` so changes appear instantly.
- On **Save**, the image is drawn onto a hidden `<canvas>` with the same `ctx.filter`, rotation and scale. The canvas is resized for 90° rotations, then exported with `canvas.toDataURL("image/jpeg")`.

## Run locally

No build step is needed. Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/sanjeet-saini/image-editor-app.git
cd image-editor-app
```

## Author

**Sanjeet Saini** · [GitHub](https://github.com/sanjeet-saini) · [LinkedIn](https://www.linkedin.com/in/sanjeet-saini-880b1827a)
