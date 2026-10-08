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
        <div className="editorial-stack">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div key={group} className="editorial-stack-group">
              <h3>{group}</h3>
              <ul>
                {skills.map(skill => (
                  <li key={skill}>
                    <span className="chip-btn">
                      {skill}
                    </span>
                  </li>
                ))}
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
