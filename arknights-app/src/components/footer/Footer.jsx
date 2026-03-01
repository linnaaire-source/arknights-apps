import { Link } from 'react-router-dom'
import './Footer.css'

// Footer – contains legal info, social links, and navigation links
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__deco-top" />

      <div className="footer__inner container">

        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <svg viewBox="0 0 60 60" width="36" height="36">
              <polygon points="30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5" fill="none" stroke="#e8d48b" strokeWidth="2"/>
              <polygon points="30,13 47,22 47,38 30,47 13,38 13,22" fill="#05050a" stroke="#e8d48b" strokeWidth="1"/>
              <text x="30" y="35" fontFamily="Orbitron" fontSize="12" fontWeight="900" fill="#e8d48b" textAnchor="middle">ARK</text>
            </svg>
            <span className="footer__logo-text">ARKNIGHTS</span>
          </Link>
          <p className="footer__tagline">
            A mobile strategy RPG where you command Operators in a world plagued by Originium.
          </p>
          {/* Social icons */}
          <div className="footer__socials">
            <a href="https://twitter.com/ArknightsEN" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter / X">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.facebook.com/ArknightsEN" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/arknights_en/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="https://www.youtube.com/@ArknightsEN" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
              <i className="fa-brands fa-youtube" />
            </a>
            <a href="https://www.reddit.com/r/arknights/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Reddit">
              <i className="fa-brands fa-reddit-alien" />
            </a>
            <a href="https://discord.gg/arknights" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Discord">
              <i className="fa-brands fa-discord" />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div className="footer__col">
          <h3 className="footer__col-title">Navigation</h3>
          <ul className="footer__links">
            <li><Link to="/home" className="footer__link">Home</Link></li>
            <li><Link to="/operators" className="footer__link">Operators</Link></li>
            <li><Link to="/news" className="footer__link">News & RSS</Link></li>
            <li><Link to="/contact" className="footer__link">Contact</Link></li>
          </ul>
        </div>

        {/* External links */}
        <div className="footer__col">
          <h3 className="footer__col-title">Resources</h3>
          <ul className="footer__links">
            <li><a href="https://arknights.global/" target="_blank" rel="noopener noreferrer" className="footer__link">Official Website</a></li>
            <li><a href="https://arknights.wiki.gg/" target="_blank" rel="noopener noreferrer" className="footer__link">Arknights Wiki</a></li>
            <li><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="footer__link">Figma Design</a></li>
            <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub Repo</a></li>
          </ul>
        </div>

        {/* Download */}
        <div className="footer__col">
          <h3 className="footer__col-title">Download</h3>
          <ul className="footer__links">
            <li>
              <a href="https://apps.apple.com/app/arknights/id1464872022" target="_blank" rel="noopener noreferrer" className="footer__link">
                <i className="fa-brands fa-apple" /> App Store
              </a>
            </li>
            <li>
              <a href="https://play.google.com/store/apps/details?id=com.YoStarEN.Arknights" target="_blank" rel="noopener noreferrer" className="footer__link">
                <i className="fa-brands fa-google-play" /> Google Play
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p className="footer__legal">
            © {currentYear} ARKNIGHTS — Hypergryph / Yostar. All rights reserved. This is a fan project for educational purposes.
          </p>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacy Policy & Cookies</a>
            <span className="footer__legal-sep">|</span>
            <a href="#" className="footer__legal-link">Terms of Sale</a>
            <span className="footer__legal-sep">|</span>
            <a href="#" className="footer__legal-link">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
