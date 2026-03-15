// src/pages/manage/Manage.jsx
import { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useOperatorsCrud, CLASSES } from "../../hooks/useOperators";
import "./Manage.css";

const EMPTY_FORM = { shortName: "", name: "", class: "Guard", rarity: 6, imageKey: "" };

export default function Manage() {
  const { operators, filterOperators, addOperator, updateOperator, deleteOperator, resetOperators } = useOperatorsCrud();

  const [search, setSearch]           = useState("");
  const [classFilter, setClassFilter] = useState("Todos");
  const [isFormOpen, setIsFormOpen]   = useState(false);
  const [editingId, setEditingId]     = useState(null);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filtered = filterOperators(search, classFilter);

  function handleOpenAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(op) {
    setForm({
      shortName: op.shortName,
      name:      op.name,
      class:     op.class,
      rarity:    op.rarity,
      imageKey:  op.imageKey || "",
    });
    setEditingId(op.id);
    setIsFormOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      updateOperator(editingId, form);
    } else {
      addOperator(form);
    }
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function handleDelete(id) {
    deleteOperator(id);
    setDeleteConfirmId(null);
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="manage-page">
      <Header />

      <main className="manage-main">
        {/* Cabecera */}
        <div className="manage-header">
          <span className="manage-tag">// GESTIÓN DE OPERADORES</span>
          <h1 className="manage-title">ROSTER <span>CRUD</span></h1>
          <div className="manage-divider" />
        </div>

        {/* Toolbar: búsqueda + filtros + botón añadir */}
        <div className="manage-toolbar">
          <input
            className="manage-search"
            type="text"
            placeholder="Buscar operador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="manage-select"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="Todos">Todas las clases</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="manage-btn-add" onClick={handleOpenAdd}>
            + Añadir operador
          </button>
          <button className="manage-btn-reset" onClick={resetOperators} title="Restaurar datos originales">
            ↺ Reset
          </button>
        </div>

        {/* Contador */}
        <p className="manage-count">
          Mostrando <strong>{filtered.length}</strong> de <strong>{operators.length}</strong> operadores
        </p>

        {/* Tabla */}
        <div className="manage-table-wrap">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Clase</th>
                <th>Rareza</th>
                <th>Image Key</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="manage-empty">
                    No se encontraron operadores
                  </td>
                </tr>
              ) : (
                filtered.map((op) => (
                  <tr key={op.id} className="manage-row">
                    <td>
                      {op.imageKey ? (
                        <img
                          src={`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/${op.imageKey}.png`}
                          alt={op.shortName}
                          className="manage-avatar"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div className="manage-avatar-placeholder">?</div>
                      )}
                    </td>
                    <td>
                      <div className="manage-op-name">{op.shortName}</div>
                      <div className="manage-op-fullname">{op.name}</div>
                    </td>
                    <td>
                      <span className="manage-class-badge">{op.class}</span>
                    </td>
                    <td>
                      <span className="manage-rarity">{"★".repeat(op.rarity)}</span>
                    </td>
                    <td>
                      <code className="manage-code">{op.imageKey || "—"}</code>
                    </td>
                    <td>
                      <div className="manage-actions">
                        <button
                          className="manage-btn-edit"
                          onClick={() => handleOpenEdit(op)}
                        >
                          Editar
                        </button>
                        {deleteConfirmId === op.id ? (
                          <span className="manage-confirm">
                            <button className="manage-btn-confirm-yes" onClick={() => handleDelete(op.id)}>Sí</button>
                            <button className="manage-btn-confirm-no"  onClick={() => setDeleteConfirmId(null)}>No</button>
                          </span>
                        ) : (
                          <button
                            className="manage-btn-delete"
                            onClick={() => setDeleteConfirmId(op.id)}
                          >
                            Borrar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de formulario (añadir / editar) */}
      {isFormOpen && (
        <div className="manage-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="manage-modal" onClick={(e) => e.stopPropagation()}>
            <div className="manage-modal-header">
              <span>{editingId ? "✏ Editar operador" : "+ Nuevo operador"}</span>
              <button className="manage-modal-close" onClick={() => setIsFormOpen(false)}>✕</button>
            </div>

            <form className="manage-form" onSubmit={handleSubmit}>
              <label className="manage-label">
                Nombre corto *
                <input
                  className="manage-input"
                  type="text"
                  required
                  value={form.shortName}
                  onChange={(e) => handleFormChange("shortName", e.target.value)}
                  placeholder="Ej: Skadi"
                />
              </label>

              <label className="manage-label">
                Nombre completo *
                <input
                  className="manage-input"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Ej: Skadi the Corrupting Heart"
                />
              </label>

              <label className="manage-label">
                Clase *
                <select
                  className="manage-input"
                  value={form.class}
                  onChange={(e) => handleFormChange("class", e.target.value)}
                >
                  {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>

              <label className="manage-label">
                Rareza *
                <select
                  className="manage-input"
                  value={form.rarity}
                  onChange={(e) => handleFormChange("rarity", Number(e.target.value))}
                >
                  {[1,2,3,4,5,6].map((r) => (
                    <option key={r} value={r}>{"★".repeat(r)} ({r}★)</option>
                  ))}
                </select>
              </label>

              <label className="manage-label">
                Image Key (opcional)
                <input
                  className="manage-input"
                  type="text"
                  value={form.imageKey}
                  onChange={(e) => handleFormChange("imageKey", e.target.value)}
                  placeholder="Ej: char_002_amiya"
                />
                <span className="manage-hint">
                  ID del personaje en Aceship. Déjalo vacío si no lo sabes.
                </span>
              </label>

              {/* Preview de imagen si hay imageKey */}
              {form.imageKey && (
                <div className="manage-preview">
                  <img
                    src={`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/${form.imageKey}.png`}
                    alt="preview"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}

              <div className="manage-form-btns">
                <button type="submit" className="manage-btn-submit">
                  {editingId ? "Guardar cambios" : "Añadir operador"}
                </button>
                <button type="button" className="manage-btn-cancel" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
