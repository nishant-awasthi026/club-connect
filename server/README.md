# Student Union Backend

Express + Prisma (SQLite) backend with JWT auth.

## Quick start

1) Install deps

```bash
cd server
npm install
```

2) Create `.env`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-with-strong-secret"
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
```

3) Generate Prisma client and migrate

```bash
npm run prisma:generate
npm run prisma:migrate
```

4) Start dev server

```bash
npm run dev
```

Server will run at http://localhost:4000

## API

- Auth
  - POST /api/auth/signup { email, password, name, role?: STUDENT|ORGANIZER }
  - POST /api/auth/signin { email, password }

- Recruitments
  - GET /api/recruitments
  - POST /api/recruitments (Bearer token)
    - body: { title, deadline (YYYY-MM-DD), posts: string[], questions?: any, whatsappLink?: string, organizationId: number }
  - POST /api/recruitments/:id/status (Bearer token)
    - body: { status: ACTIVE|PAUSED|CLOSED }

- Applications
  - POST /api/applications/apply (Bearer token)
    - body: { recruitmentId, selectedPost, answers }
  - GET /api/applications/recruitment/:id

## Notes

- SQLite database stored at `server/prisma/dev.db` after first migrate.
- Update `FRONTEND_ORIGIN` for CORS if needed.

