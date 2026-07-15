import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import notificationsRoutes from './routes/notifications.js';
import db from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req, res) => res.json({ ok: true, message: 'GrowAthlete backend' }));

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.use('/notifications', notificationsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
