GrowAthlete Backend

This is a lightweight Express + SQLite backend scaffold used by the GrowAthlete frontend.

Quick start

1. From the `backend/` folder install dependencies:

```bash
cd backend
npm install
```

2. Create an `.env` file (or set environment variables). You can copy `.env.example`:

```bash
cp .env.example .env
# then edit .env and set JWT_SECRET and GOOGLE_CLIENT_ID
```

3. Start the server:

```bash
npm run dev
```

APIs
- `POST /auth/signup` {name,email,password,sport}
- `POST /auth/login` {email,password}
- `POST /auth/google` {idToken}
- `GET /posts`
- `POST /posts` (auth)
- `POST /posts/:postId/like` (auth)
- `POST /posts/:postId/comment` (auth)
- `POST /posts/:postId/view`
- `POST /posts/:postId/save` (auth)
- `GET /posts/saved/user/:userId`
- `GET /users/:id`
- `PUT /users/:id` (auth)
- `POST /users/:id/follow` (auth)
- `GET /users/:id/posts`

Notes
- This scaffold initializes an SQLite DB file `data.db` in `backend/` on first run.
- For Google Sign-In, the frontend should obtain an ID token and call `POST /auth/google` with `{ idToken }`.
- The backend issues JWT tokens for authenticated sessions; set `Authorization: Bearer <token>` when calling protected endpoints.
