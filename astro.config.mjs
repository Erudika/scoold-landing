import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightContextualMenu from "starlight-contextual-menu";

export default defineConfig({
  site: 'https://scoold.com',
  integrations: [
    // Register sitemap BEFORE Starlight to prevent Starlight adding its own version
    sitemap(),
    starlight({
      title: 'Scoold Documentation',
      logo: {
        src: './public/favicon.svg',
      },
      customCss: [
        // Path to your Tailwind base styles:
        './src/styles/global.css',
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Erudika/scoold' }],
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'documentation/getting-started' },
        },
        {
          label: 'Deployment',
          autogenerate: { directory: 'documentation/deployment' },
        },
        { label: 'API Reference', autogenerate: { directory: 'documentation/scoold-api' } },
      ],
      plugins: [starlightContextualMenu({
        actions: ["copy", "view", "chatgpt", "claude"]
      })]
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
