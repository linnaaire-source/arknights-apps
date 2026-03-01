import { useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import NewsCard from '../../components/news-card/NewsCard'
import SilkBackground from '../../components/silk-background/SilkBackground'
import './News.css'

const ALL_NEWS = [
  { id: 1, title: 'Chapter 14 "A Pale Flame" Now Available', category: 'Story Update', date: 'Feb 28, 2026', excerpt: 'The latest chapter unfolds in the burning plains of Sargon. New cutscenes and story missions await desperate commanders.', imageColor: '#e8d48b', isNew: true },
  { id: 2, title: 'New Operator: Logos – Sovereign of Logic', category: 'New Operator', date: 'Feb 20, 2026', excerpt: 'Logos, the philosopher of Rhodes Island, joins the roster. Master his paradoxical powers to devastate enemies at long range.', imageColor: '#4fc3f7', isNew: true },
  { id: 3, title: 'Contingency Contract #11 Season Recap', category: 'Event', date: 'Feb 10, 2026', excerpt: 'Review the top strategies and operators used by elite tacticians in this season\'s Contingency Contract.', imageColor: '#ef5350', isNew: false },
  { id: 4, title: 'Integrated Strategies: Sarkaz Edition Guide', category: 'Guide', date: 'Feb 1, 2026', excerpt: 'Deep dive into the new IS4 mode featuring Sarkaz characters and unique rogue-like buffs.', imageColor: '#ab47bc', isNew: false },
  { id: 5, title: 'Maintenance Notice: Version 24.01', category: 'Maintenance', date: 'Jan 25, 2026', excerpt: 'Scheduled maintenance for version 24.01 will begin at 10:00 UTC. Expected duration: 4 hours.', imageColor: '#78909c', isNew: false },
  { id: 6, title: 'Operation Lone Trail Returns to Sidestory', category: 'Event', date: 'Jan 15, 2026', excerpt: 'The beloved Lone Trail event returns. Collect archive tokens and unlock new skins for Saria and Ifrit.', imageColor: '#66bb6a', isNew: false },
]

const CATEGORIES = ['All', 'Story Update', 'New Operator', 'Event', 'Guide', 'Maintenance']

// RSS feed links relevant to Arknights
const RSS_FEEDS = [
  {
    name: 'Official Arknights Twitter Feed',
    description: 'Latest tweets and announcements from the official Arknights EN account.',
    url: 'https://nitter.net/ArknightsEN/rss',
    icon: 'fa-brands fa-x-twitter',
  },
  {
    name: 'r/arknights Reddit Feed',
    description: 'Community discussions, tier lists, fan art and event guides.',
    url: 'https://www.reddit.com/r/arknights.rss',
    icon: 'fa-brands fa-reddit-alien',
  },
  {
    name: 'Arknights Wiki – Recent Changes',
    description: 'Get notified when new operator stats or event pages are published.',
    url: 'https://arknights.wiki.gg/index.php?title=Special:RecentChanges&feed=rss',
    icon: 'fa-solid fa-book',
  },
  {
    name: 'GameWith Arknights Articles',
    description: 'Strategy articles, tier lists and beginner guides from GameWith.',
    url: 'https://gamewith.net/arknights/feed',
    icon: 'fa-solid fa-gamepad',
  },
]

// News page – shows all articles with category filter and RSS links
function News() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredNews = ALL_NEWS.filter(article =>
    activeCategory === 'All' || article.category === activeCategory
  )

  return (
    <div className="page-wrapper">
      <Header />

      <main className="page-content">

        {/* Hero */}
        <div className="news-page__hero">
          <SilkBackground speed={2} scale={0.9} color="#ef5350" noiseIntensity={1.0} />
          <div className="news-page__hero-content container">
            <p className="news-page__eyebrow">Dispatch Terminal</p>
            <h1 className="news-page__title">NEWS & UPDATES</h1>
            <p className="news-page__subtitle">Stay informed on all current operations, events, and operator dispatches.</p>
          </div>
        </div>

        {/* News section */}
        <section className="news-page__content container">
          {/* Category filters */}
          <div className="news-page__filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`news-page__filter ${activeCategory === cat ? 'news-page__filter--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="news-page__grid">
            {filteredNews.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <p className="news-page__empty">No articles in this category.</p>
          )}
        </section>

        <div className="deco-line container" />

        {/* RSS Feeds section */}
        <section className="news-page__rss container">
          <h2 className="section-title">RSS FEEDS</h2>
          <p className="news-page__rss-desc">
            Subscribe to these RSS feeds to receive real-time updates about Arknights in your favorite RSS reader.
          </p>

          <div className="news-page__rss-grid">
            {RSS_FEEDS.map(feed => (
              <a
                key={feed.name}
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-page__rss-card"
              >
                <i className={`${feed.icon} news-page__rss-icon`} />
                <div>
                  <h3 className="news-page__rss-name">{feed.name}</h3>
                  <p className="news-page__rss-desc-card">{feed.description}</p>
                </div>
                <i className="fa-solid fa-rss news-page__rss-badge" />
              </a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default News
