import { Router } from 'express'

const router = Router()

// Static seed; replace with DB later if needed
const projects = [
  {
    title: 'AttendanceWala',
    desc: 'Comprehensive attendance management and tracking system for educational institutions with real-time reporting, student analytics, and cloud sync.',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'TailwindCSS'],
    highlights: [
      'Automated attendance recording and monthly reporting',
      'Student & teacher portal with role-based access control',
      'Live deployment available at attendencewala.vercel.app'
    ],
    link: 'https://github.com/MannyG3/AttendanceWala'
  },
  {
    title: 'Space Traffic Dashboard',
    desc: 'Real-time satellite monitoring and collision detection system with interactive world map, orbital visualization, and WebSocket updates.',
    tech: ['React', 'TypeScript', 'Node.js', 'Socket.IO', 'TailwindCSS'],
    highlights: [
      'Real-time satellite position tracking & orbit visualization',
      'Collision detection alerts for potential satellite intersections',
      'Space-Track & N2YO telemetry API integration',
      'Live deployment available at space-traffic-dashboard.vercel.app'
    ],
    link: 'https://github.com/MannyG3/space-traffic-dashboard'
  },
  {
    title: 'myfpl.ai',
    desc: 'AI-powered Fantasy Premier League manager assistant providing predictive player point modeling, transfer recommendations, and captaincy analysis.',
    tech: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'AI/LLM'],
    highlights: [
      'Predictive player points & fixture difficulty rating',
      'Optimized transfer algorithm and captaincy strategy',
      'Live deployment available at myfpl-ai.vercel.app'
    ],
    link: 'https://github.com/MannyG3/myfpl.ai'
  },
  {
    title: 'Training & Placement Portal',
    desc: 'Comprehensive T&P cell web application managing student registration, placement drives, aptitude scores, and recruiter scheduling.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    highlights: [
      'Centralized student profile and eligibility verification',
      'Automated company drive notifications and status tracking',
      'Live deployment available at t-and-p-app.vercel.app'
    ],
    link: 'https://github.com/MannyG3/T-P-Cell'
  },
  {
    title: 'Kettle',
    desc: 'Full-stack TypeScript application with PostgreSQL-backed workflow logic, typed data access layer, and production deployment.',
    tech: ['TypeScript', 'PostgreSQL', 'PLpgSQL', 'Node.js', 'Express'],
    highlights: [
      'TypeScript-first codebase for stronger type safety',
      'PostgreSQL/PLpgSQL data layer and database-side logic',
      'Live deployment available at usekettle.vercel.app'
    ],
    link: 'https://github.com/MannyG3/Kettle'
  },
  {
    title: 'Intellix AI Club Platform',
    desc: 'Official community platform for Intellix AI Club featuring event registration, hackathon leaderboards, project showcases, and student resources.',
    tech: ['JavaScript', 'React', 'Node.js', 'TailwindCSS'],
    highlights: [
      'Event registration & hackathon showcase dashboard',
      'Interactive AI resource repository for club members',
      'Live deployment available at intellixai--club.vercel.app'
    ],
    link: 'https://github.com/MannyG3/IntellixAI-Club'
  },
  {
    title: 'Fort Weather',
    desc: 'Real-time trek verdict engine assessing weather safety, rainfall warnings, and trail feasibility for popular Sahyadri forts in Maharashtra.',
    tech: ['TypeScript', 'React', 'OpenWeather API', 'TailwindCSS'],
    highlights: [
      'Sahyadri trekking fort weather safety index',
      'Micro-climate rainfall & trek feasibility alerts',
      'Open-source project on GitHub'
    ],
    link: 'https://github.com/MannyG3/fortweather'
  },
  {
    title: 'Crop & Fertilizer Recommendation System',
    desc: 'Machine learning recommendation system predicting optimal crop varieties and fertilizer ratios based on soil N-P-K nutrients and climate data.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'SQLite'],
    highlights: [
      'High accuracy Random Forest classification model',
      'Preprocessing, feature scaling, and model persistence',
      'Flask API for real-world soil inputs (N, P, K, pH, rainfall)'
    ],
    link: 'https://github.com/MannyG3/Crop-and-fertilizer-recommendation'
  },
  {
    title: 'Face Mask Detector',
    desc: 'Computer vision system detecting face mask compliance via real-time webcam streams using Haar Cascades and TensorFlow neural networks.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'NumPy'],
    highlights: [
      'Real-time webcam video stream processing',
      'Audio alerts for unmasked face detection',
      'Pre-trained deep learning classifier'
    ],
    link: 'https://github.com/MannyG3/Mask-Detector'
  }
]

router.get('/', (req, res) => {
  res.json(projects)
})

export default router



