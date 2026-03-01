import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SilkBackground from '../silk-background/SilkBackground'
import './HeroSection.css'

// Rotating banner titles – state variable demo
const HERO_SLIDES = [
  {
    eyebrow: 'Chapter 14 — A Pale Flame',
    title: 'DEFEND THE\nFUTURE',
    subtitle: 'Command elite Operators in a world threatened by Originium. Build your base, forge your strategy.',
    cta: 'Play Free Now',
    ctaLink: 'https://arknights.global/',
    tag: 'New Chapter',
  },
  {
    eyebrow: 'Operations Archive — Lone Trail',
    title: 'TRUTH IN\nSILENCE',
    subtitle: 'Saria and Ifrit face the ruins of the past. Uncover what the glaciers have hidden for centuries.',
    cta: 'View Operators',
    ctaLink: '/operators',
    tag: 'Event',
  },
  {
    eyebrow: 'New Operator — Logos',
    title: 'SOVEREIGN\nOF LOGIC',
    subtitle: 'A philosopher who wields the power of logos — reason made manifest. Rationality as a weapon.',
    cta: 'Learn More',
    ctaLink: '/operators',
    tag: 'New Operator',
  },
]

// HeroSection – receives no required props; uses internal state for slide rotation
function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((activeSlide + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [activeSlide])

  const goToSlide = (index) => {
    if (index === activeSlide) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveSlide(index)
      setIsAnimating(false)
    }, 300)
  }

  const slide = HERO_SLIDES[activeSlide]

  return (
    <section className="hero">
      {/* Animated silk canvas background */}
      <SilkBackground speed={3} scale={1.2} color="#e8d48b" noiseIntensity={1.2} />

      {/* Grid overlay */}
      <div className="hero__grid-overlay" />

      {/* Side accent bar */}
      <div className="hero__side-bar" />

      <div className="hero__content container">
        <div className={`hero__text ${isAnimating ? 'hero__text--exit' : 'hero__text--enter'}`}>
          <div className="hero__eyebrow">
            <span className="hero__tag">{slide.tag}</span>
            <span className="hero__eyebrow-text">{slide.eyebrow}</span>
          </div>

          <h1 className="hero__title">
            {slide.title.split('\n').map((line, i) => (
              <span key={i} className="hero__title-line">{line}</span>
            ))}
          </h1>

          <p className="hero__subtitle">{slide.subtitle}</p>

          <div className="hero__actions">
            {slide.ctaLink.startsWith('http') ? (
              <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {slide.cta}
              </a>
            ) : (
              <Link to={slide.ctaLink} className="btn-primary">{slide.cta}</Link>
            )}
            <Link to="/operators" className="btn-secondary">Meet the Operators</Link>
          </div>
        </div>

        {/* Operator silhouette art placeholder */}
        <div className="hero__art">
          <div className="hero__art-frame">
            <div className="hero__art-inner">
              <div className="hero__art-placeholder">
                <svg viewBox="0 0 200 280" className="hero__operator-svg">
                  <defs>
                    <linearGradient id="opGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e8d48b" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                  {/* Stylized operator silhouette */}
                  <circle cx="100" cy="55" r="28" fill="none" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  <line x1="100" y1="83" x2="100" y2="130" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  <line x1="100" y1="100" x2="60" y2="130" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  <line x1="100" y1="100" x2="140" y2="130" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  <line x1="100" y1="130" x2="80" y2="190" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  <line x1="100" y1="130" x2="120" y2="190" stroke="url(#opGrad)" strokeWidth="1.5"/>
                  {/* Hexagon details */}
                  <polygon points="100,15 115,23 115,39 100,47 85,39 85,23" fill="none" stroke="#e8d48b" strokeWidth="0.8" opacity="0.7"/>
                  <text x="100" y="275" textAnchor="middle" fill="#e8d48b" fontSize="10" fontFamily="Orbitron" opacity="0.6" letterSpacing="3">OPERATOR</text>
                </svg>
              </div>
              <div className="hero__art-glow" />
            </div>
          </div>
          {/* Stat bars – cosmetic UI */}
          <div className="hero__stats">
            {[
              { label: 'ATK', value: 92 },
              { label: 'DEF', value: 67 },
              { label: 'HP', value: 78 },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-label">{stat.label}</span>
                <div className="hero__stat-bar">
                  <div className="hero__stat-fill" style={{ width: `${stat.value}%` }} />
                </div>
                <span className="hero__stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide navigation */}
      <div className="hero__nav">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`hero__nav-dot ${index === activeSlide ? 'hero__nav-dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom decorative ticker */}
      <div className="hero__ticker">
        <div className="hero__ticker-inner">
          {Array(4).fill('ARKNIGHTS · DEFEND THE FUTURE · ORIGINIUM CRISIS · OPERATORS UNITE · ').join('')}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
