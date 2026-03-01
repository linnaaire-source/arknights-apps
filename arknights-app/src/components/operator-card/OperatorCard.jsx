import { useState } from 'react'
import './OperatorCard.css'

const CLASS_COLORS = {
  Guard: '#ef5350',
  Sniper: '#ffa726',
  Caster: '#ab47bc',
  Defender: '#42a5f5',
  Medic: '#66bb6a',
  Supporter: '#26c6da',
  Specialist: '#ec407a',
  Vanguard: '#8d6e63',
}

// OperatorCard – stateless presentational component that receives operator via props
function OperatorCard({ operator }) {
  const { name, title, rarity, class: opClass, faction, tags, stats, imageUrl, isFeatured } = operator
  const classColor = CLASS_COLORS[opClass] || '#e8d48b'
  const rarityStars = '★'.repeat(rarity) + '☆'.repeat(6 - rarity)
  const [isImgError, setIsImgError] = useState(false)

  return (
    <article className={`operator-card ${isFeatured ? 'operator-card--featured' : ''}`}>
      {isFeatured && <span className="operator-card__featured-badge">FEATURED</span>}

      {/* Art area */}
      <div className="operator-card__art" style={{ '--class-color': classColor }}>

        {/* Portrait image – shown when URL is valid */}
        {imageUrl && !isImgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="operator-card__img"
            onError={() => setIsImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="operator-card__art-fallback">
            <svg viewBox="0 0 100 120" className="operator-card__silhouette">
              <circle cx="50" cy="30" r="16" fill="none" stroke={classColor} strokeWidth="1" opacity="0.7"/>
              <line x1="50" y1="46" x2="50" y2="76" stroke={classColor} strokeWidth="1" opacity="0.7"/>
              <line x1="50" y1="56" x2="30" y2="70" stroke={classColor} strokeWidth="1" opacity="0.7"/>
              <line x1="50" y1="56" x2="70" y2="70" stroke={classColor} strokeWidth="1" opacity="0.7"/>
              <line x1="50" y1="76" x2="38" y2="110" stroke={classColor} strokeWidth="1" opacity="0.7"/>
              <line x1="50" y1="76" x2="62" y2="110" stroke={classColor} strokeWidth="1" opacity="0.7"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay on top of the image */}
        <div className="operator-card__art-gradient" />

        {/* Class badge on top of everything */}
        <div className="operator-card__class-badge" style={{ background: classColor }}>
          {opClass}
        </div>
      </div>

      {/* Info */}
      <div className="operator-card__info">
        <div className="operator-card__rarity">{rarityStars}</div>
        <h3 className="operator-card__name">{name}</h3>
        <p className="operator-card__title">{title}</p>
        <p className="operator-card__faction">
          <i className="fa-solid fa-shield" /> {faction}
        </p>
        <div className="operator-card__tags">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="operator-card__tag">{tag}</span>
          ))}
        </div>
        <div className="operator-card__stats">
          <div className="operator-card__stat">
            <span className="operator-card__stat-label">ATK</span>
            <span className="operator-card__stat-val">{stats.atk}</span>
          </div>
          <div className="operator-card__stat">
            <span className="operator-card__stat-label">DEF</span>
            <span className="operator-card__stat-val">{stats.def}</span>
          </div>
          <div className="operator-card__stat">
            <span className="operator-card__stat-label">DP</span>
            <span className="operator-card__stat-val">{stats.cost}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default OperatorCard
