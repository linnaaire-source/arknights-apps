import { useState } from 'react'
import useOperators from '../../hooks/useOperators'
import OperatorCard from '../operator-card/OperatorCard'
import './OperatorsGrid.css'

const CLASS_FILTERS = ['All', 'Guard', 'Sniper', 'Caster', 'Defender', 'Medic', 'Supporter', 'Specialist', 'Vanguard']
const RARITY_FILTERS = ['All', '6★', '5★', '4★', '3★']

// OperatorsGrid – displays operators with Firebase-backed filtering by class and rarity
function OperatorsGrid({ maxDisplay }) {
  const { operators, isLoading, hasError } = useOperators()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeClass, setActiveClass] = useState('All')
  const [activeRarity, setActiveRarity] = useState('All')

  const filteredOperators = operators.filter(op => {
    const matchesSearch = op.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = activeClass === 'All' || op.class === activeClass
    const matchesRarity =
      activeRarity === 'All' ||
      op.rarity === parseInt(activeRarity.replace('★', ''))
    return matchesSearch && matchesClass && matchesRarity
  })

  const displayedOperators = maxDisplay ? filteredOperators.slice(0, maxDisplay) : filteredOperators

  return (
    <div className="operators-grid">

      {/* Filters */}
      <div className="operators-grid__filters">
        <div className="operators-grid__search-wrap">
          <i className="fa-solid fa-magnifying-glass operators-grid__search-icon" />
          <input
            type="text"
            placeholder="Search operators..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="operators-grid__search"
            aria-label="Search operators"
          />
        </div>

        <div className="operators-grid__filter-group">
          <span className="operators-grid__filter-label">Class:</span>
          <div className="operators-grid__pills">
            {CLASS_FILTERS.map(cls => (
              <button
                key={cls}
                className={`operators-grid__pill ${activeClass === cls ? 'operators-grid__pill--active' : ''}`}
                onClick={() => setActiveClass(cls)}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="operators-grid__filter-group">
          <span className="operators-grid__filter-label">Rarity:</span>
          <div className="operators-grid__pills">
            {RARITY_FILTERS.map(r => (
              <button
                key={r}
                className={`operators-grid__pill ${activeRarity === r ? 'operators-grid__pill--active' : ''}`}
                onClick={() => setActiveRarity(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      {hasError && (
        <p className="operators-grid__notice">
          <i className="fa-solid fa-circle-info" /> Showing local data — connect Firebase for live data.
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="operators-grid__loading">
          <div className="operators-grid__spinner" />
          <span>Loading operators...</span>
        </div>
      ) : displayedOperators.length === 0 ? (
        <div className="operators-grid__empty">
          <i className="fa-solid fa-user-slash" />
          <p>No operators found for this filter.</p>
        </div>
      ) : (
        <div className="operators-grid__grid">
          {displayedOperators.map(op => (
            <OperatorCard key={op.id} operator={op} />
          ))}
        </div>
      )}

      <p className="operators-grid__count">
        {filteredOperators.length} operator{filteredOperators.length !== 1 ? 's' : ''} found
      </p>
    </div>
  )
}

export default OperatorsGrid
