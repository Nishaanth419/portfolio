import { defineConfig } from 'astro/config';

// Served from the custom domain in public/CNAME, so no `base` path is needed.
export default defineConfig({
  site: 'https://k2n.online',
  vite: {
    // three.js is ~520 kB and is loaded lazily after first paint
    build: { chunkSizeWarningLimit: 600 },
  },
});
