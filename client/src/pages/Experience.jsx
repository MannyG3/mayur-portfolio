import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { Section, SectionHeader } from '../components/Section'

const roles = [
  {
    title: 'Lecturer & Training and Placement Officer — RIT Polytechnic Pune (Present)',
    points: [
      'Teaching core subjects: OOP in Python, Client-Side Scripting, Data Structures using Python',
      'Designing and delivering industry-oriented practical sessions to enhance employability',
      'Organizing placement drives, aptitude training, and soft-skill development sessions',
      'Managing the RedHat Lab (20 PCs, 1 router, and network infrastructure)',
      'Conducted AI-focused events showcasing real-world use of emerging tools in education',
    ],
  },
  {
    title: 'Technical Trainer & Mentor — Acumen AiTech (Past/Concurrent)',
    points: [
      'Hands-on training in UI/UX Design, Frontend Development, and JavaScript fundamentals',
      'Mentored students/professionals to build portfolio-ready apps with React and Node.js',
      'Simplified complex topics through real-world analogies and interactive problem-solving',
      'Designed custom learning paths and project-based assignments by skill level',
      'Collaborated to improve training content, evaluation structure, and engagement',
      'Promoted growth mindset, continuous upskilling, and innovation',
    ],
  },
  {
    title: 'Full Stack Developer Intern — ByteEagle Infotech (Past)',
    points: [
      'Built and deployed web apps using React.js, Node.js, Express.js, and MongoDB',
      'Developed and integrated RESTful APIs with efficient data handling',
      'Enhanced responsiveness and UX via reusable React components',
      'Worked in an agile team, contributing to sprint planning and reviews',
      'Focused on scalability, performance optimization, and clean code practices',
    ],
  },
]

export default function Experience() {
  return (
    <Section>
      <SectionHeader eyebrow="Career" title="Experience" subtitle="Roles where I built, taught, and shipped." />
      <div className="relative">
        <div className="absolute left-3 md:left-1/2 -translate-x-1/2 h-full w-px bg-slate-200 dark:bg-white/10" />
        <div className="space-y-8">
          {roles.map((r, idx) => (
            <Reveal key={r.title}>
              <div className={`grid md:grid-cols-2 gap-6 items-start ${idx % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="md:justify-self-end md:text-right">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{idx === 0 ? 'Present' : 'Past'}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">—</div>
                </div>
                <TiltCard>
                  <div className="card p-6 rounded-xl">
                    <h3 className="font-semibold">{r.title}</h3>
                    <ul className="mt-3 list-disc pl-6 text-slate-700 dark:text-slate-300">
                      {r.points.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}



