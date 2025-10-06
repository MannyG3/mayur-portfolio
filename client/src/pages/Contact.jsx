import { useState } from 'react'
import axios from 'axios'
import TiltCard from '../components/TiltCard'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const baseUrl = import.meta.env.VITE_API_URL || ''
      await axios.post(`${baseUrl}/api/contact`, form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold">Contact</h2>
      <TiltCard>
        <form onSubmit={handleSubmit} className="mt-6 card p-6 rounded-xl max-w-xl">
          <div className="grid gap-4">
            <input required value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} placeholder="Your Name" className="input" />
            <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} placeholder="Your Email" className="input" />
            <textarea required rows={5} value={form.message} onChange={e=>setForm(f=>({...f, message: e.target.value}))} placeholder="Message" className="input" />
            <button disabled={status==='loading'} className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500 disabled:opacity-60">
              {status==='loading'?'Sending…':'Send Message'}
            </button>
            {status==='success' && <p className="text-green-500 text-sm">Thanks! I will get back to you.</p>}
            {status==='error' && <p className="text-red-500 text-sm">Something went wrong. Try again.</p>}
          </div>
        </form>
      </TiltCard>
      <div className="mt-6 text-sm">
        Or email directly: <a className="underline hover:text-brand-400" href="mailto:mayurgund3333@gmail.com">mayurgund3333@gmail.com</a>
      </div>
    </section>
  )
}



