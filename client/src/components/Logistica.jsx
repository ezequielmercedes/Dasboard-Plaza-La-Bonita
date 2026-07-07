export default function Logistica({ logistica }) {
  return (
    <>
      <h1 className="section-title">Logística</h1>
      <div className="panel">
        <h2>Cumplimiento de rutas de reparto</h2>
        <p className="panel-sub">
          Cumplimiento promedio de la flota: {logistica.cumplimientoPromedio}%
        </p>
        {logistica.rutas.map((r) => (
          <div className="route-item" key={r.camion}>
            <div className="route-head">
              <span className="truck">{r.camion} — {r.conductor}</span>
              <span className="zone">{r.zona}</span>
            </div>
            <div className="route-track">
              <div
                className={`route-fill ${r.estado === "Completada" ? "completada" : r.estado === "Retrasada" ? "retrasada" : "en-ruta"}`}
                style={{ width: r.porcentaje + "%" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: "#5c6f78" }}>
                {r.paradasCompletadas} de {r.paradasPlanificadas} paradas
              </span>
              <span
                className={`badge ${r.estado === "Completada" ? "ok" : r.estado === "Retrasada" ? "alert" : "warn"}`}
              >
                {r.estado}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
