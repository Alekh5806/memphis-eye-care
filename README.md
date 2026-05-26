# Memphis Vision Care Website

React + Vite site served by a Cloudflare Worker with static assets.

## Local Development

Install dependencies and start Vite:

```sh
npm install
npm run dev
```

For local browser-only form testing, copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY`, then restart Vite or rebuild.

## Web3Forms Configuration

The production contact and newsletter forms submit through the Worker routes in `worker.js`:

- `/api/forms/contact`
- `/api/forms/newsletter`

Set the Web3Forms key as a Cloudflare Worker secret named `WEB3FORMS_ACCESS_KEY`:

```sh
npx wrangler secret put WEB3FORMS_ACCESS_KEY
```

Then rebuild and deploy:

```sh
npm run build
npx wrangler deploy
```

The Worker also accepts `VITE_WEB3FORMS_ACCESS_KEY` as a fallback runtime variable, but `WEB3FORMS_ACCESS_KEY` is the preferred production setting because it keeps the key out of the browser bundle.

## Static Hosting

If the final host only serves the built `dist` folder and does not run `worker.js`, set `VITE_WEB3FORMS_ACCESS_KEY` in that hosting platform's build environment before running `npm run build`.

Vite reads `VITE_*` values at build time. Changing hosting environment variables after the build will not update the already-built JavaScript bundle, so rebuild and redeploy after changing the key.
