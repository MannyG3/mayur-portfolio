import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { SectionHeader, StatusDot } from '../components/Section'

const CONTACT_METHODS = [
  {
    label: 'Email',
    value: 'mayurgund3333@gmail.com',
    href: 'mailto:mayurgund3333@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'mayurgund99',
    href: 'https://linkedin.com/in/mayurgund99',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'MannyG3',
    href: 'https://github.com/MannyG3',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

function InputField({ label, ...props }) {
  const isTextarea = props.type === 'textarea'
  const className = 'input-field'
  return (
    <div>
      <label className="block text-sm font-display tracking-wide text-ink-muted dark:text-surface-300 mb-2">{label}</label>
      {isTextarea ? (
        <textarea {...props} className={`${className} resize-none`} />
      ) : (
        <input {...props} className={className} />
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
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <SectionHeader
          label="contact"
          title="A letter awaits."
          subtitle="Whether you have a project in mind or simply wish to converse — I shall endeavour to reply within a day."
          align="center"
        />
        <div className="flex justify-center mt-2">
          <StatusDot label="Accepting correspondence" />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="surface-card p-7 md:p-10 corner-brackets">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-surface-50 mb-8 flex items-center gap-2">
              <span className="text-accent italic">Compose</span>
            </h2>

            <div className="space-y-6">
              <InputField
                label="Your name"
                placeholder="How shall I address you?"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <InputField
                label="Your email"
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <InputField
                label="Your message"
                type="textarea"
                rows={6}
                placeholder="Pray, tell me of your endeavour..."
                required
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />

              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                {status === 'loading' ? (
                  <>
                    <div className="h-4 w-4 border-2 border-surface-50 border-t-transparent rounded-full animate-spin" />
                    Dispatching…
                  </>
                ) : (
                  <>
                    Send correspondence
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-4 border border-accent/30 bg-accent-muted text-accent text-sm font-display italic">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Your letter has been received. I shall reply shortly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-4 border border-burgundy/30 bg-burgundy-muted text-burgundy-light text-sm font-display italic">
                  Something went awry. Kindly try again or write directly.
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="font-display text-xs tracking-widest uppercase text-ink-faint dark:text-surface-500 mb-5">
            Direct channels
          </h2>

          {CONTACT_METHODS.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="accent-card flex items-center gap-4 p-5 group"
            >
              <div className="h-10 w-10 bg-surface-200/60 dark:bg-surface-800 border border-surface-300/70 dark:border-surface-700 flex items-center justify-center text-ink-muted dark:text-surface-400 group-hover:text-accent transition-colors duration-300">
                {method.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-[10px] tracking-widest uppercase text-ink-faint dark:text-surface-500">{method.label}</div>
                <div className="text-sm font-medium text-ink dark:text-surface-200 truncate group-hover:text-accent transition-colors duration-300">{method.value}</div>
              </div>
              <span className="text-accent/40 group-hover:text-accent transition-colors duration-300">→</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
