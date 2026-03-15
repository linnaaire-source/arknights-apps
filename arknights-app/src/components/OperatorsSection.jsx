// components/OperatorsSection.jsx
import { useState } from "react";
import { useOperators } from "../hooks/useOperators";
import OperatorCard from "./OperatorCard";
import "./OperatorsSection.css";

const FILTERS = ["Todos", "Guard", "Caster", "Medic", "Sniper", "Vanguard", "Supporter"];

export default function OperatorsSection() {
  const { operators, loading, error } = useOperators();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeFilter === "Todos"
      ? operators
      : operators.filter((op) => op.class === activeFilter);

  return (
    <section className="ops-section">
      <div className="ops-section-header">
        <span className="ops-sec-tag">// ROSTER</span>
        <h2 className="ops-sec-title">
          OPERADORES <span>DESTACADOS</span>
        </h2>
        <div className="ops-divider" />
      </div>

      {/* Filtros */}
      <div className="ops-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`ops-filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="ops-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="ops-skeleton-card" />
          ))}
        </div>
      ) : error ? (
        <p className="ops-error">Error cargando operadores: {error}</p>
      ) : (
        <div className="ops-grid">
          {filtered.map((op) => (
            <OperatorCard
              key={op.id}
              operator={op}
              onClick={setSelected}
            />
          ))}
        </div>
      )}

      {/* Modal de detalle */}
      {selected && (
        <div className="ops-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="ops-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ops-modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="ops-modal-inner">
              <div className="ops-modal-img-wrap">
                <img
                  src={selected.imageUrl}
                  alt={selected.name}
                  className="ops-modal-img"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div className="ops-modal-info">
                <div className="ops-modal-class">{selected.class.toUpperCase()} // {"★".repeat(selected.rarity)}</div>
                <h3 className="ops-modal-name">{selected.name}</h3>
                <div className="ops-modal-stats">
                  <div className="ops-modal-stat">
                    <span className="val" style={{ color: "#e04040" }}>
                      {typeof selected.atk === "number" ? selected.atk.toLocaleString() : selected.atk}
                    </span>
                    <span className="lbl">ATK</span>
                  </div>
                  <div className="ops-modal-stat">
                    <span className="val" style={{ color: "#5ad4f5" }}>
                      {typeof selected.def === "number" ? selected.def.toLocaleString() : selected.def}
                    </span>
                    <span className="lbl">DEF</span>
                  </div>
                  <div className="ops-modal-stat">
                    <span className="val" style={{ color: "#4acd8a" }}>
                      {typeof selected.hp === "number" ? selected.hp.toLocaleString() : selected.hp}
                    </span>
                    <span className="lbl">HP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
