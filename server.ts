import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

export interface OrnamentMessage {
  id: number | string;
  author: string;
  note: string;
  color: string;
  x: number;
  y: number;
  time: string;
}

export interface RSVPRecord {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  dietaryNotes?: string;
  createdAt: string;
}

// In-memory fallback and file persistence for local dev
const DATA_DIR = path.join(__dirname, '.data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const RSVPS_FILE = path.join(DATA_DIR, 'rsvps.json');

const INITIAL_MESSAGES: OrnamentMessage[] = [
  { id: 1, author: "Mama & Maiju", note: "Subha Pasni hamro pyari Shriva! May you always be blessed with good health, sweetness, and wisdom.", color: "#e88d9f", x: 170, y: 75, time: "Nov 4" },
  { id: 2, author: "Hajurba & Hajuraama", note: "शुभ पास्नी! May our little princess grow up to be bright, kind, and prosperous. Infinite ashirvad!", color: "#d4af37", x: 135, y: 135, time: "Nov 5" },
  { id: 3, author: "Fupu & Fupaju", note: "Counting down to feed you the first delicious bite of kheer in your silver bowl! Lots of love.", color: "#7e1d35", x: 205, y: 140, time: "Nov 5" },
  { id: 4, author: "Dahal Family", note: "Heartiest congratulations on Shriva's Rice Weaning Ceremony! So excited to celebrate in Fort Worth.", color: "#f8ccd5", x: 110, y: 215, time: "Nov 6" },
  { id: 5, author: "Prashant & Soniya", note: "May your life be as sweet as the kheer today! Happy Pasni, baby Shriva! 💖", color: "#d4af37", x: 230, y: 220, time: "Nov 6" }
];

let messages: OrnamentMessage[] = [...INITIAL_MESSAGES];
let rsvps: RSVPRecord[] = [
  {
    id: 'rsvp_sample_1',
    name: 'Bikash & Anisha Sharma',
    attending: 'yes',
    guests: 3,
    dietaryNotes: 'Vegetarian Nepali cuisine preferred. So excited for Shriva!',
    createdAt: new Date().toISOString()
  }
];

function loadPersistedData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(MESSAGES_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
      if (Array.isArray(parsed) && parsed.length > 0) {
        messages = parsed;
      }
    }
    if (fs.existsSync(RSVPS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(RSVPS_FILE, 'utf-8'));
      if (Array.isArray(parsed)) {
        rsvps = parsed;
      }
    }
  } catch (err) {
    console.warn('Could not load local persisted files, using default memory state:', err);
  }
}

function saveMessages() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.warn('Could not save messages:', err);
  }
}

function saveRsvps() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(rsvps, null, 2));
  } catch (err) {
    console.warn('Could not save RSVPs:', err);
  }
}

loadPersistedData();

// API Endpoints
// GET /api/messages - matches user Worker script
app.get('/api/messages', (_req, res) => {
  res.json(messages);
});

// POST /api/messages - hang a new ornament message
app.post('/api/messages', (req, res) => {
  const { author, note, color, x, y } = req.body;
  if (!author || !note) {
    res.status(400).json({ error: 'Author and message are required' });
    return;
  }

  // Random position on tree canopy if not specified
  const posX = typeof x === 'number' ? x : Math.floor(Math.random() * 140) + 100;
  const posY = typeof y === 'number' ? y : Math.floor(Math.random() * 160) + 90;

  const newMessage: OrnamentMessage = {
    id: Date.now(),
    author: String(author).trim(),
    note: String(note).trim(),
    color: color || '#e88d9f',
    x: posX,
    y: posY,
    time: 'Just now'
  };

  messages.push(newMessage);
  saveMessages();
  res.status(201).json({ status: 'success', message: newMessage });
});

// POST /api/rsvp - matches user Worker script
app.post('/api/rsvp', (req, res) => {
  const { name, attending, guests, dietaryNotes } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const newRsvp: RSVPRecord = {
    id: `rsvp_${Date.now()}`,
    name: String(name).trim(),
    attending: attending === 'no' ? 'no' : 'yes',
    guests: Math.max(1, Math.min(10, parseInt(guests, 10) || 1)),
    dietaryNotes: dietaryNotes ? String(dietaryNotes).trim() : '',
    createdAt: new Date().toISOString()
  };

  rsvps.unshift(newRsvp);
  saveRsvps();
  res.status(201).json({ status: 'success', rsvp: newRsvp });
});

const HOST_PIN = '7613175038';

// GET /api/rsvp - returns total response summary to guests; full guest list only with valid host PIN
app.get('/api/rsvp', (req, res) => {
  const providedPin = (req.headers['x-host-pin'] as string | undefined) || (req.query.pin as string | undefined);

  const totalAttending = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + r.guests, 0);

  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;

  if (providedPin !== undefined && providedPin !== '') {
    if (providedPin.trim() !== HOST_PIN) {
      res.status(403).json({
        status: 'error',
        authorized: false,
        error: 'Incorrect host passcode. Please try again.'
      });
      return;
    }

    res.json({
      status: 'success',
      authorized: true,
      totalAttending,
      count: rsvps.length,
      attendingCount,
      declinedCount,
      rsvps
    });
    return;
  }

  // Public summary only — no guest names or private notes exposed
  res.json({
    status: 'success',
    authorized: false,
    totalAttending,
    count: rsvps.length,
    attendingCount,
    declinedCount
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: { server: httpServer }
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Shriva Pasni Invitation server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
