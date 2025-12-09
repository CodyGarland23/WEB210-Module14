# Macon County GIS — Redesign Scaffold

This workspace contains a simple static scaffold to begin the site redesign.

Run locally:

```bash
npm install
npm start
```

This will start a small static dev server (live-server). Replace placeholder content in `index.html`, update `styles/brand.css`, and add assets in `assets/`.

Bootstrap
---------
This scaffold includes Bootstrap 5 via CDN in `index.html` and `services.html` so you can drop in pre-built components quickly. Custom site styles in `styles/brand.css` will override Bootstrap where needed.

Contact form
------------
The contact form on `contact.html` uses a client-side handler with two modes:

- Mailto fallback (default): the form opens the user's mail client with a pre-filled message. No server required.
- Server endpoint (recommended): set the `data-endpoint` attribute on the `<form id="contact-form">` element to a URL that accepts a JSON POST (fields: name, email, subject, message). The script will POST JSON and display success/failure messages.

Example server behavior: accept POST /api/contact with JSON and return 200 on success.

Replacing the logo (recommended)
-------------------------------
Currently a placeholder file `assets/mock-logo.png` exists. To replace it with the real binary (and create optimized/retina versions), copy the logo into the `assets/` folder and run the following commands locally (requires ImageMagick):

```bash
# copy original into assets and remove spaces
cp /path/to/original/"Mock Logo.png" assets/mock-logo.png
# create a retina 2x (double size) version
convert assets/mock-logo.png -resize 200% assets/mock-logo@2x.png
# create an optimized WebP and SVG (if you have SVG source)
convert assets/mock-logo.png -strip -interlace Plane -quality 85 assets/mock-logo.webp
```

Then ensure all pages reference `assets/mock-logo.png` (already set). If you have an SVG of the logo, place it as `assets/mock-logo.svg` and swap the <img> to point to that for best scaling.
