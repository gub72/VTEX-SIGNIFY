import React, { useEffect } from "react";

const ShippingStatusValue = ({ minValue = 199 }: any) => {
  useEffect(() => {
    sessionStorage.setItem("shipping-minimun-value", minValue.toString());
  }, []);

  return <div />;
};

ShippingStatusValue.schema = {
  title: "Calculadora de frete grátis minicart",
  description: "Valor mínimo para ter acesso ao frete grátis.",
  type: "object",
  properties: {
    minValue: {
      title: "Valor mínimo",
      type: "number",
      default: 199,
    },
  },
};

export default ShippingStatusValue;
