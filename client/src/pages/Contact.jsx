import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import TiltCard from '../components/TiltCard'

const CONTACT_METHODS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'mayurgund3333@gmail.com',
    href: 'mailto:mayurgund3333@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://linkedin.com/in/mayurgund',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'View my code',
    href: 'https://github.com/MannyG3',
  },
]

function InputField({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {props.type === 'textarea' ? (
        <textarea
          {...props}
          className="w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
        />
      ) : (
        <input
          {...props}
          className="w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
        />
      )}
    </div>
  )
}

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
    <section className="py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-neon-cyan border border-cyan-400/30 mb-4">
          Get in Touch
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Let's Build Something
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <TiltCard>
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 hover-glow-cyan transition-all"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                Send a Message
              </h2>

              <div className="space-y-5">
                <InputField
                  label="Your Name"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
                <InputField
                  label="Message"
                  type="textarea"
                  rows={5}
                  placeholder="Tell me about your project or just say hi..."
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:shadow-glow-cyan disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-600 dark:text-emerald-400 text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Thanks! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-600 dark:text-red-400 text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </div>
            </form>
          </TiltCard>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
            Other Ways to Connect
          </h2>

          {CONTACT_METHODS.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="block glass rounded-xl p-4 border border-slate-200/80 dark:border-white/10 hover-glow-magenta hover:border-fuchsia-400/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 group-hover:text-fuchsia-500 transition-colors">
                  {method.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                    {method.label}
                  </div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                    {method.value}
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-slate-400 group-hover:text-fuchsia-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-xl p-4 border border-emerald-400/30 bg-emerald-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Currently Available
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Open for freelance and full-time roles
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
