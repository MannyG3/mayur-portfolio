import { Router } from 'express'
import Message from '../models/Message.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    if (process.env.MONGODB_URI) {
      await Message.create({ name, email, message })
    }
    // Optional: integrate email service here
    res.json({ ok: true })
  } catch (err) {
    console.error('Contact error', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router




