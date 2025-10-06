import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || ''

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI not set. Continuing without DB connection (projects will be static).')
    } else {
      await mongoose.connect(MONGODB_URI)
      console.log('Connected to MongoDB')
    }

    const server = http.createServer(app)
    server.listen(PORT, () => console.log(`API listening on :${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()




