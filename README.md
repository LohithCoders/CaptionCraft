# CaptionCraft AI

A responsive, frontend-only social media caption generator prototype built with React, Tailwind CSS, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Demo behavior

Caption generation uses locally prepared sample data to demonstrate the UI. It does not call an external GPT model or API. The prototype includes platform and tone preferences, hashtags, emojis, copy controls, favorites, and reset behavior.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the Vite app and publishes it to GitHub Pages whenever changes are pushed to the `main` branch. In the repository settings, enable **Pages** and select **GitHub Actions** as the build and deployment source.
