import express from 'express';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Sign up (email)
router.post('/signup', async (req, res) => {
  const { name, email, password, sport } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 8);
  const info = db.prepare('INSERT INTO users (name,email,password,sport,avatar,location,bio) VALUES (?,?,?,?,?,?,?)').run(
    name || '',
    email,
    hash,
    sport || '',
    '',
    '',
    ''
  );
  const user = db.prepare('SELECT id,name,email,sport,location,avatar,bio,created_at FROM users WHERE id = ?').get(info.lastInsertRowid);
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ user, token });
});

// Login (email)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password || '');
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const safeUser = { id: user.id, name: user.name, email: user.email, sport: user.sport, location: user.location, avatar: user.avatar, bio: user.bio };
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ user: safeUser, token });
});

// Google sign-in: accept idToken from frontend, verify and upsert user
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'idToken required' });
  try {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email;
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      const info = db.prepare('INSERT INTO users (name,email,avatar) VALUES (?,?,?)').run(payload.name || '', email, payload.picture || '');
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
    }
    const safeUser = { id: user.id, name: user.name, email: user.email, sport: user.sport, location: user.location, avatar: user.avatar, bio: user.bio };
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ user: safeUser, token });
  } catch (err) {
    console.error('Google verify error', err);
    res.status(400).json({ error: 'Failed to verify Google id token' });
  }
});

export default router;
