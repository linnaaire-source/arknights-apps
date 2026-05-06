import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.css'

// Header – main navigation bar with logo and responsive hamburger menu
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu  = () => setIsMenuOpen(false)

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <svg viewBox="0 0 60 60" width="40" height="40" className="header__logo-icon">
            <polygon points="30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5" fill="none" stroke="#e8d48b" strokeWidth="2"/>
            <polygon points="30,13 47,22 47,38 30,47 13,38 13,22" fill="#0a0a0f" stroke="#e8d48b" strokeWidth="1"/>
            <text x="30" y="35" fontFamily="Orbitron" fontSize="13" fontWeight="900" fill="#e8d48b" textAnchor="middle">ARK</text>
          </svg>
          <span className="header__logo-text">ARKNIGHTS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="header__nav" role="navigation" aria-label="Main navigation">
          <NavLink to="/home" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/operators" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            Operators
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            News & RSS
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/manage" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            Gestión
          </NavLink>
          <NavLink to="/import-export" className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`} onClick={closeMenu}>
            Import/Export
          </NavLink>
          <a href="https://arknights.global/" target="_blank" rel="noopener noreferrer" className="header__nav-link header__nav-link--cta">
            Play Now
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`} aria-label="Mobile navigation">
        <NavLink to="/home"          className="header__mobile-link" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/operators"     className="header__mobile-link" onClick={closeMenu}>Operators</NavLink>
        <NavLink to="/news"          className="header__mobile-link" onClick={closeMenu}>News & RSS</NavLink>
        <NavLink to="/contact"       className="header__mobile-link" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/manage"        className="header__mobile-link" onClick={closeMenu}>Gestión</NavLink>
        <NavLink to="/import-export" className="header__mobile-link" onClick={closeMenu}>Import/Export</NavLink>
        <a href="https://arknights.global/" target="_blank" rel="noopener noreferrer" className="header__mobile-link header__mobile-link--cta" onClick={closeMenu}>Play Now</a>
      </nav>
    </header>
  )
}

export default Header
