import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const user = db.prepare('SELECT id,name,email,sport,location,avatar,bio,created_at FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const followers = db.prepare('SELECT COUNT(*) as c FROM follows WHERE following_id = ?').get(id).c;
  const following = db.prepare('SELECT COUNT(*) as c FROM follows WHERE follower_id = ?').get(id).c;
  res.json({ ...user, followers, following });
});

// Update profile (only owner)
router.put('/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  if (parseInt(id,10) !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const { name, sport, location, avatar, bio } = req.body;
  db.prepare('UPDATE users SET name = ?, sport = ?, location = ?, avatar = ?, bio = ? WHERE id = ?').run(name, sport, location, avatar, bio, id);
  const user = db.prepare('SELECT id,name,email,sport,location,avatar,bio,created_at FROM users WHERE id = ?').get(id);
  res.json(user);
});

// Follow / unfollow
router.post('/:id/follow', requireAuth, (req, res) => {
  const target = parseInt(req.params.id,10);
  if (target === req.user.id) return res.status(400).json({ error: 'Cannot follow yourself' });
  const existing = db.prepare('SELECT * FROM follows WHERE follower_id = ? AND following_id = ?').get(req.user.id, target);
  if (existing) {
    db.prepare('DELETE FROM follows WHERE id = ?').run(existing.id);
    return res.json({ following: false });
  }
  db.prepare('INSERT OR IGNORE INTO follows (follower_id,following_id) VALUES (?,?)').run(req.user.id, target);
  // notify target user
  try {
    db.prepare('INSERT INTO notifications (user_id,type,data) VALUES (?,?,?)').run(target, 'follow', JSON.stringify({ by: req.user.id }));
  } catch (e) { console.error('notify follow', e); }
  return res.json({ following: true });
});

// Get followers list
router.get('/:id/followers', (req, res) => {
  const id = req.params.id;
  const rows = db.prepare('SELECT u.id,u.name,u.avatar FROM follows f JOIN users u ON f.follower_id = u.id WHERE f.following_id = ?').all(id);
  res.json(rows);
});

// Get following list
router.get('/:id/following', (req, res) => {
  const id = req.params.id;
  const rows = db.prepare('SELECT u.id,u.name,u.avatar FROM follows f JOIN users u ON f.following_id = u.id WHERE f.follower_id = ?').all(id);
  res.json(rows);
});

// Get user's posts
router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  const posts = db.prepare('SELECT p.*, u.name as author_name, u.avatar as author_avatar FROM posts p JOIN users u ON p.author_id = u.id WHERE p.author_id = ? ORDER BY p.created_at DESC').all(id);
  res.json(posts);
});

export default router;
