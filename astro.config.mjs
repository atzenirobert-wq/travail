import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rehypeBasePath } from './src/plugins/rehype-base-path.mjs';

// SITE_URL / BASE_PATH let CI override these for preview deployments (e.g.
// GitHub Pages project sites served under /travail/) without touching the
// production defaults below.
const site = process.env.SITE_URL ?? 'https://topclim.fr';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      // /go/ pages are noindex redirect stubs, not real content.
      filter: (page) => !page.includes('/go/'),
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeBasePath(base)],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
