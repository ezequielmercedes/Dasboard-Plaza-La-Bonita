import { formatRD } from "../utils.js";

export default function Cobros({ cobros }) {
  return (
    <>
      <h1 className="section-title">Cobros</h1>
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", marginBottom: 20 }}>
        <div className="kpi-card" style={{ "--accent": "var(--alert)" }}>
          <div className="kpi-label">Total vencido</div>
          <div className="kpi-value">{formatRD(cobros.totalVencido)}</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "var(--teal)" }}>
          <div className="kpi-label">Total al día</div>
          <div className="kpi-value">{formatRD(cobros.totalAlDia)}</div>
        </div>
      </div>

      <div className="panel">
        <h2>Cuentas por cobrar por cliente</h2>
        <p className="panel-sub">Detalle de todos los clientes con saldo pendiente</p>
        <table className="data">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Días vencido</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cobros.detalle.map((c) => (
              <tr key={c.cliente}>
                <td>{c.cliente}</td>
                <td>{formatRD(c.monto)}</td>
                <td>{c.diasVencido > 0 ? `${c.diasVencido} días` : "—"}</td>
                <td>
                  <span className={`badge ${c.estado === "Vencida" ? "alert" : "ok"}`}>
                    {c.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
