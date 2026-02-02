# Mayur Gund - MERN Portfolio

Modern developer portfolio built with MERN, TailwindCSS, and Framer Motion.

## Overview
- Frontend: React (Vite), TailwindCSS, React Router, Framer Motion, react-helmet-async
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Deployment targets: Vercel (client), Render or Railway (server), MongoDB Atlas

## Project structure
```text
client/   Vite React app
server/   Express API
```

## Local Development

### Prerequisites
- Node 18+
- npm or Yarn
- MongoDB connection string (optional; APIs can run with static data without a database)

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

3. Configure the frontend to call the backend (optional)

Create `client/.env`:
```env
VITE_API_URL=http://localhost:8080
```

## Scripts

### Client
```bash
npm run dev
npm run build
npm run preview
```

### Server
```bash
npm run dev
npm start
```

## Deployment

### Frontend (Vercel)
- Root directory: `client`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: set `VITE_API_URL` to your server URL (optional)
- SPA routing: `client/vercel.json`

### Backend (Render or Railway)
- Root directory: `server`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `CORS_ORIGIN` (for example, your Vercel domain)
- Render blueprint: `server/render.yaml`

## API
- GET `/api/projects` returns a list of projects
- POST `/api/contact` accepts:
  - `name`
  - `email`
  - `message`

## License
MIT
