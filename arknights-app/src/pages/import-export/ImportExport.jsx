// src/pages/import-export/ImportExport.jsx
// Página de importación y exportación de datos en JSON, CSV y XML.
// Accede a Firebase ÚNICAMENTE a través de firebaseService.js

import { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import * as xmljs from "xml-js";
import {
  getOperadores,
  importOperadores,
} from "../../services/firebaseService";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./ImportExport.css";

export default function ImportExport() {
  const [mensaje, setMensaje]   = useState(null);
  const [tipoMsg, setTipoMsg]   = useState("ok"); // "ok" | "error"
  const [cargando, setCargando] = useState(false);

  function mostrar(texto, tipo = "ok") {
    setMensaje(texto);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), 4000);
  }

  // ─── EXPORTAR ─────────────────────────────────────────────────────────────

  async function exportJSON() {
    try {
      setCargando(true);
      const datos = await getOperadores();
      // Limpiamos campos internos de Firebase que no son necesarios en el export
      const limpios = datos.map(({ id, fallbackColor, glowColor, ...rest }) => rest);
      const blob = new Blob([JSON.stringify(limpios, null, 2)], { type: "application/json" });
      saveAs(blob, "datos.json");
      mostrar(`✅ Exportados ${limpios.length} operadores como JSON`);
    } catch (e) {
      mostrar("❌ Error al exportar JSON: " + e.message, "error");
    } finally {
      setCargando(false);
    }
  }

  async function exportCSV() {
    try {
      setCargando(true);
      const datos = await getOperadores();
      const limpios = datos.map(({ id, fallbackColor, glowColor, ...rest }) => rest);
      const csv  = Papa.unparse(limpios);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "datos.csv");
      mostrar(`✅ Exportados ${limpios.length} operadores como CSV`);
    } catch (e) {
      mostrar("❌ Error al exportar CSV: " + e.message, "error");
    } finally {
      setCargando(false);
    }
  }

  async function exportXML() {
    try {
      setCargando(true);
      const datos = await getOperadores();
      const limpios = datos.map(({ id, fallbackColor, glowColor, ...rest }) => rest);
      const xmlObj = { operadores: { operador: limpios } };
      const xmlStr = xmljs.js2xml(xmlObj, { compact: true, spaces: 2 });
      const blob   = new Blob([xmlStr], { type: "application/xml" });
      saveAs(blob, "datos.xml");
      mostrar(`✅ Exportados ${limpios.length} operadores como XML`);
    } catch (e) {
      mostrar("❌ Error al exportar XML: " + e.message, "error");
    } finally {
      setCargando(false);
    }
  }

  // ─── IMPORTAR ─────────────────────────────────────────────────────────────

  function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        setCargando(true);
        const datos = JSON.parse(evt.target.result);
        if (!Array.isArray(datos)) throw new Error("El archivo debe contener un array de operadores");
        await importOperadores(datos);
        mostrar(`✅ Importados ${datos.length} operadores desde JSON`);
      } catch (err) {
        mostrar("❌ Error al importar JSON: " + err.message, "error");
      } finally {
        setCargando(false);
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function importCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          setCargando(true);
          // Convertir rareza a número
          const datos = results.data.map((op) => ({
            ...op,
            rarity: op.rarity ? Number(op.rarity) : 1,
          }));
          await importOperadores(datos);
          mostrar(`✅ Importados ${datos.length} operadores desde CSV`);
        } catch (err) {
          mostrar("❌ Error al importar CSV: " + err.message, "error");
        } finally {
          setCargando(false);
          e.target.value = "";
        }
      },
      error: (err) => mostrar("❌ Error al parsear CSV: " + err.message, "error"),
    });
  }

  function importXML(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        setCargando(true);
        const parsed = xmljs.xml2js(evt.target.result, { compact: true });
        const rawOps = parsed.operadores?.operador;
        if (!rawOps) throw new Error("Estructura XML inválida. Debe tener <operadores><operador>…");
        const lista = (Array.isArray(rawOps) ? rawOps : [rawOps]).map((op) =>
          Object.fromEntries(
            Object.entries(op).map(([k, v]) => [
              k,
              k === "rarity" ? Number(v._text) : (v._text ?? ""),
            ])
          )
        );
        await importOperadores(lista);
        mostrar(`✅ Importados ${lista.length} operadores desde XML`);
      } catch (err) {
        mostrar("❌ Error al importar XML: " + err.message, "error");
      } finally {
        setCargando(false);
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div className="ie-page">
      <Header />

      <main className="ie-main">
        <div className="ie-header">
          <span className="ie-tag">// DATOS</span>
          <h1 className="ie-title">IMPORT / <span>EXPORT</span></h1>
          <div className="ie-divider" />
          <p className="ie-subtitle">
            Importa o exporta los operadores de Firebase en formato JSON, CSV o XML.
          </p>
        </div>

        {/* Mensaje de feedback */}
        {mensaje && (
          <div className={`ie-msg ${tipoMsg === "error" ? "ie-msg--error" : ""}`}>
            {mensaje}
          </div>
        )}

        {/* Indicador de carga */}
        {cargando && <div className="ie-loading">Procesando…</div>}

        <div className="ie-grid">

          {/* ── EXPORTAR ── */}
          <section className="ie-card">
            <h2 className="ie-card-title">⬇ Exportar desde Firebase</h2>
            <p className="ie-card-desc">Descarga todos los operadores almacenados en Firebase.</p>
            <div className="ie-btn-group">
              <button className="ie-btn ie-btn--json" onClick={exportJSON} disabled={cargando}>
                Exportar JSON
              </button>
              <button className="ie-btn ie-btn--csv"  onClick={exportCSV}  disabled={cargando}>
                Exportar CSV
              </button>
              <button className="ie-btn ie-btn--xml"  onClick={exportXML}  disabled={cargando}>
                Exportar XML
              </button>
            </div>
          </section>

          {/* ── IMPORTAR ── */}
          <section className="ie-card">
            <h2 className="ie-card-title">⬆ Importar a Firebase</h2>
            <p className="ie-card-desc">Sube un archivo para añadir operadores a Firebase.</p>

            <div className="ie-input-group">
              <label className="ie-file-label ie-file-label--json">
                <span>📄 JSON</span>
                <input type="file" accept=".json" onChange={importJSON} disabled={cargando} />
              </label>
              <label className="ie-file-label ie-file-label--csv">
                <span>📊 CSV</span>
                <input type="file" accept=".csv"  onChange={importCSV}  disabled={cargando} />
              </label>
              <label className="ie-file-label ie-file-label--xml">
                <span>🗂 XML</span>
                <input type="file" accept=".xml"  onChange={importXML}  disabled={cargando} />
              </label>
            </div>
          </section>

          {/* ── ARCHIVOS DE EJEMPLO ── */}
          <section className="ie-card ie-card--samples">
            <h2 className="ie-card-title">📁 Archivos de ejemplo</h2>
            <p className="ie-card-desc">Descarga ejemplos para probar la importación.</p>
            <div className="ie-btn-group">
              <a className="ie-btn ie-btn--json" href="/sample-data/datos.json" download>
                ⬇ datos.json
              </a>
              <a className="ie-btn ie-btn--csv" href="/sample-data/datos.csv" download>
                ⬇ datos.csv
              </a>
              <a className="ie-btn ie-btn--xml" href="/sample-data/datos.xml" download>
                ⬇ datos.xml
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
