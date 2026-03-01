import './NewsCard.css'

// NewsCard – presentational component receiving an article object via props
function NewsCard({ article }) {
  const { title, category, date, excerpt, imageColor, isNew } = article

  return (
    <article className="news-card">
      {/* Thumbnail */}
      <div className="news-card__thumb" style={{ '--thumb-color': imageColor || '#e8d48b' }}>
        <div className="news-card__thumb-inner">
          <span className="news-card__category">{category}</span>
          {isNew && <span className="news-card__new-badge">NEW</span>}
        </div>
      </div>

      {/* Content */}
      <div className="news-card__body">
        <time className="news-card__date">{date}</time>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__excerpt">{excerpt}</p>
        <button className="news-card__read-more">
          Read more <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </article>
  )
}

export default NewsCard
