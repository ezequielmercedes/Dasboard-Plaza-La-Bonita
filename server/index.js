const express = require("express");
const data = require("./data.json");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware CORS simple (sin dependencias externas) para que el
// cliente en http://localhost:5173 pueda consumir esta API en desarrollo.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

// --- Helpers ---
function calcularInventario() {
  return data.inventario.map((item) => ({
    ...item,
    alerta: item.stock < item.stockMinimo,
  }));
}

function calcularRutas() {
  return data.rutas.map((r) => ({
    ...r,
    porcentaje: Math.round((r.paradasCompletadas / r.paradasPlanificadas) * 100),
  }));
}

function calcularCobros() {
  const totalVencido = data.cobros
    .filter((c) => c.estado === "Vencida")
    .reduce((sum, c) => sum + c.monto, 0);
  const totalAlDia = data.cobros
    .filter((c) => c.estado === "Al día")
    .reduce((sum, c) => sum + c.monto, 0);
  return { detalle: data.cobros, totalVencido, totalAlDia };
}

// --- Rutas de la API ---

app.get("/api/empresa", (req, res) => res.json(data.empresa));

app.get("/api/ventas", (req, res) => {
  const totalSemana = data.ventasSemana.reduce((s, d) => s + d.total, 0);
  res.json({
    porDia: data.ventasSemana,
    porVendedor: data.ventasPorVendedor,
    totalSemana,
  });
});

app.get("/api/inventario", (req, res) => {
  const inv = calcularInventario();
  res.json({
    items: inv,
    totalAlertas: inv.filter((i) => i.alerta).length,
  });
});

app.get("/api/logistica", (req, res) => {
  const rutas = calcularRutas();
  const cumplimientoPromedio = Math.round(
    rutas.reduce((s, r) => s + r.porcentaje, 0) / rutas.length
  );
  res.json({ rutas, cumplimientoPromedio });
});

app.get("/api/cobros", (req, res) => {
  res.json(calcularCobros());
});

// Resumen general para las tarjetas principales del dashboard
app.get("/api/resumen", (req, res) => {
  const totalSemana = data.ventasSemana.reduce((s, d) => s + d.total, 0);
  const inv = calcularInventario();
  const rutas = calcularRutas();
  const cobros = calcularCobros();

  res.json({
    ventasSemana: totalSemana,
    alertasInventario: inv.filter((i) => i.alerta).length,
    cumplimientoRutas: Math.round(
      rutas.reduce((s, r) => s + r.porcentaje, 0) / rutas.length
    ),
    cuentasVencidas: cobros.totalVencido,
  });
});

app.listen(PORT, () => {
  console.log(`API de La Bonita corriendo en http://localhost:${PORT}`);
});
