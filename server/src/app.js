import express from 'express'
import cors from 'cors'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'

const app = express()
app.use(express.json())

const corsOrigin = process.env.CORS_ORIGIN || '*'
app.use(cors({ origin: corsOrigin }))

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)

export default app




