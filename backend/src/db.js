import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'data.db');
const needInit = !fs.existsSync(dbPath);

const db = new Database(dbPath);

if (needInit) {
  // Users
  db.prepare(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      sport TEXT,
      location TEXT,
      avatar TEXT,
      bio TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Posts
  db.prepare(`
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER,
      content TEXT,
      media TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      repost_of INTEGER DEFAULT NULL,
      views INTEGER DEFAULT 0,
      FOREIGN KEY(author_id) REFERENCES users(id)
    )
  `).run();

  // Likes
  db.prepare(`
    CREATE TABLE likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      post_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, post_id)
    )
  `).run();

  // Comments
  db.prepare(`
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      post_id INTEGER,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Saved posts
  db.prepare(`
    CREATE TABLE saved_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      post_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, post_id)
    )
  `).run();

  // Follows
  db.prepare(`
    CREATE TABLE follows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      follower_id INTEGER,
      following_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(follower_id, following_id)
    )
  `).run();

  // Notifications
  db.prepare(`
    CREATE TABLE notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT,
      data TEXT,
      read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Views tracking (to avoid duplicate counts)
  db.prepare(`
    CREATE TABLE views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      post_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Tournaments (basic)
  db.prepare(`
    CREATE TABLE tournaments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      sport TEXT,
      location TEXT,
      start_date TEXT,
      end_date TEXT,
      category TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Chat rooms (basic)
  db.prepare(`
    CREATE TABLE chat_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  db.prepare(`
    CREATE TABLE chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER,
      user_id INTEGER,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

export default db;
