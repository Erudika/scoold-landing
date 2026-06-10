import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site-data.json';

export const GET: APIRoute = async ({ site: astroSite }) => {
  const posts = await getCollection('blog');
  const baseUrl = site.url;
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const items = sorted.map((post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}/</guid>
      <description><![CDATA[${post.data.excerpt || ''}]]></description>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
    </item>
  `).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Scoold Blog</title>
    <link>${baseUrl}/blog/</link>
    <description>Release notes, technical deep-dives, and insights about Scoold knowledge management platform.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
