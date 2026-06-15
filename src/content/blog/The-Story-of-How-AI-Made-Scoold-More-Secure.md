---
title: "The Story of How AI Made Scoold More Secure"
date: 2026-06-15
tags: ["security",  "ai"]
author: "alex@erudika.com"
excerpt: "This is the story of how AI found vulnerabilities in Scoold, why it happened, and what it means for developers shipping software in the age of AI."
img: "blogpost_media4s"
thumb: "blogpost_media4s"
---

**I've been writing software for a long time. I think and care about security.** I read the CVEs, review dependency trees and rely on scanning tools like Snyk - I consider myself fairly security-aware.

And yet, about 18 months ago, an AI agent found a critical security vulnerability in my open-source software project that I had completely missed. Not only did it find the bug, exploited it, chained it into a second vulnerability, but it also demonstrated arbitrary file read on the server. All autonomously.

This is the story of what happened, why it happened, and what it means for developers shipping software in the age of AI.

<!-- more -->

![Scoold made more secure by AI](@/images/blog/blogpost_media4s.png)

A while back, the team behind the autonomous AI penetration testing platform, XBOW, reach out to me with an interesting security report. I verified the report, fixed the vulnerabilities within a few hours, and released a security patch. The vulnerability existed because of two mistakes that, in hindsight, were completely avoidable.

## The Report

One day, a security researcher from XBOW reached out to me with a detailed security report. Their AI had been given a compiled JAR file of Scoold with one instruction: find an exploit that allows reading arbitrary files on the server.

Here's what struck me most: the agent didn't just fumble around. It read the compiled Java bytecode using `javap`, identified the relevant authentication logic, wrote a Python script to systematically try path manipulation tricks, found the authentication bypass, and then chained it into file exfiltration - all without human guidance. Then it combined that vulnerability with another feature inside a configuration library to achieve arbitrary file reads.

The result was assigned [CVE-2024-50334](https://www.cve.org/CVERecord?id=CVE-2024-50334). I released a patch immediately after I got the report. After the patch, the XBOW team published a [detailed write-up](https://xbow.com/blog/xbow-scoold-vuln) of how their AI agent discovered and exploited the vulnerability.

What impressed me wasn't the vulnerability itself; it was the methodology and the fact that the AI agent found the issues on its own. The AI wasn't blindly generating payloads. It was reasoning about the codebase, forming hypotheses, testing them, encountering dead ends, and adapting its approach. That's when it became clear to me that software security has entered a new era.

## First Crucial Mistake: Using the Wrong Java Method

The root cause of the authentication bypass was embarrassingly simple. Java's HTTP request API contains two very similar methods and *very confusing* methods:

```java
request.getServletPath()   // Returns: /api/config
request.getRequestURI()    // Returns: /api/config;jsessionid=abc123?foo=bar
```

At first glance, they sound interchangeable, and that was my initial assumption. I only needed to check the first part of the path and check if the request was hitting our API endpoint at `/api/`. *But they are not!*

`getServletPath()` returns a normalized servlet path that the application uses for routing - a clean path, no query string, etc.
`getRequestURI()` returns the raw request URI as received by the server. For authentication checks, routing decisions, and authorization logic, this difference [matters a lot](https://medium.com/@erionxu/use-getservletpath-not-getrequesturi-b134bcae305e).

In Scoold, I was performing string matching against API routes to determine whether a request should be allowed through the authentication layer.
Unfortunately, I used `request.getRequestURI()` instead of `request.getServletPath()`. The AI discovered that by introducing a semicolon into the path, it could create a mismatch between what the authorization logic saw and what the application actually routed internally. Like this:

```text
GET /api;/config
```

Turns out, a request like that would bypass authentication checks while still reaching the protected endpoint. What!? 😯

This is one of those bugs that looks obvious once someone points it out. Before that moment, it seemed perfectly reasonable. The lesson here is uncomfortable but important: **know your platform APIs.** Security bugs often come not from complex cryptography failures or sophisticated attack chains, but from subtle misunderstandings of framework behavior and misuse of core APIs.

The servlet API wasn't wrong. The documentation wasn't wrong. I was wrong. And AI found it.

## Second Crucial Mistake: Not Inspecting Dependencies Thoroughly

The second issue involved a feature I had barely thought about in years.
Scoold uses Lightbend Config (formerly Typesafe Config) for managing application configuration.

It's a great library, but it comes with a dangerous default feature out of the box. It supports importing external files into your configuration:

```hocon
include file("/etc/passwd")
```

This allows configuration files to import content from arbitrary files on the filesystem. Yeah, it sounds scary when you hear it like that!

In normal circumstances, this isn't a problem. Administrators are trusted. Configuration files are local. Everything is fine.
But because of the authentication bypass, an attacker could access Scoold's configuration API without credentials.

That API was intentionally designed for remote administration so that admins could update configuration values with a single API call.
Once the AI gained access to that endpoint, it realized that HOCON parsing could be abused. By submitting carefully crafted configuration payloads, it was able to trigger file inclusion behavior and retrieve sensitive information from the host system.

So here's the chain XBOW's agent put together:

1. Bypass authentication using the semicolon path trick to reach `/api/config`
2. POST a HOCON payload containing `include file("/etc/passwd")` (or any file on the system)
3. The server parses the HOCON, hits the `include` directive, reads the file, and - because it's an invalid config - throws a parse error that **includes the file contents in the error message**

That last part is particularly elegant (and painful). The agent didn't need a clean read path. It used the parser's error output as an exfiltration channel. It's the kind of lateral thinking that, honestly, I wouldn't have expected from an automated tool.

Security failures are often not single bugs. They're chains. One weak link creates exposure. A second weak link turns that exposure into a compromise.
Key takeaway - inspect your dependencies for features you don't need or use! 

## What This Means for Software Developers and Open-Source Projects

Open source has always been a double-edged sword. The source code is visible to attackers. The source code is also visible to defenders.
What's more important here is that, even if your software is closed-source, the attackers only need the compiled binary and the AI will disassemble it with ease. 

In the past, defenders had an advantage because doing a thorough security review needed expertise, time, and effort. Today, AI is rapidly changing that. XBOW showed that autonomous agents can reverse engineer applications, reason about code, fuzz endpoints, find vulnerabilities, and create exploits with minimal human help. And this was in 2024! Today, we have models that are much more capable than those available back then. We are rapidly approaching a world where the barrier to entry for sophisticated security testing is near zero.

## Software Is Easy to Write, Hard to Secure

There's a metaphor I keep coming back to: a leaky bucket, full of tiny holes. Every feature, every dependency and every framework all introduce another potential leak. Most of the time the bucket holds. Then somebody finds the one hole you forgot about. Building software is easier than ever, securing it is still hard but we could leverage AI to help us with that. Vibe coding feels super productive, but the more code we generate, and the larger the attack surface becomes. For software developers, this is especially challenging. You're often a team of one, shipping fast. Security reviews are what you do "when you have time," and you never have time.

My recommendation going forward - **your CI/CD pipeline needs a security gate.** Not a linting pass. Not a SAST tool that flags theoretical issues you ignore. An actual automated pentesting step - something that attempts to exploit your application before each push reaches production. AI-powered pentesting agents are becoming affordable and accessible enough that this should be achievable for small teams, not just enterprises. Treat every commit as potentially introducing a vulnerability. Because it might.

For a while, I felt embarrassed by my mistakes, and that AI found a bug in my code. Now, I'm just grateful that AI was working with me rather than against me. In a world where attackers have autonomous agents searching for vulnerabilities 24/7, relying only on human code review is no longer enough.

