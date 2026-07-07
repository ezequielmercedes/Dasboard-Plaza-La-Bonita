export default function Inventario({ inventario }) {
  return (
    <>
      <h1 className="section-title">Inventario</h1>
      <div className="panel">
        <h2>Existencias por producto</h2>
        <p className="panel-sub">
          {inventario.totalAlertas} de {inventario.items.length} productos por debajo del stock mínimo
        </p>
        <table className="data">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock actual</th>
              <th>Mínimo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {inventario.items.map((i) => (
              <tr key={i.producto}>
                <td>{i.producto}</td>
                <td>{i.categoria}</td>
                <td>{i.stock} {i.unidad}</td>
                <td>{i.stockMinimo} {i.unidad}</td>
                <td>
                  <span className={`badge ${i.alerta ? "alert" : "ok"}`}>
                    {i.alerta ? "Reordenar" : "Suficiente"}
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
