import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import KpiCard from "./KpiCard.jsx";
import { formatRD } from "../utils.js";

export default function Resumen({ resumen, ventas, rutas }) {
  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          label="Ventas de la semana"
          value={formatRD(resumen.ventasSemana)}
          sub="7 días · todos los canales"
          accent="var(--teal)"
        />
        <KpiCard
          label="Alertas de inventario"
          value={resumen.alertasInventario}
          sub="productos bajo el mínimo"
          subTone="warn"
          accent="var(--alert)"
        />
        <KpiCard
          label="Cumplimiento de rutas"
          value={resumen.cumplimientoRutas + "%"}
          sub="promedio de 6 camiones"
          subTone="up"
          accent="var(--mango)"
        />
        <KpiCard
          label="Cuentas por cobrar vencidas"
          value={formatRD(resumen.cuentasVencidas)}
          sub="requiere seguimiento"
          subTone="warn"
          accent="var(--gold)"
        />
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h2>Ventas por día</h2>
          <p className="panel-sub">Últimos 7 días registrados por el punto de venta</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ventas.porDia} margin={{ left: -18 }}>
              <CartesianGrid stroke="#eef1f2" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#5c6f78" }} axisLine={{ stroke: "#e2e6e8" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5c6f78" }} axisLine={false} tickLine={false} width={70}
                tickFormatter={(v) => (v / 1000) + "k"} />
              <Tooltip formatter={(v) => formatRD(v)} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e6e8" }} />
              <Bar dataKey="total" fill="#e2892c" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Cumplimiento de rutas — hoy</h2>
          <p className="panel-sub">Paradas completadas vs. planificadas</p>
          {rutas.rutas.slice(0, 4).map((r) => (
            <div className="route-item" key={r.camion}>
              <div className="route-head">
                <span className="truck">{r.camion}</span>
                <span className="zone">{r.porcentaje}%</span>
              </div>
              <div className="route-track">
                <div
                  className={`route-fill ${r.estado === "Completada" ? "completada" : r.estado === "Retrasada" ? "retrasada" : "en-ruta"}`}
                  style={{ width: r.porcentaje + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
