require('dotenv').config();
const express = require('express'), compression = require('compression');
const fs = require('fs'), path = require('path'), crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'rajan';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me';
const SITE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const DB = path.join(__dirname, 'data', 'messages.json'), AN = path.join(__dirname, 'data', 'analytics.json'), ST = path.join(__dirname, 'data', 'settings.json');
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
const TZ = process.env.TZ_NAME || 'Asia/Kolkata';
const dayKey = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
const readJ = (f, def) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return def; } };
const writeJ = (f, v) => { const t = f + '.tmp'; fs.writeFileSync(t, JSON.stringify(v, null, 2)); fs.renameSync(t, f); };
const DEF = { available: true, availableText: 'Available for new projects', unavailableText: 'Fully booked, taking new projects soon', banner: { on: false, text: '', link: '', linkText: '' } };
const getSettings = () => { const s = readJ(ST, {}); return { ...DEF, ...s, banner: { ...DEF.banner, ...(s.banner || {}) } }; };
let AND = readJ(AN, { days: {} }), anTimer;
const bump = (e, extra) => { const d = (AND.days[dayKey()] ||= {}); d[e] = (d[e] || 0) + 1; if (extra) for (const [g, k] of Object.entries(extra)) { d[g] ||= {}; d[g][k] = (d[g][k] || 0) + 1; }
  clearTimeout(anTimer); anTimer = setTimeout(() => { const ks = Object.keys(AND.days).sort(); ks.slice(0, Math.max(0, ks.length - 400)).forEach(k => delete AND.days[k]); writeJ(AN, AND); }, 2000); };

// ---------- tiny JSON "database" (atomic writes) ----------
const read = () => { try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch { return []; } };
const write = (rows) => { const t = DB + '.tmp'; fs.writeFileSync(t, JSON.stringify(rows, null, 2)); fs.renameSync(t, DB); };

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
  next();
});

// ---------- rate limiting ----------
const hits = new Map();
const limit = (max, windowMs) => (req, res, next) => {
  const k = req.ip + req.path, now = Date.now();
  const arr = (hits.get(k) || []).filter(t => now - t < windowMs);
  if (arr.length >= max) return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
  arr.push(now); hits.set(k, arr); next();
};
setInterval(() => hits.clear(), 3600e3).unref();

// ---------- public: contact form ----------
const clean = (s, n) => String(s || '').replace(/[<>]/g, '').trim().slice(0, n);
app.post('/api/contact', limit(5, 10 * 60e3), (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot: bots fill this hidden field
  const m = { name: clean(b.name, 80), email: clean(b.email, 120), phone: clean(b.phone, 30),
              service: clean(b.service, 60), message: clean(b.message, 2000) };
  if (m.name.length < 2) return res.status(400).json({ ok: false, error: 'Please enter your name.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  if (m.message.length < 10) return res.status(400).json({ ok: false, error: 'Please write a message of at least 10 characters.' });
  const rows = read();
  rows.unshift({ id: crypto.randomUUID(), ...m, read: false, status: 'new', starred: false, note: '', createdAt: new Date().toISOString() });
  write(rows); bump('form');
  res.json({ ok: true });
});


// ---------- public: visit tracking (no personal data stored) + site settings ----------
const EVENTS = new Set(['view', 'visit', 'wa', 'resume', 'email', 'phone', 'cta']);
app.post('/api/track', limit(60, 60e3), (req, res) => {
  const b = req.body || {}, ua = req.get('user-agent') || '';
  if (!EVENTS.has(b.e) || /bot|crawl|spider|preview/i.test(ua)) return res.status(204).end();
  const x = {};
  if (b.e === 'visit') { x.dev = /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop'; x.refs = clean(b.ref, 60).toLowerCase() || 'direct'; }
  bump(b.e, x); res.status(204).end();
});
app.get('/api/settings', (req, res) => { const s = getSettings(); res.set('Cache-Control', 'no-store').json({ available: s.available, text: s.available ? s.availableText : s.unavailableText, banner: s.banner.on && s.banner.text ? s.banner : null }); });

// ---------- admin API (token auth) ----------
const sessions = new Map(); // token -> expiry
const safeEq = (a, b) => { const x = crypto.createHash('sha256').update(a).digest(), y = crypto.createHash('sha256').update(b).digest(); return crypto.timingSafeEqual(x, y); };
app.post('/api/admin/login', limit(8, 15 * 60e3), (req, res) => {
  const { username = '', password = '' } = req.body || {};
  if (safeEq(String(username), ADMIN_USER) && safeEq(String(password), ADMIN_PASSWORD)) {
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + 8 * 3600e3);
    return res.json({ ok: true, token, username: ADMIN_USER });
  }
  res.status(401).json({ ok: false, error: 'Wrong username or password.' });
});
const auth = (req, res, next) => {
  const t = (req.get('authorization') || '').replace('Bearer ', '');
  if (t && sessions.get(t) > Date.now()) return next();
  res.status(401).json({ ok: false, error: 'Please sign in again.' });
};
app.get('/api/admin/messages', auth, (req, res) => res.json({ ok: true, messages: read() }));
const STATUSES = ['new', 'in_progress', 'replied', 'closed'];
app.patch('/api/admin/messages/:id', auth, (req, res) => {
  const rows = read(), r = rows.find(x => x.id === req.params.id), b = req.body || {};
  if (!r) return res.status(404).json({ ok: false, error: 'Message not found.' });
  if ('read' in b) r.read = !!b.read; if ('starred' in b) r.starred = !!b.starred;
  if (STATUSES.includes(b.status)) r.status = b.status; if ('note' in b) r.note = clean(b.note, 2000);
  write(rows); res.json({ ok: true });
});
app.post('/api/admin/messages/bulk', auth, (req, res) => {
  const { ids, action, value } = req.body || {}; if (!Array.isArray(ids)) return res.status(400).json({ ok: false });
  const set = new Set(ids.map(String)); let rows = read();
  if (action === 'delete') rows = rows.filter(r => !set.has(r.id));
  else rows.forEach(r => { if (!set.has(r.id)) return; if (action === 'read') r.read = true; else if (action === 'unread') r.read = false; else if (action === 'star') r.starred = true; else if (action === 'unstar') r.starred = false; else if (action === 'status' && STATUSES.includes(value)) r.status = value; });
  write(rows); res.json({ ok: true });
});
app.get('/api/admin/stats', auth, (req, res) => {
  const n = Math.min(Math.max(parseInt(req.query.days) || 30, 7), 365), msgs = read(), by = {}, refs = {}, dev = {}, series = [];
  msgs.forEach(m => { const k = dayKey(new Date(m.createdAt)); by[k] = (by[k] || 0) + 1; });
  for (let i = n - 1; i >= 0; i--) { const k = dayKey(new Date(Date.now() - i * 864e5)), d = AND.days[k] || {};
    series.push({ d: k, view: d.view || 0, visit: d.visit || 0, wa: d.wa || 0, resume: d.resume || 0, email: d.email || 0, phone: d.phone || 0, cta: d.cta || 0, msgs: by[k] || 0 });
    for (const [r, c] of Object.entries(d.refs || {})) refs[r] = (refs[r] || 0) + c; for (const [r, c] of Object.entries(d.dev || {})) dev[r] = (dev[r] || 0) + c; }
  res.json({ ok: true, days: n, series, refs, devices: dev });
});
app.get('/api/admin/settings', auth, (req, res) => res.json({ ok: true, settings: getSettings() }));
app.put('/api/admin/settings', auth, (req, res) => {
  const b = req.body || {}, bn = b.banner || {}, s = getSettings();
  s.available = !!b.available; s.availableText = clean(b.availableText, 80) || DEF.availableText; s.unavailableText = clean(b.unavailableText, 80) || DEF.unavailableText;
  s.banner = { on: !!bn.on, text: clean(bn.text, 200), link: /^(https?:\/\/|#|mailto:)/.test(bn.link || '') ? clean(bn.link, 300) : '', linkText: clean(bn.linkText, 40) };
  writeJ(ST, s); res.json({ ok: true, settings: s });
});
app.post('/api/admin/logout', auth, (req, res) => { sessions.delete((req.get('authorization') || '').replace('Bearer ', '')); res.json({ ok: true }); });
app.get('/api/admin/export.json', auth, (req, res) => res.set('Content-Disposition', 'attachment; filename=portfolio-backup.json').json({ exportedAt: new Date().toISOString(), messages: read(), analytics: AND, settings: getSettings() }));
app.delete('/api/admin/messages/:id', auth, (req, res) => { write(read().filter(x => x.id !== req.params.id)); res.json({ ok: true }); });
app.get('/api/admin/export.csv', auth, (req, res) => {
  const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = ['Date,Name,Email,Phone,Service,Status,Starred,Message,Note', ...read().map(r => [r.createdAt, r.name, r.email, r.phone, r.service, r.status || 'new', r.starred ? 'yes' : '', r.message, r.note].map(q).join(','))].join('\n');
  res.type('text/csv').set('Content-Disposition', 'attachment; filename=messages.csv').send(csv);
});

// ---------- admin page: hidden path, never linked, noindex ----------
app.get('/admin', (req, res) => { res.set('X-Robots-Tag', 'noindex, nofollow'); res.sendFile(path.join(__dirname, 'admin', 'index.html')); });

// ---------- SEO files ----------
app.get('/robots.txt', (req, res) => res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`));
app.get('/sitemap.xml', (req, res) => res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`));

const ASSET_V = String(Date.now());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d', index: false }));
app.get('/', (req, res) => res.type('html').send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8').replaceAll('{{SITE_URL}}', SITE_URL).replaceAll('{{V}}', ASSET_V)));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

app.listen(PORT, () => {
  console.log(`Portfolio running on ${SITE_URL}  |  Admin at ${SITE_URL}/admin`);
  if (ADMIN_PASSWORD === 'change-me') console.warn('WARNING: set ADMIN_PASSWORD in .env before going live.');
});
