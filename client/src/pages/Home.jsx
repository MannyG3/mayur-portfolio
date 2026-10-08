import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { dailyQuotes, education, experience, profile, projects, recentSong, skillGroups, socialLinks } from '../data/portfolio'
import EditorialWidgets from '../components/EditorialWidgets'
import { EmptyReferenceSection, GithubActivity } from '../components/ReferenceExtras'
import { playClickSound } from '../utils/sound'

function ExternalArrow() {
  return <span aria-hidden className="editorial-arrow">↗</span>
}

function TechIcon({ name }) {
  const n = name.toLowerCase()
  if (n.includes('react')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#61dafb]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.5" />
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    )
  }
  if (n.includes('claude')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#d97757]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    )
  }
  if (n.includes('cursor')) {
    return (
      <svg className="w-3.5 h-3.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    )
  }
  if (n.includes('chatgpt') || n.includes('openai')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9 6.06 6.06 0 0 0-10.27 2.17 5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9 5.98 5.98 0 0 0 4.28 1.91 6.05 6.05 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.75-7.08zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.65-4.1a4.48 4.48 0 0 1-.54-3.01l.14.08 4.78 2.76a.79.79 0 0 0 .79 0l5.83-3.37v2.33a.08.08 0 0 1-.03.06l-4.84 2.79a4.5 4.5 0 0 1-6.14-1.65zm-1.26-9.73a4.5 4.5 0 0 1 2.37-1.97v.17l0 5.51a.79.79 0 0 0 .39.68l5.83 3.37-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79a4.5 4.5 0 0 1-1.66-6.14zm16.6 3.86l-5.83-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.65 8.11v-.17l0-5.51a.79.79 0 0 0-.44-.69zm2.15-4.55a4.48 4.48 0 0 1 .53 3.01l-.14-.08-4.78-2.76a.79.79 0 0 0-.79 0l-5.83 3.37V9.12a.08.08 0 0 1 .03-.06l4.84-2.79a4.5 4.5 0 0 1 6.14 1.65zm-10.36 1.07l.01 6.74-2.02-1.17a.07.07 0 0 1-.04-.05V8.38a4.5 4.5 0 0 1 7.37-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.4.68z" />
      </svg>
    )
  }
  if (n.includes('gemini')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#8e75ff]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
      </svg>
    )
  }
  if (n.includes('python')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#3776ab]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.92 0C5.56 0 5.93 2.76 5.93 2.76l.01 2.86h6.07v.86H3.64S0 6.06 0 12.46c0 6.4 3.17 6.16 3.17 6.16h1.9v-2.66s-.11-3.17 3.17-3.17h5.24s3.02.05 3.02-2.95V3.64S18.58 0 11.92 0z" />
      </svg>
    )
  }
  if (n.includes('node')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#539e43]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm-1 18.5l-6.5-3.8v-7.5L11 13v7.5zm2 0V13l6.5-3.8v7.5L13 20.5z" />
      </svg>
    )
  }
  if (n.includes('tailwind')) {
    return (
      <svg className="w-3.5 h-3.5 text-[#06b6d4]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-3.3 0-5.5 1.7-6.6 4.9 1.1-1.6 2.5-2.2 4.1-1.6 1 .4 1.7 1.1 2.5 1.9 1.3 1.3 2.8 2.8 6.6 2.8 3.3 0 5.5-1.7 6.6-4.9-1.1 1.6-2.5 2.2-4.1 1.6-1-.4-1.7-1.1-2.5-1.9-1.3-1.3-2.8-2.8-6.6-2.8z" />
      </svg>
    )
  }
  if (n.includes('typescript') || n.includes('javascript')) {
    return (
      <span className="font-mono text-[9px] font-bold text-brand px-1 py-0.2 rounded bg-brand/10">JS</span>
    )
  }
  if (n.includes('git') || n.includes('github')) {
    return (
      <svg className="w-3.5 h-3.5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  }
  return <span className="text-[10px]" aria-hidden>⚡</span>
}

function SectionTitle({ children, id }) {
  return <h2 id={id} className="text-base font-medium text-foreground tracking-tight">{children}</h2>
}

function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <section aria-labelledby="projects-title" className="editorial-section">
      <SectionTitle id="projects-title">Projects</SectionTitle>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-6 items-start">
        <ul className="editorial-list space-y-1.5">
          {projects.map((project, index) => {
            const isActive = activeProject.title === project.title
            return (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-200/70 dark:bg-neutral-800/80 p-3.5 border border-border/60 shadow-sm'
                    : 'p-3 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 border border-transparent'
                }`}
                onMouseEnter={() => {
                  if (activeProject.title !== project.title) {
                    setActiveProject(project)
                    playClickSound()
                  }
                }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block group"
                  onClick={playClickSound}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-medium transition-colors ${isActive ? 'text-brand font-semibold' : 'text-foreground group-hover:text-brand'}`}>
                        {project.title}
                      </span>
                      {project.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 border border-brand/25 px-2 py-0.5 text-[10px] font-mono text-brand font-normal">
                          ⚡ {project.badge}
                        </span>
                      )}
                    </div>
                    <ExternalArrow />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="editorial-tags mt-2">
                    {project.tech.map(t => (
                      <span key={t} className="chip-btn py-0.5 px-2 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </motion.li>
            )
          })}
        </ul>

        {/* Side Hover Preview Card matching ashishgogula.in screenshot */}
        <div className="hidden lg:block sticky top-20">
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-border bg-card shadow-card p-2 overflow-hidden"
          >
            {/* Top Main Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-900 border border-border/40">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Sub Preview Mockup Grid */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-800 border border-border/40">
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} preview 1`}
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-800 border border-border/40 grid place-items-center p-2 text-center">
                <span className="font-mono text-[10px] text-muted-foreground truncate">
                  {activeProject.badge || activeProject.title}
                </span>
              </div>
            </div>

            {/* Bottom Domain Link Bar */}
            <a
              href={activeProject.link}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-muted/40 hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="truncate">{activeProject.domain || 'github.com/MannyG3'}</span>
              <ExternalArrow />
            </a>
          </motion.div>
        </div>
      </div>

      <Link to="/projects" className="editorial-more" onClick={playClickSound}>
        more projects <ExternalArrow />
      </Link>
    </section>
  )
}

function ExperienceRow({ role, index }) {
  return (
    <motion.details
      open={index === 0}
      className="editorial-row editorial-experience"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onClick={playClickSound}
    >
      <summary className="editorial-row-link editorial-experience-summary">
        <div>
          <div className="editorial-row-heading">
            <span className="editorial-row-title">{role.title} · {role.company}</span>
            <span className="editorial-plus" aria-hidden>+</span>
          </div>
          <p className="editorial-row-meta">{role.period}</p>
        </div>
      </summary>
      <ul className="editorial-detail-list">
        {role.points.map(point => <li key={point}>{point}</li>)}
      </ul>
    </motion.details>
  )
}

function EducationRow({ edu, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="editorial-row py-4"
    >
      <div className="editorial-row-heading">
        <span className="editorial-row-title">{edu.institution}</span>
      </div>
      <p className="editorial-row-description font-medium text-foreground">{edu.degree}</p>
      <div className="flex items-center gap-3 mt-1.5 font-mono text-[11px] text-muted-foreground">
        <span>{edu.period}</span>
        {edu.grade && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground font-semibold">Grade: {edu.grade}</span>
        )}
      </div>
      {edu.skills && edu.skills.length > 0 && (
        <div className="editorial-tags mt-2.5">
          {edu.skills.map(s => (
            <span key={s} className="chip-btn py-0.5 px-2 text-[10px]">
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.li>
  )
}

export default function Home() {
  return (
    <div className="editorial-home">
      <header className="editorial-intro">
        <div>
          <h1>{profile.name}</h1>
          <p className="editorial-role">{profile.title}</p>
        </div>
        <div className="editorial-current">
          <p>{profile.about} {profile.current}</p>
        </div>
        <a className="editorial-email" href={`mailto:${profile.email}`} onClick={playClickSound}>
          {profile.email}
          <ExternalArrow />
        </a>
        <p className="editorial-location">{profile.location}</p>
      </header>

      <EditorialWidgets song={recentSong} />

      <ProjectsSection projects={projects} />

      <section aria-labelledby="experience-title" className="editorial-section">
        <SectionTitle id="experience-title">Experience</SectionTitle>
        <ul className="editorial-list">
          {experience.map((role, index) => <ExperienceRow key={role.title} role={role} index={index} />)}
        </ul>
        <Link to="/experience" className="editorial-more" onClick={playClickSound}>more experience <ExternalArrow /></Link>
      </section>

      <section aria-labelledby="education-title" className="editorial-section">
        <SectionTitle id="education-title">Education</SectionTitle>
        <ul className="editorial-list">
          {education.map((edu, index) => <EducationRow key={edu.institution} edu={edu} index={index} />)}
        </ul>
      </section>

      <section aria-labelledby="stack-title" className="editorial-section">
        <SectionTitle id="stack-title">Tech stack</SectionTitle>
        <div className="editorial-stack space-y-6 mt-5">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div key={group} className="editorial-stack-group">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {group}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {skills.map(skill => {
                  const name = typeof skill === 'string' ? skill : skill.name
                  const href = typeof skill === 'object' ? skill.href : undefined
                  return (
                    <li key={name}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={playClickSound}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-mono font-medium text-foreground transition-all duration-200 hover:border-brand/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 hover:text-brand hover:-translate-y-0.5 shadow-sm"
                        >
                          <TechIcon name={name} />
                          <span>{name}</span>
                          <span className="text-[9px] opacity-40 group-hover:opacity-100">↗</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-mono font-medium text-foreground transition-all duration-200 hover:border-brand/40 hover:text-brand">
                          <TechIcon name={name} />
                          <span>{name}</span>
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/skills" className="editorial-more" onClick={playClickSound}>all skills <ExternalArrow /></Link>
      </section>

      <GithubActivity username={profile.githubUsername} />

      <section className="editorial-quote" aria-label="Quote of the day">
        {(() => {
          const dayNumber = Math.floor(Date.now() / 86400000)
          const quote = dailyQuotes[dayNumber % dailyQuotes.length]
          return (
            <>
              <p>“{quote.text}”</p>
              <span>— {quote.author}, {quote.work}</span>
            </>
          )
        })()}
      </section>

      <section aria-labelledby="contact-title" className="editorial-section editorial-contact">
        <SectionTitle id="contact-title">Contact</SectionTitle>
        <p>{profile.current}</p>
        <Link to="/contact" className="editorial-email" onClick={playClickSound}>Send a message <ExternalArrow /></Link>
      </section>

      <footer className="editorial-socials" aria-label="Social links">
        {socialLinks.map(link => (
          <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} onClick={playClickSound}>
            {link.label}
          </a>
        ))}
      </footer>

      <nav className="editorial-more-nav" aria-label="More pages">
        <span>More</span>
        <Link to="/about" onClick={playClickSound}>About</Link>
        <Link to="/projects" onClick={playClickSound}>Projects</Link>
        <Link to="/experience" onClick={playClickSound}>Experience</Link>
        <Link to="/skills" onClick={playClickSound}>Skills</Link>
        <Link to="/contact" onClick={playClickSound}>Contact</Link>
      </nav>
    </div>
  )
}
