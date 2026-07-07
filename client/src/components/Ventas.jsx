import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { formatRD } from "../utils.js";

export default function Ventas({ ventas }) {
  return (
    <>
      <h1 className="section-title">Ventas</h1>
      <div className="panel-grid">
        <div className="panel">
          <h2>Total facturado por día</h2>
          <p className="panel-sub">Semana en curso · total {formatRD(ventas.totalSemana)}</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ventas.porDia} margin={{ left: -18 }}>
              <CartesianGrid stroke="#eef1f2" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#5c6f78" }} axisLine={{ stroke: "#e2e6e8" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5c6f78" }} axisLine={false} tickLine={false} width={70}
                tickFormatter={(v) => (v / 1000) + "k"} />
              <Tooltip formatter={(v) => formatRD(v)} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e6e8" }} />
              <Bar dataKey="total" fill="#2f6f6b" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>Cumplimiento de meta por vendedor</h2>
          <p className="panel-sub">Meta semanal individual</p>
          {ventas.porVendedor.map((v) => {
            const pct = Math.round((v.logrado / v.meta) * 100);
            return (
              <div className="vendor-row" key={v.vendedor}>
                <div className="vendor-top">
                  <span className="name">{v.vendedor}</span>
                  <span className="pct">{formatRD(v.logrado)} · {pct}%</span>
                </div>
                <div className="vendor-track">
                  <div
                    className={`vendor-fill ${pct < 100 ? "under" : ""}`}
                    style={{ width: Math.min(pct, 100) + "%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
