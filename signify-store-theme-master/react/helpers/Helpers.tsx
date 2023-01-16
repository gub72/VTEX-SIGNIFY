export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}

export function UINumbers(children: any) {
  const valueFormatedForUi = `${formatPrice(
    children.toFixed(2).toString().replace(".", ",")
  )}`;
  return valueFormatedForUi;
}

export function formatOrder(sizes: any) {
  const arraySizes = String(sizes).split(",");

  const order = ["PP", "P", "M", "G", "EG", "SG", "XGG"];
  const orderBy = order.filter(order => new Set(arraySizes).has(order));

  return orderBy;
}
