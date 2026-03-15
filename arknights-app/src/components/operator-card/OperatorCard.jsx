// components/OperatorCard.jsx
import { useState } from "react";
import "./OperatorCard.css";

const CLASS_ICONS = {
  Guard: "⚔️",
  Medic: "💊",
  Sniper: "🎯",
  Caster: "✨",
  Supporter: "🔷",
  Vanguard: "🛡️",
  Specialist: "🔧",
  Defender: "🔒",
};

export default function OperatorCard({ operator, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const stars = "★".repeat(operator.rarity) + "☆".repeat(6 - operator.rarity);

  return (
    <div
      className="op-card"
      style={{ "--glow": operator.glowColor, "--bg": operator.fallbackColor }}
      onClick={() => onClick?.(operator)}
    >
      {/* Imagen del operador */}
      <div className="op-card-image-wrap">
        {!imgLoaded && !imgError && (
          <div className="op-card-skeleton" />
        )}
        {!imgError ? (
          <img
            src={operator.imageUrl}
            alt={operator.name}
            className={`op-card-image ${imgLoaded ? "loaded" : ""}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback si la imagen no carga
          <div
            className="op-card-image-fallback"
            style={{ background: `linear-gradient(135deg, ${operator.fallbackColor}, #0a0c12)` }}
          >
            <span className="op-fallback-icon">
              {CLASS_ICONS[operator.class] || "?"}
            </span>
          </div>
        )}

        {/* Overlay con clase y rareza */}
        <div className="op-card-overlay">
          <span className="op-class-badge">{operator.class.toUpperCase()}</span>
          <span className="op-rarity">{stars}</span>
        </div>
      </div>

      {/* Info del operador */}
      <div className="op-card-body">
        <div className="op-name">{operator.shortName}</div>

        <div className="op-stats">
          <div className="op-stat">
            <span className="op-stat-val" style={{ color: "#e04040" }}>
              {typeof operator.atk === "number" ? operator.atk.toLocaleString() : operator.atk}
            </span>
            <span className="op-stat-lbl">ATK</span>
          </div>
          <div className="op-stat">
            <span className="op-stat-val" style={{ color: "#5ad4f5" }}>
              {typeof operator.def === "number" ? operator.def.toLocaleString() : operator.def}
            </span>
            <span className="op-stat-lbl">DEF</span>
          </div>
          <div className="op-stat">
            <span className="op-stat-val" style={{ color: "#4acd8a" }}>
              {typeof operator.hp === "number" ? operator.hp.toLocaleString() : operator.hp}
            </span>
            <span className="op-stat-lbl">HP</span>
          </div>
        </div>
      </div>

      {/* Borde animado en hover */}
      <div className="op-card-glow" />
    </div>
  );
}
