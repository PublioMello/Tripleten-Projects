# News Explorer API

Backend REST API for the News Explorer project (TripleTen React/API stage 2). Express + MongoDB, with cookie-based JWT authentication.

## Tech Stack

- Node.js / Express 5
- MongoDB / Mongoose
- JSON Web Tokens (httpOnly cookie)
- bcryptjs for password hashing
- celebrate/Joi for request validation
- winston for JSON request/error logging

## Data Models

- **user** — `email` (unique, validated), `password` (hashed, hidden from responses), `name` (2–30 chars).
- **article** — `keyword`, `title`, `text`, `date`, `source`, `link` (URL), `image` (URL), `owner` (hidden from responses, used to scope/authorize).

## Routes

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/signup` | public | Create a user |
| POST | `/signin` | public | Log in, sets the `jwt` httpOnly cookie |
| POST | `/signout` | public | Clears the `jwt` cookie |
| GET | `/users/me` | required | Current user's email and name |
| GET | `/articles` | required | Articles saved by the current user |
| POST | `/articles` | required | Save an article |
| DELETE | `/articles/:articleId` | required | Delete an article owned by the current user (403 if not the owner) |

## Getting Started

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, CLIENT_ORIGIN
npm run dev             # nodemon, auto-reload
# or
npm start                # production mode
```

In development, `NODE_ENV !== 'production'` so the server runs and signs JWTs with a
built-in fallback secret even without a `.env` file. `MONGODB_URI` still needs to point
at a reachable MongoDB instance (e.g. a free MongoDB Atlas cluster).

## Logging

`request.log` and `error.log` are written in JSON at the project root and are git-ignored.

## Environment Variables

See `.env.example`. In production, set at minimum:

```
NODE_ENV=production
JWT_SECRET=<long random string>
MONGODB_URI=<Atlas connection string>
CLIENT_ORIGIN=https://your-frontend-domain
```

## Deployment

Public domain: _add your server's domain here once deployed (e.g. `https://api.your-domain.com`)_.
