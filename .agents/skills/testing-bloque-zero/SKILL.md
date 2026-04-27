# Testing Bloque Zero Website

## Overview
Bloque Zero is a static site built with **Vite**. It has two main interactive features:
1. **Pokédex** — Consumes PokéAPI (public, no auth) with search, list, detail modal
2. **Contact Form** — Validates fields with regex, sends email via EmailJS

## Dev Server Setup
```bash
cd <repo-root>
npm install
npx vite --port 5174
```
Site is available at `http://localhost:5174/Website-Project-UEES/`

The base path `/Website-Project-UEES/` is required because `vite.config.js` sets `base` for GitHub Pages deployment.

## Key Pages
- `/Website-Project-UEES/index.html` — Home
- `/Website-Project-UEES/pokedex.html` — Pokédex (API consumption)
- `/Website-Project-UEES/contacto.html` — Contact form
- `/Website-Project-UEES/portafolio.html` — Portfolio
- `/Website-Project-UEES/nosotros.html` — About

## Pokédex Test Flows

### Search by Name
1. Navigate to `/Website-Project-UEES/pokedex.html`
2. Type a Pokémon name (e.g., "charizard") in the input
3. Click "Buscar" or press Enter
4. Verify: card shows number, name, type badges, official artwork

### List All
1. Click "Listar Todos"
2. Verify: grid shows 30 cards (#001-#030) with type-colored borders
3. Cards load via `Promise.all()` — may take a few seconds

### Detail Modal
1. Click any Pokémon card
2. Verify: modal opens with Spanish description, height/weight, abilities, 6 stat bars
3. Close via X button or clicking outside modal
4. Verify: card grid is preserved after closing

### Error States
- **404 (not found):** Search "xyznotapokemon" → ghost icon + "No se encontró" message
- **Empty list edge case:** If all detail fetches fail, shows "vacio" state (not infinite spinner)
- **Network error:** Shows error state with "Reintentar" button (hard to test without DevTools throttling)

### Important Edge Cases
- The "Listar Todos" button might show an infinite spinner if the empty-list fix (PR #7) isn't merged. The fix checks `!estadoError.classList.contains('activo')` before showing vacio state.
- Enter key triggers search via keydown listener on the input field
- Chrome autocomplete dropdown may appear on input focus — dismiss with Escape before typing

## Contact Form Test Flows

### Validation
- 4 fields: Nombre (required), Email (required, regex), Teléfono (required, regex), URL (optional)
- Per-field error spans: `#nombre-error`, `#email-error`, `#telefono-error`, `#url-proyecto-error`
- Submit button is disabled until all required fields pass validation
- "Limpiar Formulario" button resets all fields and validation states

### Email Sending
- Uses EmailJS with two templates: one to owner, one auto-reply to client
- On success: loading overlay → confirmation modal with submitted data
- On error: red error message appears below form
- Modal close resets the form

## Deployment
- **Fork (gh-pages branch):** `npx gh-pages -d dist` after `npm run build`
- **Original repo (main branch):** Compiled files must be in repo root for GitHub Pages
- Build entry points are configured in `vite.config.js` under `rollupOptions.input`

## Devin Secrets Needed
None — PokéAPI is public and EmailJS keys are embedded in the source code.

## Tips
- Browser autocomplete can interfere with typing in the search input. Dismiss with Escape.
- The site uses a dark theme — screenshots look best with browser in dark mode.
- `createDocumentFragment()` is used for batch DOM insertion — verify no flickering during card rendering.
- The Pokédex navbar link uses a dragon icon (`fa-solid fa-dragon`).
