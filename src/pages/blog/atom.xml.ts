import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site-data.json';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const baseUrl = site.url;
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  const updated = sorted.length > 0 ? new Date(sorted[0].data.date).toISOString() : new Date().toISOString();

  const entries = sorted.map((post) => `
  <entry>
    <title>${post.data.title}</title>
    <link href="${baseUrl}/blog/${post.slug}/"/>
    <id>${baseUrl}/blog/${post.slug}/</id>
    <updated>${new Date(post.data.date).toISOString()}</updated>
    <summary>${post.data.excerpt || ''}</summary>
  </entry>
  `).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Scoold Blog</title>
  <link href="${baseUrl}/blog/" rel="alternate"/>
  <link href="${baseUrl}/blog/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${baseUrl}/blog/</id>
  <updated>${updated}</updated>
  <author>
    <name>Alex Bogdanovski</name>
    <email>alex@erudika.com</email>
  </author>
  ${entries}
</feed>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
};
