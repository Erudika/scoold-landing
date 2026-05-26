---
title: "Scoold 1.68: Better Accessibility, Cleaner UI"
date: 2026-05-26
tags: ["a11y",  "release"]
author: "alex@erudika.com"
excerpt: "Scoold 1.68.0 is a new version which brings many UI improvements and aims to comply with the modern accessibility guidelines."
img: "blogpost_media3s"
thumb: "blogpost_media3s"
---

We’ve released version `1.68.0` of [Scoold](https://scoold.com)! This version brings many UI improvements and aims to comply with the modern accessibility guidelines.

<!-- more -->

![Scoold new release](@/images/blog/blogpost_media3s.png)

This update focuses primarily on UI polish and accessibility improvements, making Scoold easier to use for everyone across desktop and mobile devices.
The new release improves keyboard navigation, visual consistency, responsiveness, and overall usability, especially for users relying on accessibility features and high-zoom interfaces.

Accessibility is no longer a "nice to have" for internal tools and knowledge platforms. Teams expect interfaces that are fast, readable, responsive, and usable under a wide range of conditions. With `1.68.0`, Scoold continues moving in that direction with a cleaner and more refined experience with a focus on WCAG 2 compliance.

We've also added support for **Mermaid in Markdown**! This feature makes it super easy to share your diagrams and drawings with your team, or ask your AI assistant to save them for you inside Scoold. This feature is enabled with the [following configuration](https://scoold.com/documentation/reference/configuration/#scoold_mermaid_enabled):

```ini
scoold.mermaid_enabled = true
```

We've also decided that the time has come for the outdated FontAwesome to go and replaced it with inline SVGs. As a result, the UI should now feel lighter and more responsive.
Fonts have also been optimized - Scoold now relies on the web fonts built into your browser, rather than loading external font files.

Here are some of the highlights in this release:

- added Mermaid support in Markdown
- fixed A11Y issues, colors and contrast, fixed UI issues in dark mode
- updated Markdown editor with greatly improved Markdown preview rendering
- added new API endpoints for managing user notification subscriptions
- removed all use of the outdated FontAwesome, replaced with inline SVGs, removed external font Roboto
- added 🇭🇷 Croatian and 🇨🇿 Czech translations (👋🏼 Bok! Ahoj!)
- lots of bug fixes and minor patches

You can see the full changelog or download the latest `1.68.1` release here:

👉🏼 [Scoold 1.68.0 Release Notes](https://github.com/Erudika/scoold/releases/tag/1.68.0)

👉🏼 [Download the latest version on GitHub](https://github.com/Erudika/scoold/releases/tag/1.68.1)

*Need more features?* [Scoold Pro](https://scoold.com/pricing/) combines a modern Q&A workflow inspired by Stack Overflow with enterprise-ready features like SSO, spaces, REST APIs, chat integrations, moderation tools, and cloud-ready deployment options.
