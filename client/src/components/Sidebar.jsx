const SECTIONS = [
  { id: "resumen", label: "Resumen general" },
  { id: "ventas", label: "Ventas" },
  { id: "inventario", label: "Inventario" },
  { id: "logistica", label: "Logística" },
  { id: "cobros", label: "Cobros" },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span></span><span></span><span></span>
        </div>
        <div className="brand-text">
          <strong>La Bonita</strong>
          <small>Panel Operativo · Villa Mella</small>
        </div>
      </div>

      <nav className="nav-group">
        <div className="nav-eyebrow">Módulos</div>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`nav-item ${active === s.id ? "active" : ""}`}
            onClick={() => onChange(s.id)}
          >
            <span className="nav-dot" />
            {s.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        Distribuidora La Bonita, S.R.L.<br />
        3 almacenes · 12 camiones<br />
        Dashboard interno — datos de demostración
      </div>
    </aside>
  );
}
