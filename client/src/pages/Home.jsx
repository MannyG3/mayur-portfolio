import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TiltCard from '../components/TiltCard'
import { Badge } from '../components/Section'

export default function Home() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            Mayur Gund
          </motion.h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>Full Stack</Badge>
            <Badge>Educator</Badge>
            <Badge>AI Enthusiast</Badge>
          </div>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            <span className="bg-gradient-to-r from-brand-600 to-brand-300 bg-clip-text text-transparent font-semibold">Full Stack Developer</span> · Educator · AI Enthusiast
          </p>
          <p className="mt-6">
            Passionate about building scalable web apps and mentoring developers. Open to full-time roles and mentoring opportunities.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="mailto:mayurgund3333@gmail.com" className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500">Let’s Collaborate</a>
            <Link to="/projects" className="btn-outline">View Projects</Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.25),transparent_60%)] blur-2xl" />
          <TiltCard>
            <div className="card rounded-2xl p-6 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-400 to-indigo-400 blur opacity-30" />
                <img src="/profile.jpg" alt="Mayur Gund" loading="lazy" className="relative z-[1] h-44 w-44 md:h-56 md:w-56 rounded-full object-cover border-4 border-white dark:border-white/10 shadow-xl" onError={(e)=>{e.currentTarget.style.display='none'}} />
                <div className="relative z-[1] h-44 w-44 md:h-56 md:w-56 rounded-full grid place-items-center text-sm text-slate-500 dark:text-slate-400" style={{display:'none'}}>
                  MG
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 w-full">
                <span className="chip">MERN Stack</span>
                <span className="chip">Python</span>
                <span className="chip">DSA</span>
                <span className="chip">Mentorship</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}



