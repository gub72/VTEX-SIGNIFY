import React from "react";
import { useProduct } from "vtex.product-context";

import BuyTogetherItems from "./components/Product/BuyTogetherBySku";
const BuyTogetherBySku = () => {
  console.log("The App is linked 🚀");

  const productContextValue = useProduct();
  return (
    <>
      <BuyTogetherItems
        selectedItem={productContextValue?.selectedItem?.itemId}
      />
    </>
  );
};

export default BuyTogetherBySku;
