import React, { useState, useEffect } from "react";
import { FormattedCurrency } from "vtex.format-currency";

import "./global.css";

interface ShippingStatusBarProps {
  orderForm: any;
}

const ShippingStatusBar: StorefrontFunctionComponent<ShippingStatusBarProps> =
  ({ orderForm }: any) => {
    const [total, setTotal]: any = useState(0);
    const [totalMinimun, setTotalMinimun]: any = useState(0);
    const [progress, setProgress]: any = useState(0);

    // const getSubTotal = () => {
    //     const itemsTotal = orderForm?.totalizers.find((totalizer: any) => totalizer.id.toLowerCase() === "items")
    //     const total = itemsTotal ? itemsTotal.value / 100 : 0
    //     setSubTotal(total)
    // }

    const getTotal = () => {
      const itemsTotal = orderForm?.totalizers.find(
        (totalizer: any) => totalizer.id.toLowerCase() === "items"
      );
      const discountTotal = orderForm?.totalizers.find(
        (totalizer: any) => totalizer.id.toLowerCase() === "discounts"
      );
      const shippingTotal = orderForm?.totalizers.find(
        (totalizer: any) => totalizer.id.toLowerCase() === "shipping"
      );
      const total = itemsTotal
        ? Math.max(
            0,
            itemsTotal.value +
              (discountTotal ? discountTotal.value : 0) +
              (shippingTotal ? shippingTotal.value : 0)
          ) / 100
        : 0;

      setTotal(total);
    };

    const getProgress = () => {
      const progress = Math.min((total * 100) / totalMinimun, 100);
      setProgress(progress);
    };

    useEffect(() => {
      getProgress();
    }, [total]);

    useEffect(() => {
      getTotal();
    }, [orderForm]);

    useEffect(() => {
      getTotal();
      setTotalMinimun(parseInt(sessionStorage["shipping-minimun-value"]));
    }, []);

    return (
      <div id="shipping-status-bar" className="shipping-status">
        <span className="shipping-status__container">
          <span
            className="shipping-status__progress"
            style={{ width: `${progress}%` }}
          ></span>
        </span>
        <span className="shipping-status__msg-container">
          {total < totalMinimun ? (
            <span className="shipping-status__msg">
              Frete grátis - Faltam{" "}
              <FormattedCurrency value={totalMinimun - total} /> para ganhar a
              entrega
            </span>
          ) : (
            <span className="shipping-status__msg shipping-status__msg--completed">
              Você ganhou <span>frete grátis!</span>
            </span>
          )}
        </span>
      </div>
    );
  };

export default ShippingStatusBar;
