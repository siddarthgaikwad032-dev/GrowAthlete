import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  const posts = db.prepare(`SELECT p.*, u.name as author_name, u.avatar as author_avatar FROM posts p JOIN users u ON p.author_id = u.id ORDER BY p.created_at DESC`).all();
  // attach counts
  const withCounts = posts.map(p => {
    const likes = db.prepare('SELECT COUNT(*) as c FROM likes WHERE post_id = ?').get(p.id).c;
    const comments = db.prepare('SELECT COUNT(*) as c FROM comments WHERE post_id = ?').get(p.id).c;
    return { ...p, likes, comments };
  });
  res.json(withCounts);
});

// Create post
router.post('/', requireAuth, (req, res) => {
  const { content, media } = req.body;
  if (!content || !content.trim()) return res.status(400).json({ error: 'Post content required' });
  const info = db.prepare('INSERT INTO posts (author_id,content,media) VALUES (?,?,?)').run(req.user.id, content.trim(), media || '');
  const post = db.prepare('SELECT p.*, u.name as author_name, u.avatar as author_avatar FROM posts p JOIN users u ON p.author_id = u.id WHERE p.id = ?').get(info.lastInsertRowid);
  res.json(post);
});

// Get posts by user
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const posts = db.prepare('SELECT p.*, u.name as author_name, u.avatar as author_avatar FROM posts p JOIN users u ON p.author_id = u.id WHERE p.author_id = ? ORDER BY p.created_at DESC').all(userId);
  res.json(posts);
});

// Like / unlike
router.post('/:postId/like', requireAuth, (req, res) => {
  const postId = req.params.postId;
  const existing = db.prepare('SELECT * FROM likes WHERE user_id = ? AND post_id = ?').get(req.user.id, postId);
  if (existing) {
    db.prepare('DELETE FROM likes WHERE id = ?').run(existing.id);
    return res.json({ liked: false });
  }
  db.prepare('INSERT OR IGNORE INTO likes (user_id,post_id) VALUES (?,?)').run(req.user.id, postId);
  // create notification for post author
  try {
    const post = db.prepare('SELECT author_id FROM posts WHERE id = ?').get(postId);
    if (post && post.author_id && post.author_id !== req.user.id) {
      db.prepare('INSERT INTO notifications (user_id,type,data) VALUES (?,?,?)').run(post.author_id, 'like', JSON.stringify({ by: req.user.id, postId }));
    }
  } catch (e) { console.error('notify like', e); }
  return res.json({ liked: true });
});

// Add comment
router.post('/:postId/comment', requireAuth, (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  if (!content || !content.trim()) return res.status(400).json({ error: 'Comment cannot be empty' });
  const info = db.prepare('INSERT INTO comments (user_id,post_id,content) VALUES (?,?,?)').run(req.user.id, postId, content.trim());
  const comment = db.prepare('SELECT c.*, u.name as author_name, u.avatar as author_avatar FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = ?').get(info.lastInsertRowid);
  // notify post author
  try {
    const post = db.prepare('SELECT author_id FROM posts WHERE id = ?').get(postId);
    if (post && post.author_id && post.author_id !== req.user.id) {
      db.prepare('INSERT INTO notifications (user_id,type,data) VALUES (?,?,?)').run(post.author_id, 'comment', JSON.stringify({ by: req.user.id, postId, commentId: comment.id }));
    }
  } catch (e) { console.error('notify comment', e); }
  res.json(comment);
});

// Get comments for a post
router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const rows = db.prepare('SELECT c.*, u.name as author_name, u.avatar as author_avatar FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? ORDER BY c.created_at ASC').all(postId);
  res.json(rows);
});

// Increment view (avoid duplicates within 1 hour for same user)
router.post('/:postId/view', (req, res) => {
  const postId = req.params.postId;
  const userId = req.user ? req.user.id : null;
  if (userId) {
    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60).toISOString();
    const recent = db.prepare('SELECT * FROM views WHERE user_id = ? AND post_id = ? AND created_at > ?').get(userId, postId, oneHourAgo);
    if (recent) return res.json({ counted: false });
    db.prepare('INSERT INTO views (user_id,post_id) VALUES (?,?)').run(userId, postId);
  } else {
    // anonymous: increment but no dedupe
    db.prepare('INSERT INTO views (user_id,post_id) VALUES (?,?)').run(null, postId);
  }
  // increment post.views
  db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(postId);
  res.json({ counted: true });
});

// Save / unsave post
router.post('/:postId/save', requireAuth, (req, res) => {
  const postId = req.params.postId;
  const existing = db.prepare('SELECT * FROM saved_posts WHERE user_id = ? AND post_id = ?').get(req.user.id, postId);
  if (existing) {
    db.prepare('DELETE FROM saved_posts WHERE id = ?').run(existing.id);
    return res.json({ saved: false });
  }
  db.prepare('INSERT OR IGNORE INTO saved_posts (user_id,post_id) VALUES (?,?)').run(req.user.id, postId);
  return res.json({ saved: true });
});

// Get saved posts for user
router.get('/saved/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const posts = db.prepare(`SELECT p.*, u.name as author_name, u.avatar as author_avatar FROM saved_posts s JOIN posts p ON s.post_id = p.id JOIN users u ON p.author_id = u.id WHERE s.user_id = ? ORDER BY s.created_at DESC`).all(userId);
  res.json(posts);
});

export default router;
