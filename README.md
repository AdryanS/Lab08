# ✦ Indie Gen

Generate unique indie game ideas in seconds. Break creative blocks with randomized mechanics, stories, gameplay loops and AI-assisted game design.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui + Lucide icons
- **Auth:** NextAuth.js v4 (credentials + GitHub OAuth)
- **Database:** SQLite via Prisma 7 + libSQL adapter
- **State:** Zustand
- **Design:** Pencil (.pen design files in `docs/`)

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations (creates SQLite database)
npx prisma migrate dev

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth Setup

The app uses NextAuth with email/password credentials and optional OAuth.

### First run

1. Go to `/signup` and create an account
2. Log in at `/login`
3. You'll be redirected to the dashboard

### OAuth (optional)

GitHub credentials are pre-configured in `.env`. For production, replace with your own:

1. [GitHub OAuth Apps](https://github.com/settings/developers) — set callback to `http://localhost:3000/api/auth/callback/github`
2. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) — set redirect URI to `http://localhost:3000/api/auth/callback/google`

### Production

```bash
# Generate a real secret
npx auth secret
```

Update `.env`:
- `NEXTAUTH_SECRET` — strong random string
- `NEXTAUTH_URL` — your production domain
- OAuth credentials — production app IDs

## Project Structure

```
├── app/
│   ├── api/auth/       # NextAuth + signup API routes
│   ├── dashboard/      # Dashboard pages (generate, manual, saved, etc.)
│   └── login/          # Auth pages
├── components/
│   ├── auth/           # Session provider
│   ├── dashboard/      # Sidebar, cards, manual row
│   └── ui/             # shadcn components (Select, etc.)
├── lib/
│   ├── auth.ts         # NextAuth configuration
│   └── prisma.ts       # Prisma client
├── store/
│   └── idea-store.ts   # Zustand store for game ideas
├── prisma/
│   └── schema.prisma   # User model
├── docs/
│   └── random.pen      # Design file (open with Pencil)
└── proxy.ts            # Route protection
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database browser |
| `npx prisma migrate dev` | Run database migrations |

## Design

Design files are in `docs/` as `.pen` files. Open them with [Pencil](https://pencil.design) to view screens and components.
