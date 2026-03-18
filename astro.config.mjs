import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwind from '@tailwindcss/vite';
import { site } from "./src/data/site-data.json";

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always', // if hosted on GitHub: always !
  integrations: [// Register sitemap BEFORE Starlight to prevent Starlight adding its own version
    sitemap(), 
    starlight({
      title: 'Documentation',
      logo: {
        light: './src/images/logo.svg',
        dark: './src/images/footer-logo.svg',
        replacesTitle: true
      },
      disable404Route: true,
      customCss: [
        './src/styles/global.css',
      ],
      expressiveCode: {
        styleOverrides: { 
          borderRadius: '0.2rem'
        },
        themes: ['dark-plus', 'min-light']
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Erudika/scoold' }],
      sidebar: [
        { label: '↩ Back to Scoold.com', link: '/' },
        { label: 'Docs Home', link: '/documentation/' },
        { 
          label: 'Introduction',
          autogenerate: { directory: 'documentation/intro' }
        },
        
        {
          label: 'Getting Started',
          autogenerate: { directory: 'documentation/getting-started' },
        },
        {
          label: 'Deployment',
          autogenerate: { directory: 'documentation/deployment' },
        },
        {
          label: 'Authentication & SSO',
          autogenerate: { directory: 'documentation/authentication' },
        },
        {
          label: 'Managing Your Server',
          autogenerate: { directory: 'documentation/managing-scoold' },
        },
        {
          label: 'UX & UI',
          autogenerate: { directory: 'documentation/ux-ui' },
        },
        {
          label: 'Integrations',
          autogenerate: { directory: 'documentation/integrations' },
        },
        { label: 'Reference', autogenerate: { directory: 'documentation/reference' } },
      ],
      plugins: [
        //starlightContextualMenu({actions: ["copy", "view", "chatgpt", "claude"]})
      ]
    }),
    mdx()
  ],
  // vite: {
  //   plugins: [tailwind()],
  // },
});