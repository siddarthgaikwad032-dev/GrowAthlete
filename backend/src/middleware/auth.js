import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '30d' });
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
