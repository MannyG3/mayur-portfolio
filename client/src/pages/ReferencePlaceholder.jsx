import { Link } from 'react-router-dom'

export default function ReferencePlaceholder({ title, description }) {
  return (
    <section className="editorial-home editorial-placeholder-page">
      <Link to="/" className="editorial-more">← back home</Link>
      <header className="editorial-intro">
        <h1>{title}</h1>
        <p className="editorial-role">{description}</p>
      </header>
      <div className="editorial-section editorial-empty">
        <p>This section is not populated in the current portfolio data.</p>
        <Link to="/contact" className="editorial-more">contact Mayur <span aria-hidden>↗</span></Link>
      </div>
    </section>
  )
}
