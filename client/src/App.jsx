import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Resumen from "./components/Resumen.jsx";
import Ventas from "./components/Ventas.jsx";
import Inventario from "./components/Inventario.jsx";
import Logistica from "./components/Logistica.jsx";
import Cobros from "./components/Cobros.jsx";

const TITLES = {
  resumen: ["Resumen general", "Estado consolidado de la operación de hoy"],
  ventas: ["Ventas", "Desempeño comercial de la semana"],
  inventario: ["Inventario", "Existencias y alertas de reorden"],
  logistica: ["Logística", "Cumplimiento de rutas de reparto"],
  cobros: ["Cobros", "Cuentas por cobrar a clientes"],
};

export default function App() {
  const [active, setActive] = useState("resumen");
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    async function load() {
      try {
        const [resumen, ventas, inventario, logistica, cobros] = await Promise.all(
          ["resumen", "ventas", "inventario", "logistica", "cobros"].map((ep) =>
            fetch(`/api/${ep}`).then((r) => {
              if (!r.ok) throw new Error(`Error al cargar /api/${ep}`);
              return r.json();
            })
          )
        );
        setState({ status: "ready", resumen, ventas, inventario, logistica, cobros });
      } catch (err) {
        setState({ status: "error", message: err.message });
      }
    }
    load();
  }, []);

  const [title, subtitle] = TITLES[active];

  return (
    <div className="app-shell">
      <Sidebar active={active} onChange={setActive} />
      <main className="main">
        <div className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <span className="sync-pill">Datos sincronizados</span>
        </div>

        {state.status === "loading" && (
          <div className="loading">Cargando datos del panel…</div>
        )}

        {state.status === "error" && (
          <div className="error-box">
            No se pudo conectar con la API ({state.message}). Verifica que el
            servidor esté corriendo en el puerto 4000.
          </div>
        )}

        {state.status === "ready" && (
          <>
            {active === "resumen" && (
              <Resumen resumen={state.resumen} ventas={state.ventas} rutas={state.logistica} />
            )}
            {active === "ventas" && <Ventas ventas={state.ventas} />}
            {active === "inventario" && <Inventario inventario={state.inventario} />}
            {active === "logistica" && <Logistica logistica={state.logistica} />}
            {active === "cobros" && <Cobros cobros={state.cobros} />}
          </>
        )}
      </main>
    </div>
  );
}
