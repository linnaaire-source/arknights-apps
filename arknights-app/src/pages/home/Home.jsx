import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import HeroSection from '../../components/hero-section/HeroSection'
import OperatorsGrid from '../../components/operators-grid/OperatorsGrid'
import NewsCard from '../../components/news-card/NewsCard'
import './Home.css'

// Latest news articles – static array for home page preview
const latestNews = [
  {
    id: 1,
    title: 'Chapter 14 "A Pale Flame" Now Available',
    category: 'Story Update',
    date: 'Feb 28, 2026',
    excerpt: 'The latest chapter unfolds in the burning plains of Sargon. New cutscenes and story missions await.',
    imageColor: '#e8d48b',
    isNew: true,
  },
  {
    id: 2,
    title: 'New Operator: Logos – Sovereign of Logic',
    category: 'New Operator',
    date: 'Feb 20, 2026',
    excerpt: 'Logos, the philosopher of Rhodes Island, joins the roster. Master his paradoxical powers to devastate enemies.',
    imageColor: '#4fc3f7',
    isNew: true,
  },
  {
    id: 3,
    title: 'Contingency Contract #11 Season Recap',
    category: 'Event',
    date: 'Feb 10, 2026',
    excerpt: 'Review the top strategies and operators used by elite tacticians in this season\'s Contingency Contract.',
    imageColor: '#ef5350',
    isNew: false,
  },
]

// Home page – main landing page accessible via / and /home
function Home() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="page-content">

        {/* Hero */}
        <HeroSection />

        {/* Operators preview section */}
        <section className="home__section container">
          <div className="home__section-header">
            <h2 className="section-title">OPERATORS</h2>
            <Link to="/operators" className="home__view-all">
              View All <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <p className="home__section-desc">
            Deploy skilled Operators from across Terra to defend against the Originium threat. Filter by class, rarity, and faction.
          </p>
          {/* Show only 6 on home page via maxDisplay prop */}
          <OperatorsGrid maxDisplay={6} />
        </section>

        <div className="deco-line container" />

        {/* News preview */}
        <section className="home__section container">
          <div className="home__section-header">
            <h2 className="section-title">LATEST NEWS</h2>
            <Link to="/news" className="home__view-all">
              View All <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <p className="home__section-desc">
            Stay up to date with events, operator reveals, and story chapters.
          </p>
          <div className="home__news-grid">
            {latestNews.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <div className="deco-line container" />

        {/* Download CTA */}
        <section className="home__cta">
          <div className="home__cta-silk">
            {/* Animated gold line */}
            <div className="home__cta-line" />
          </div>
          <div className="home__cta-content container">
            <p className="home__cta-eyebrow">Available on all platforms</p>
            <h2 className="home__cta-title">BEGIN YOUR COMMAND</h2>
            <p className="home__cta-subtitle">
              Join over 50 million operators worldwide. Download free today.
            </p>
            <div className="home__cta-actions">
              <a href="https://apps.apple.com/app/arknights/id1464872022" target="_blank" rel="noopener noreferrer" className="home__store-btn">
                <i className="fa-brands fa-apple" />
                <div>
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.YoStarEN.Arknights" target="_blank" rel="noopener noreferrer" className="home__store-btn">
                <i className="fa-brands fa-google-play" />
                <div>
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Home
