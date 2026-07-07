# Dashboard Empresarial — Distribuidora La Bonita

Panel operativo web que centraliza los indicadores de **ventas, inventario, logística y cobros** de Distribuidora La Bonita, S.R.L. (Villa Mella, Santo Domingo Norte), desarrollado como proyecto final de la asignatura Seminario de Proyecto I (ISW410).

## Descripción del sistema

El sistema consta de dos partes:

- **API (server/)**: servidor Node.js + Express que expone los datos operativos de la distribuidora en formato JSON.
- **Panel web (client/)**: aplicación React (Vite) que consume la API y muestra los indicadores en tarjetas, gráficas y tablas, organizados en cuatro módulos: Ventas, Inventario, Logística y Cobros, más una vista de Resumen general.

Los datos incluidos son **datos de demostración** que simulan la operación real de la empresa (ventas semanales, stock de productos, rutas de los 12 camiones de reparto y cuentas por cobrar de clientes).

## Objetivo

Brindar a la gerencia y a los encargados de cada área una vista unificada y en tiempo real de los indicadores clave del negocio, para apoyar la toma de decisiones y reemplazar el manejo disperso de reportes en hojas de cálculo.

## Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Backend / API | Node.js, Express |
| Frontend | React 18, Vite |
| Visualización de datos | Recharts |
| Estilos | CSS puro (sin frameworks) |
| Control de versiones | Git / GitHub |

## Estructura del proyecto

```
dashboard-la-bonita/
├── server/               # API REST
│   ├── index.js
│   ├── data.json         # Datos simulados de la distribuidora
│   └── package.json
├── client/               # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Instrucciones de instalación y ejecución

Requisitos previos: tener instalado **Node.js 18 o superior** (incluye npm). Puedes verificarlo con:

```bash
node -v
npm -v
```

### 1. Clonar o descargar el repositorio

```bash
git clone https://github.com/[tu-usuario]/dashboard-la-bonita.git
cd dashboard-la-bonita
```

### 2. Levantar la API (servidor)

Abre una terminal:

```bash
cd server
npm install
npm start
```

Debe mostrar: `API de La Bonita corriendo en http://localhost:4000`

### 3. Levantar el panel web (cliente)

Abre **una segunda terminal** (deja la anterior corriendo):

```bash
cd client
npm install
npm run dev
```

Vite mostrará una URL, normalmente:

```
Local:   http://localhost:5173/
```

### 4. Abrir el dashboard

Abre esa dirección en tu navegador. El panel se conectará automáticamente a la API (el proxy ya está configurado en `vite.config.js`, no necesitas cambiar nada).

> Si ves el mensaje "No se pudo conectar con la API", confirma que el servidor del paso 2 sigue corriendo en el puerto 4000.

### 5. (Opcional) Generar la versión de producción

```bash
cd client
npm run build
npm run preview
```

## Capturas de pantalla

*Agregar aquí 2-3 capturas del dashboard corriendo (Resumen, Inventario, Logística) antes de subir el proyecto final, como evidencia funcional para el repositorio.*

## Evidencia funcional

Este proyecto es completamente funcional de forma local: la API sirve datos reales de prueba y el cliente los consume y visualiza en vivo (no son imágenes ni maquetas estáticas). Como evidencia adicional se recomienda incluir un video corto o GIF navegando por los cinco módulos del panel.

## Licencia

MIT (opcional — puede eliminarse este apartado y el archivo `LICENSE` si no se desea licenciar el repositorio).

---
Proyecto académico — Seminario de Proyecto I, UAPA. Trimestre Mayo-Julio 2026.
