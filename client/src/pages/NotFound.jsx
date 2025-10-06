import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block mt-6 px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500">Back Home</Link>
    </section>
  )
}



