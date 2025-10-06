import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { Section, SectionHeader } from '../components/Section'

const categories = [
  { title: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TailwindCSS', 'Bootstrap'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'Flask'] },
  { title: 'Database', items: ['MongoDB', 'SQLite', 'MySQL'] },
  { title: 'Languages', items: ['JavaScript', 'Python', 'Java (basic)'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Canva'] },
  { title: 'Other', items: ['DSA', 'REST API', 'JWT Auth', 'AI/ML basics', 'NLP', 'UI/UX'] },
]

export default function Skills() {
  return (
    <Section>
      <SectionHeader eyebrow="Capabilities" title="Skills" subtitle="Technologies and tools I use to build robust experiences." />
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <TiltCard>
              <div className="card p-6 rounded-xl">
                <h3 className="font-semibold">{c.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.items.map(i => (
                    <span key={i} className="chip !text-xs">{i}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}



