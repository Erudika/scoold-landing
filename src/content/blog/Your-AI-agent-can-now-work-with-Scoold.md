---
title: "Your AI agent can now work with Scoold"
date: 2026-04-16
tags: ["ai",  "mcp", "integration"]
author: "alex@erudika.com"
excerpt: "Scoold now functions as an MCP server, which means any compatible AI client can connect to it and perform actions through a set of dedicated tools."
img: "blogpost_media2s"
thumb: "blogpost_media2s"
---

I'm happy to announce two powerful new features in Scoold: **a built-in MCP server** and **personal access tokens**.
These additions open up entirely new ways to interact with your knowledge base, letting AI agents help you search,
create, and manage content on your behalf.

<!-- more -->

![Scoold and n8n workflow](@/images/blog/blogpost_media2s.png)

## How it works

The Model Context Protocol (MCP) is an open standard that lets AI assistants connect to external data sources and tools.
Think of it as a bridge between your AI agent and Scoold - instead of just chatting with an AI, you can now have it actively
work with your questions, answers, users, and spaces.
Scoold now functions as an MCP server, which means any compatible AI client can connect to it and perform actions through a
set of dedicated tools (about 64 tools in total). Your AI agent can:

- **Search** through questions, answers, comments, tags, and users
- **Read** posts, user profiles, spaces, and configuration
- **Create** new questions, answers, comments, and tags
- **Moderate** content by approving posts, closing questions, or managing reports
- **Manage** users, spaces, and webhooks
- **Configure** server settings

All of this happens through simple, well-defined actions rather than browsing through pages or clicking buttons.

## Choose between two modes of operation

The MCP server operates in two modes:

**Read-only mode** - AI agents can search and read content but cannot make any changes. Perfect for research, analysis,
and information retrieval without worrying about accidental modifications.

**Read-write mode** - Full access. Your AI agent can create posts, moderate content, and manage users.
Ideal when you want your AI to be a true assistant that can take action.

You control which mode to use through a simple configuration setting:

```ini
# MCP server mode: off - disabled, r - read-only, rw - read and write
scoold.mcp_server_mode = "rw"
```

## Personal access tokens

This is another new feature in Scoold. These tokens can be used either for accessing the Scoold API as an authenticated user, or
with for enabling an MCP client (AI agent) to talk to Scoold. Previously, only administrators could issue tokens for the MCP server.
Now, with personal access tokens, any user can generate their own token and give their AI agent personalized access to Scoold.

This means:

- **Each user** can have their own AI assistant that acts on their behalf
- **Permissions matter** - the AI agent has the same permissions as the user who created the token
- **Individual control** - users manage their own tokens from their Settings page
- **Security** - tokens can be revoked at any time

When a user creates a personal access token, their AI agent can interact with Scoold as if the user themselves were performing
those actions - posting questions, answering others, voting, and commenting. As a secure default, personal access tokens are
disabled out of the box.

## Getting started

Enabling the MCP server is straightforward. Add this to your `scoold-application.conf`:

```ini
# Enable MCP server in read-write mode
scoold.mcp_server_mode = "rw"
# Allow users to create personal access tokens
scoold.api_user_access_enabled = true
```

Then configure your MCP client with your Scoold URL and API token:

```json
{
  "mcpServers": {
    "scoold": {
      "type": "http",
      "url": "http://localhost:8000/api/mcp",
      "mode": "streamable",
      "headers": {
        "Authorization": "Bearer {SCOOLD_API_TOKEN}"
      }
    }
  }
}
```

That's it. Your AI agent can now connect to Scoold.

## Real-world use cases

- **Knowledge Discovery** - Ask your AI to find all unanswered questions in a specific space or search for questions tagged with certain topics.
- **Content Creation** - Dictate a question to your AI and have it format and post it to Scoold while you're on the go.
- **Community Management** - Let your AI help moderate by reviewing reports, approving pending posts, or generating summaries of recent activity.
- **Data Analysis** - Have your AI analyze voting patterns, popular tags, or user engagement across spaces.
- **Automated Workflows** - Chain multiple actions together, like creating a question, tagging it appropriately, and notifying relevant users.

## Security

The MCP server respects all of Scoold's existing permissions and security mechanisms:

- MCP clients must use API tokens for authentication
- User actions are limited by their role (user, moderator, admin)
- Space permissions are enforced
- Sensitive configuration values are automatically redacted
- Destructive operations are disabled in read-only mode

## Final thoughts

We can't wait to see how you use the MCP server and personal access tokens. Whether you're building automated workflows,
creating AI-powered support bots, or just making your daily Scoold interactions more efficient, these features are designed
to give you flexibility and control.

The MCP server is available now in Scoold and Scoold Pro.
Also check out the [documentation for this feature](https://scoold.com/documentation/getting-started/mcp-server/).

Have questions or feedback? Open an issue [on the project's GitHub page](https://github.com/Erudika/scoold/issues).

*Hey, I'm Alex - an [indie solo developer](https://www.indiehackers.com/albogdano) working on Scoold in the open.
Questions? Ask me anything [on Gitter](https://gitter.im/Erudika/scoold)!*
