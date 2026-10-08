import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { dailyQuotes, experience, profile, projects, recentSong, skillGroups, socialLinks } from '../data/portfolio'
import EditorialWidgets from '../components/EditorialWidgets'
import { Arcade, EmptyReferenceSection, GithubActivity, MusicPlaceholder } from '../components/ReferenceExtras'

function ExternalArrow() {
  return <span aria-hidden className="editorial-arrow">↗</span>
}

function SectionTitle({ children }) {
  return <h2 className="editorial-section-title">{children}</h2>
}

function ProjectRow({ project, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="editorial-row"
    >
      <a href={project.link} target="_blank" rel="noreferrer" className="editorial-row-link">
        <div className="editorial-row-heading">
          <span className="editorial-row-title">{project.title}</span>
          <ExternalArrow />
        </div>
        <p className="editorial-row-description">{project.desc}</p>
        <div className="editorial-tags">
          {project.tech.map(technology => <span key={technology}>{technology}</span>)}
        </div>
      </a>
    </motion.li>
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

export default function Home() {
  return (
    <div className="editorial-home">
      <header className="editorial-intro">
        <div>
          <h1>{profile.name}</h1>
          <p className="editorial-role">{profile.title}</p>
        </div>
        <div className="editorial-current">
          <h2>Currently</h2>
          <p>{profile.about} {profile.current}</p>
        </div>
        <a className="editorial-email" href={`mailto:${profile.email}`}>
          {profile.email}
          <ExternalArrow />
        </a>
        <p className="editorial-location">{profile.location}</p>
      </header>

      <EditorialWidgets song={recentSong} />

      <section aria-labelledby="projects-title" className="editorial-section">
        <SectionTitle><span id="projects-title">Projects</span></SectionTitle>
        <ul className="editorial-list">
          {projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}
        </ul>
        <Link to="/projects" className="editorial-more">more projects <ExternalArrow /></Link>
      </section>

      <section aria-labelledby="experience-title" className="editorial-section">
        <SectionTitle><span id="experience-title">Experience</span></SectionTitle>
        <ul className="editorial-list">
          {experience.map((role, index) => <ExperienceRow key={role.title} role={role} index={index} />)}
        </ul>
        <Link to="/experience" className="editorial-more">more experience <ExternalArrow /></Link>
      </section>

      <section aria-labelledby="stack-title" className="editorial-section">
        <SectionTitle><span id="stack-title">Tech stack</span></SectionTitle>
        <div className="editorial-stack">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div key={group} className="editorial-stack-group">
              <h3>{group}</h3>
              <ul>
                {skills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/skills" className="editorial-more">all skills <ExternalArrow /></Link>
      </section>

      <EmptyReferenceSection title="Blogs" description="No blog posts are currently listed in this portfolio." action="Add posts in the portfolio data file" />
      <EmptyReferenceSection title="Achievements" description="No achievements are currently listed in this portfolio." action="Add achievements in the portfolio data file" />
      <EmptyReferenceSection title="Resources" description="No reading or resource links are currently listed in this portfolio." action="Add resources in the portfolio data file" />
      <EmptyReferenceSection title="Experiments" description="No experiments or renders are currently listed in this portfolio." action="Add experiments in the portfolio data file" />
      <GithubActivity username={profile.githubUsername} />
      <Arcade />

      <section className="editorial-section editorial-quote" aria-label="Quote of the day">
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
        <SectionTitle><span id="contact-title">Contact</span></SectionTitle>
        <p>{profile.current}</p>
        <Link to="/contact" className="editorial-email">Send a message <ExternalArrow /></Link>
      </section>

      <nav className="editorial-socials" aria-label="Social links">
        {socialLinks.map(link => (
          <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>{link.label}</a>
        ))}
      </nav>

      <MusicPlaceholder />

      <nav className="editorial-more-nav" aria-label="More pages">
        <span>More</span>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  )
}
