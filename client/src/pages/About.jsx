import { Section, SectionHeader, Badge } from '../components/Section'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'

export default function About() {
  return (
    <Section>
      <SectionHeader eyebrow="Introduction" title="About" subtitle="A brief on my journey and interests." />
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Reveal>
          <p className="max-w-prose text-slate-700 dark:text-slate-300">
            Passionate Computer Engineer and Full Stack Developer skilled in MERN Stack, Data Structures & Algorithms, and Python. Experienced in teaching programming and guiding students as a lecturer and mentor. Adept at building scalable web applications, integrating AI tools, and delivering hands-on learning experiences.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <TiltCard>
            <div className="card p-6 rounded-xl">
              <div className="text-sm font-semibold mb-3">Focus Areas</div>
              <div className="flex flex-wrap gap-2">
                <Badge>Full Stack</Badge>
                <Badge>AI Integrations</Badge>
                <Badge>Mentorship</Badge>
                <Badge>UI/UX</Badge>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  )
}



