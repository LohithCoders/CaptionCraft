# CaptionCraft AI

CaptionCraft AI is a college project prototype that explores how AI-style writing tools can help people create social media captions. It turns a short topic or image description into several caption options shaped by a selected platform and tone.

## Project purpose

The goal is to demonstrate a simple caption-writing workflow and the ideas behind GPT-based text generation, natural language processing, and prompt engineering. Users can choose a platform, writing tone, and number of variations, then copy or favorite captions they like.

## Features

- Caption options for Instagram, Facebook, LinkedIn, and X
- Funny, professional, casual, motivational, inspirational, and witty tones
- Optional hashtags and emojis
- Copy individual captions or copy all results
- Save and unsave favorite captions during the current session
- Responsive layout for desktop and mobile screens

## Demo mode

This prototype uses locally prepared sample captions. It does not connect to a GPT model, external API, database, or account system. The sample generation demonstrates the intended experience without requiring an API key.

## Run locally

Install [Node.js](https://nodejs.org/), then run these commands from the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. To check a production build, run `npm run build` and then `npm run preview`.

## Technologies

React, Vite, Tailwind CSS, and Lucide icons. Application interactions use local React state.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and deploys it when changes are pushed to `main`. In the repository settings, select **Settings → Pages → GitHub Actions** as the deployment source.
