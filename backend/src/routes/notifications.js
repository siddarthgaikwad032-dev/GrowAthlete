import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get current user's notifications
router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  const parsed = rows.map(r => {
    let data = r.data;
    try { data = data ? JSON.parse(data) : {}; } catch (e) { data = r.data; }
    // enrich actor info if present
    let actor = null;
    if (data && data.by) {
      actor = db.prepare('SELECT id,name,avatar FROM users WHERE id = ?').get(data.by);
    }
    // compute view target
    let view = null;
    if (r.type === 'follow' && actor) {
      view = { type: 'profile', userId: actor.id };
    } else if ((r.type === 'like' || r.type === 'comment') && data && data.postId) {
      // get post author
      const post = db.prepare('SELECT author_id FROM posts WHERE id = ?').get(data.postId);
      if (post && post.author_id) view = { type: 'profile', userId: post.author_id, postId: data.postId };
    }
    const message = (() => {
      if (r.type === 'follow' && actor) return `${actor.name} started following you`;
      if (r.type === 'like' && actor) return `${actor.name} liked your post`;
      if (r.type === 'comment' && actor) return `${actor.name} commented on your post`;
      return r.type || 'activity';
    })();
    return {
      id: r.id,
      type: r.type,
      data,
      actor,
      view,
      read: !!r.read,
      message,
      created_at: r.created_at
    };
  });
  res.json(parsed);
});

// Mark single notification read
router.post('/:id/read', requireAuth, (req, res) => {
  const id = req.params.id;
  db.prepare('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?').run(id, req.user.id);
  res.json({ ok: true });
});

// Mark all as read
router.post('/mark-all', requireAuth, (req, res) => {
  db.prepare('UPDATE notifications SET read = 1 WHERE user_id = ?').run(req.user.id);
  res.json({ ok: true });
});

export default router;
