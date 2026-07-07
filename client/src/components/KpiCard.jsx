export default function KpiCard({ label, value, sub, subTone, accent }) {
  return (
    <div className="kpi-card" style={{ "--accent": accent }}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {sub && <div className={`kpi-sub ${subTone || ""}`}>{sub}</div>}
    </div>
  );
}
