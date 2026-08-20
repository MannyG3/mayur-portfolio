import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
]

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center h-9 w-9 border border-surface-300/80 dark:border-surface-700 text-ink-muted dark:text-surface-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState('/profile.png')

  const linkClass = ({ isActive }) =>
    `nav-link px-1 py-2 ${isActive ? 'active' : ''}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-surface-300/70 dark:border-surface-800/80 bg-surface-100/90 dark:bg-surface-950/90 backdrop-blur-md">
        <div className="container flex items-center justify-between h-[4.5rem]">
          <NavLink to="/" className="flex items-center gap-4 group">
            <div className="portrait-frame h-10 w-10 overflow-hidden group-hover:border-accent/40 transition-all duration-300">
              <img
                src={avatarSrc}
                alt="Mayur Gund"
                className="h-full w-full object-cover sepia-[0.15] group-hover:sepia-0 transition-all duration-500"
                onError={() => setAvatarSrc('/profile.svg')}
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-semibold tracking-wide text-ink dark:text-surface-50">Mayur Gund</span>
              <span className="block font-display text-xs italic text-ink-faint dark:text-surface-500">Full Stack Developer</span>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
            <NavLink to="/contact" className="btn-primary text-xs px-5 py-2">
              Contact
            </NavLink>
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden inline-flex items-center justify-center h-9 w-9 border border-surface-300 dark:border-surface-700 text-ink-muted dark:text-surface-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                {mobileOpen ? (
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-surface-300 dark:border-surface-800 bg-surface-100 dark:bg-surface-950 overflow-hidden"
          >
            <nav className="container py-5 flex flex-col gap-1">
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-display text-sm text-ink-muted dark:text-surface-300 hover:text-accent transition-colors">Home</NavLink>
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 font-display text-sm text-ink-muted dark:text-surface-300 hover:text-accent transition-colors">{label}</NavLink>
              ))}
              <div className="pt-4 px-3 flex items-center justify-between border-t border-surface-300/60 dark:border-surface-800 mt-2">
                <span className="text-xs font-display italic text-ink-faint">Theme</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
