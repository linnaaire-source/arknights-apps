// src/pages/rss/Rss.jsx
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Rss.css";

const CATEGORY_COLORS = {
  Event:       { bg: "#5ad4f5", text: "#0a0c12" },
  Recruitment: { bg: "#f0c048", text: "#0a0c12" },
  Story:       { bg: "#e04040", text: "#fff"    },
  Maintenance: { bg: "#6a8aaa", text: "#fff"    },
  Store:       { bg: "#4acd8a", text: "#0a0c12" },
  Weekly:      { bg: "#9a4acd", text: "#fff"    },
};

function parseRssItems(xmlText) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const items = Array.from(xml.querySelectorAll("item"));
  return items.map((item) => ({
    title:       item.querySelector("title")?.textContent       ?? "",
    link:        item.querySelector("link")?.textContent        ?? "#",
    description: item.querySelector("description")?.textContent ?? "",
    pubDate:     item.querySelector("pubDate")?.textContent     ?? "",
    category:    item.querySelector("category")?.textContent    ?? "News",
  }));
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Rss() {
  const [items, setItems]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError]   = useState(false);

  useEffect(() => {
    async function fetchRss() {
      try {
        const res = await fetch("/rss.xml");
        if (!res.ok) throw new Error("No se pudo cargar el RSS");
        const text = await res.text();
        const parsed = parseRssItems(text);
        setItems(parsed);
      } catch (err) {
        console.error("RSS error:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRss();
  }, []);

  return (
    <div className="rss-page">
      <Header />

      <main className="rss-main">
        <div className="rss-header">
          <span className="rss-tag">// FEED RSS</span>
          <h1 className="rss-title">TRANSMISIONES <span>RECIENTES</span></h1>
          <div className="rss-divider" />
          <p className="rss-subtitle">
            Canal de noticias oficial de Rhodes Island. Suscríbete al feed RSS para recibir
            las últimas actualizaciones directamente en tu lector de feeds.
          </p>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="rss-subscribe-btn"
          >
            ⬇ Suscribirse al RSS
          </a>
        </div>

        {isLoading && (
          <div className="rss-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rss-skeleton" />
            ))}
          </div>
        )}

        {hasError && (
          <p className="rss-error">
            Error cargando el feed RSS. Inténtalo de nuevo más tarde.
          </p>
        )}

        {!isLoading && !hasError && (
          <ul className="rss-list">
            {items.map((item, index) => {
              const catStyle = CATEGORY_COLORS[item.category] ?? { bg: "#5ad4f5", text: "#0a0c12" };
              return (
                <li key={index} className="rss-item">
                  <div className="rss-item-left">
                    <span
                      className="rss-category"
                      style={{ background: catStyle.bg, color: catStyle.text }}
                    >
                      {item.category.toUpperCase()}
                    </span>
                    <span className="rss-date">{formatDate(item.pubDate)}</span>
                  </div>
                  <div className="rss-item-body">
                    <a
                      href={item.link}
                      className="rss-item-title"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                    <p className="rss-item-desc">{item.description}</p>
                  </div>
                  <div className="rss-item-arrow">→</div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
