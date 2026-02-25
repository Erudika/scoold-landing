import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightContextualMenu from "starlight-contextual-menu";
import { site } from "./src/data/site-data.json";

export default defineConfig({
  site: site.url,
  integrations: [// Register sitemap BEFORE Starlight to prevent Starlight adding its own version
  sitemap(), starlight({
    title: 'Documentation',
    logo: {
      light: './src/images/logo.svg',
      dark: './src/images/footer-logo.svg',
      replacesTitle: true
    },
    disable404Route: true,
    // customCss: [
    //   './src/styles/global.css',
    // ],
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Erudika/scoold' }],
    sidebar: [
      { label: '↩ Back to Scoold.com', link: '/' },
      { label: 'Documentation Intro', link: '/documentation' },
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
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});