# Mayur Gund — MERN Portfolio

Modern portfolio for Mayur Gund (Full Stack Developer, Educator, AI Enthusiast) built with MERN, TailwindCSS, and Framer Motion.

## Tech
- Frontend: React (Vite), TailwindCSS, React Router, Framer Motion, react-helmet-async
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Deployment: Vercel (client), Render/Railway (server), MongoDB Atlas

## Local Development

### Prerequisites
- Node 18+
- Yarn or npm
- MongoDB Atlas URI (optional; APIs work with static data without DB)

### Setup

1. Frontend
```bash
cd client
npm install
npm run dev
```

2. Backend
```bash
cd server
npm install
# copy env and fill values
# Windows PowerShell:
copy .env.example .env
npm run dev
```

3. Configure frontend to call backend (optional if same origin)
Create `client/.env` and set:
```env
VITE_API_URL=http://localhost:8080
```

## Deployment

### Frontend (Vercel)
- Framework: Vite
- Build Command: `npm run build`
- Output Dir: `dist`
- Env: `VITE_API_URL` set to your server URL
 - Optional config: `client/vercel.json` handles SPA routing

### Backend (Render/Railway)
- Start Command: `npm start`
- Env: `MONGODB_URI`, `CORS_ORIGIN` (e.g., your Vercel domain)
 - Render blueprint: `server/render.yaml`

## API
- GET `/api/projects` → list projects
- POST `/api/contact` → `{ name, email, message }`

## License
MIT
