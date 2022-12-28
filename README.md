# ESV Bible

Uses [Next.js](https://nextjs.org/) to serve the ESV translation.

## Deploying

You can run this on any web server.

```bash
pnpm i
pnpm build
```

Take the contents of the `/out` directory and put it on Apache / Caddy / whatever.

- UPDATE: Optimizing using Vercel now. A static export may not work anymore.
