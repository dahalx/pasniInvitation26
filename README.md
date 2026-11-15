# Shriva's Pasni Invitation

A web invitation for Shriva's Pasni celebration, with event details, RSVP submission, and a guest message album.

## Run locally

### Requirements

- Node.js 20.19 or newer
- Bun 1.4 or newer

### Start the development server

From the project directory, run:

```sh
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Keep the terminal running while you use the site. Press `Ctrl+C` in that terminal to stop the server.

The project uses `bun.lock` to keep dependency versions consistent. Use Bun to install dependencies; `npm install` may fail due to a peer dependency version conflict.

### Production build

```sh
bun run build
NODE_ENV=production bun run start
```

The production server also listens on port 3000 by default. To use a different port, set `PORT` before starting the server.

## Troubleshooting

- If the browser shows an error or cannot connect, make sure the development server is still running and open the URL printed in the terminal.
- In a remote development environment, forward port 3000 and open the forwarded address provided by that environment.
- If port 3000 is already in use, stop the other server or choose another port, for example `PORT=3001 bun run dev`.
