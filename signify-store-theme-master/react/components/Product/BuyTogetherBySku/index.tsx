import React, { ReactElement, useEffect, useState } from "react";
//import { MaybeProduct } from "vtex.product-context/react/ProductTypes";
//import { useCssHandles } from "vtex.css-handles";
import api from "../../../utils/api";
import { useIntl } from "react-intl";
import { formatCurrency } from "vtex.format-currency";
import { useRuntime } from "vtex.render-runtime";
import { FaPlusCircle, FaEquals } from "react-icons/fa";
//import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from "vtex.order-items/OrderItems";
import { SpinnerRound } from "spinners-react";

import "./global.css";

interface IProps {
  key?: string;
  selectedItem: string | undefined;
}

export const BuyTogetherItem = ({ selectedItem }: IProps) => {
  //const productContextValue = product;
  //const mainProduct = productContextValue?.product as ProductProps;
  const { culture } = useRuntime();
  const intl = useIntl();
  const { addItems } = useOrderItems();

  const [skuIdsTogether, setSkuIdsTogether] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState<string>("");

  const addToCart = () => {
    let treatedTogetherSkuProduct: any[] = [];

    treatedTogetherSkuProduct = skuIdsTogether.map((item: any) => {
      return {
        id: item.items[0].itemId,
        name: item.productName,
        quantity: 1,
        seller: item.items[0].sellers[0].sellerId,
      };
    });

    let cart = [...treatedTogetherSkuProduct];
    addItems(cart);
  };

  async function getProducts(idSkus) {
    let dataSku = [];

    return Promise.all(
      idSkus.map(idsku => {
        return api.get(`/api/catalog_system/pub/products/search/`, {
          params: { fq: `skuId:${idsku}` },
        });
      })
    ).then((e: any) => {
      dataSku = e.map(dados => {
        return dados.data[0];
      });

      let acc = 0;
      dataSku.forEach(function (item: any) {
        acc +=
          item.items[0].sellers[0].commertialOffer.Price >=
          item.items[0].sellers[0].commertialOffer.ListPrice
            ? item.items[0].sellers[0].commertialOffer.Price
            : item.items[0].sellers[0].commertialOffer.ListPrice;
      });

      let totalPrice = formatCurrency({
        intl,
        culture,
        value: acc,
      });

      setCartTotal(totalPrice);

      console.log(dataSku);

      setSkuIdsTogether(dataSku);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    let body = {
      items: [
        {
          id: selectedItem,
          quantity: 1,
          seller: 1,
        },
      ],
    };

    api.post("/api/checkout/pub/orderForms/simulation", body).then(data => {
      let skus = data.data.ratesAndBenefitsData.teaser[0].conditions.parameters[1].value
        .split(",")
        .map(Number);

      getProducts([selectedItem, ...skus]);
      setIsLoading(false);
    });
  }, []);

  let content: ReactElement | string = "";

  if (isLoading) {
    content = (
      <SpinnerRound size={55} thickness={180} speed={100} color="#f1b51c" />
    );
  }

  if (!isLoading && skuIdsTogether.length > 0) {
    content = (
      <div className="flex flex-column">
        <p className="flex items-start justify-center pv6 t-heading-2">
          Aproveite e Compre Junto
        </p>
        <div className="buytogether__Container flex flex-wrap flex-nowrap-ns justify-around">
          {skuIdsTogether.map((item: any, i) => {
            return (
              <>
                {i > 0 && (
                  <div className="buyTogether__Signal">
                    <FaPlusCircle />
                  </div>
                )}

                <div className="flex flex-column">
                  <div className="buyTogether__Image">
                    <img
                      src={item.items[0].images[0].imageUrl
                        .split("/")
                        .splice(0, 6)
                        .join("/")
                        .concat(
                          "-230-230?v=637544428677430000&width=230&height=230&aspect=true"
                        )}
                      alt=""
                    />
                  </div>

                  <div className="buyTogether__Name t-body tc">
                    {item.productName}
                  </div>

                  <div className="buyTogether__Price">
                    <p className="buyTogether__Price--listprice tc">
                      {formatCurrency({
                        intl,
                        culture,
                        value:
                          item.items[0].sellers[0].commertialOffer.ListPrice,
                      })}
                    </p>
                    {item.items[0].sellers[0].commertialOffer.BestPrice && (
                      <p className="buyTogether__Price--bestprice">
                        {formatCurrency({
                          intl,
                          culture,
                          value:
                            item.items[0].sellers[0].commertialOffer.BestPrice,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </>
            );
          })}

          <div className="buyTogether__Signal">
            <FaEquals />
          </div>

          <div className="flex flex-column items-center justify-center">
            <div className="buyTogether_Total">
              <p>
                Leve{" "}
                {skuIdsTogether.length > 1
                  ? `os ${skuIdsTogether.length} produtos`
                  : `1 produto`}{" "}
                por
              </p>
            </div>
            <div className="buyTogether-Total__value">
              <span>{cartTotal}</span>
            </div>

            <button
              className="BuyTogether__Buttom vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br3 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 grow"
              onClick={addToCart}
            >
              Comprar Junto
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default BuyTogetherItem;
