import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwind from '@tailwindcss/vite';
import { site } from "./src/data/site-data.json";
import rehypeTableRowIds from './src/plugins/rehype-table-row-ids.mjs';

export default defineConfig({
  site: site.url,
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeTableRowIds],
  },
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
        './src/styles/starlight.css',
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
          items: [{ autogenerate: { "directory": "documentation/intro" } }]
        },
        
        {
          label: 'Getting Started',
          items: [{ autogenerate: { "directory": "documentation/getting-started" } }]
        },
        {
          label: 'Deployment',
          items: [{autogenerate: { directory: 'documentation/deployment' } }],
        },
        {
          label: 'Authentication & SSO',
          items: [{autogenerate: { directory: 'documentation/authentication' } }],
        },
        {
          label: 'Managing Your Server',
          items: [{autogenerate: { directory: 'documentation/managing-scoold' } }],
        },
        {
          label: 'UX & UI',
          items: [{autogenerate: { directory: 'documentation/ux-ui' } }],
        },
        {
          label: 'Integrations',
          items: [{autogenerate: { directory: 'documentation/integrations' } }],
        },
        { 
          label: 'Reference', 
          items: [{autogenerate: { directory: 'documentation/reference' } }] 
        },
      ],
      plugins: [
        //starlightContextualMenu({actions: ["copy", "view", "chatgpt", "claude"]})
      ],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
      }
    }),
    mdx()
  ],
  vite: {
    plugins: [tailwind()],
  },
  redirects: {
    "/teams.html": "/integration-with/microsoft-teams/",
    "/mattermost.html": "/integration-with/mattermost/",
    "/slack.html": "/integration-with/slack/"
  }
});