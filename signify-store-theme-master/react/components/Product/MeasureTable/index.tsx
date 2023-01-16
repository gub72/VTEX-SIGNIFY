import React, { useContext } from "react";
import { ProductContext } from "vtex.product-context";

const MeasuresTable: StorefrontFunctionComponent = () => {
  const { product }: any = useContext(ProductContext);
  const name = product?.productName;
  const category = product?.categories?.[0];

  const categoryAlias: any = {
    feminino: "feminino",
    masculino: "masculino",
    infantil: "infantil",
  };

  const categoryMapAlias = (category?.toLowerCase() || "")
    ?.replace?.(/\/$/g, "")
    ?.split?.("/")
    ?.map?.((cat: any) => categoryAlias[cat] || cat)
    ?.join?.("-");
  const sizeTableUrl = `/arquivos/tabela-medidas${categoryMapAlias}.png`;

  return <img src={sizeTableUrl} alt={`tabela de medidas ${name}`} />;
};

export default MeasuresTable;
