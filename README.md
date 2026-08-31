# FinGoose

FinGoose is a static-exported Next.js website for the organization’s financial-literacy curriculum, workshops, children’s books, and chapter program.

## Development

Requirements:

- Node.js 22 or newer
- pnpm 11

Install dependencies and start the development server:

~~~bash
pnpm install
pnpm dev
~~~

Create the production export:

~~~bash
pnpm build
~~~

The exported site is written to the out directory.

## Project structure

~~~text
src/
  app/          Routes, metadata, and route-specific styles
  components/   Reusable interface and interaction components
  lib/          Shared utilities
  styles/       Site-wide design, responsive, and easter-egg styles
public/         Images, video reels, favicon, and verification files
scripts/        Export and hosting preparation
~~~

## Deployment

Pushes to the main branch run the GitHub Pages workflow. The workflow installs the locked dependencies, builds the static export, and deploys the contents of the out directory.
