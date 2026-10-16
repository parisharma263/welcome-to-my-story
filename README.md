# Welcome to My Story

A colorful, interactive personal story built with React, JavaScript, Vite, Framer Motion, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## Customize the story

Edit personal copy and story data in `src/content/siteContent.js`. The page is composed from reusable sections in `src/components/StoryExperience.jsx`; visual tokens and responsive styling are in `src/index.css` and `src/styles/story.css`.

## Check the project

```sh
npm run lint
npm run build
```

## Deploy to Vercel

Import the repository in Vercel and use these project settings:

- Framework preset: **Vite**
- Root directory: repository root
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: **22.x or newer** (Vite requires Node.js `^20.19.0` or `>=22.12.0`)

This is a single-page React app without client-side routing, so no Vercel rewrite configuration is needed. No environment variables are required. Do not commit `.env` files; `.env.example` is allowed for documenting variable names if needed.
