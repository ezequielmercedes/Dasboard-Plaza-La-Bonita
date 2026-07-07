export function formatRD(value) {
  return "RD$ " + Number(value).toLocaleString("es-DO", { maximumFractionDigits: 0 });
}
