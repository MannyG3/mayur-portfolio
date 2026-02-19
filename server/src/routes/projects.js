import { Router } from 'express'

const router = Router()

// Static seed; replace with DB later if needed
const projects = [
  {
    title: 'Kettle',
    desc: 'Full-stack TypeScript application with PostgreSQL-backed logic and a production deployment.',
    tech: ['TypeScript', 'PostgreSQL', 'PLpgSQL', 'CSS', 'JavaScript'],
    highlights: [
      'TypeScript-first codebase for stronger type safety',
      'PostgreSQL/PLpgSQL data layer and database-side logic',
      'Live deployment available at usekettle.vercel.app'
    ],
    link: 'https://github.com/MannyG3/Kettle'
  },
  {
    title: 'Space Traffic Dashboard',
    desc: 'Real-time satellite monitoring and collision detection with live geospatial visualization.',
    tech: ['React.js', 'Node.js', 'Express.js', 'Socket.IO', 'Leaflet.js', 'TailwindCSS', 'MongoDB', 'Framer Motion'],
    highlights: [
      'Socket.IO real-time satellite position tracking',
      'React Leaflet orbit visualization and proximity detection',
      'Collision detection alerts for potential intersections',
      'Integrated Space-Track/N2YO telemetry APIs',
      'Modular Node.js backend with scheduled updates',
      'Deployed on Vercel (client) and Render (server)'
    ],
    link: 'https://github.com/MannyG3/space-traffic-dashboard'
  },
  {
    title: 'Crop & Fertilizer Recommendation System',
    desc: 'ML-powered recommendations for optimal crop and fertilizer based on soil and climate.',
    tech: ['Python', 'scikit-learn', 'pandas', 'Flask', 'SQLite', 'joblib'],
    highlights: [
      'Trained scikit-learn models for crop and fertilizer prediction',
      'Preprocessing, feature scaling, and model persistence with joblib',
      'Flask API for real-world inputs (N, P, K, humidity, temperature)',
      'Modular pipelines designed for reuse and future scale'
    ],
    link: 'https://github.com/MannyG3/Crop-and-fertilizer-recommendation'
  },
  {
    title: 'Pokémon Search App',
    desc: 'Vanilla JS app to explore Pokémon via PokéAPI with responsive UI and error handling.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    highlights: [
      'PokéAPI integration for stats, images, and attributes',
      'Async fetch with robust error states',
      'Deployed on Vercel; planned comparisons and favorites'
    ],
    link: 'https://github.com/MannyG3/Pok-mon-Search-App'
  }
]

router.get('/', (req, res) => {
  res.json(projects)
})

export default router



