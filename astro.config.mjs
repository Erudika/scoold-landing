import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightContextualMenu from "starlight-contextual-menu";
import { site } from "./src/data/site-data.json";

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never', 
  security: { csp: true },
  integrations: [// Register sitemap BEFORE Starlight to prevent Starlight adding its own version
    sitemap(),
    starlight(
    {
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
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Erudika/scoold' }],
      sidebar: [
        { label: '↩ Back to Scoold.com', link: '/' },
        { label: 'Docs Home', link: '/documentation' },
        { 
          label: 'Introduction',
          autogenerate: { directory: 'documentation/intro' }
        },
        
        {
          label: 'Getting Started',
          autogenerate: { directory: 'documentation/getting-started' },
        },
        {
          label: 'Integrations',
          autogenerate: { directory: 'documentation/integrations' },
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
    }
  ),
  mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { 
        theme: 'material-theme-darker',
        // defaultColor: true,
        // themes: {
        //   light: 'github-light-default',
        //   dark: 'github-dark-default'
        // }
      }
    }
  )],
  vite: {
    plugins: [tailwindcss()],
  }
});