import {
  ProductsContextDispatch,
  ProductsContextState,
} from "context/ProductsContext";
import { useContext, useEffect, useRef } from "react";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const state = useContext(ProductsContextState);
  const dispatch = useContext(ProductsContextDispatch);

  const { products } = state;
  const { items } = products;

  useEffect(() => {}, []);

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);
  const scrollToBody = () => {
    if (body.current) {
      body.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  return (
    <div className={s.products}>
      <div className={s.products__top}>
        <div className={s.products__top__aboveImg}>
          <div className={s.products__top__aboveImg__content}>
            <div className={s.products__top__aboveImg__content__text}>
              Welcome to <span className={s.logo}>YALANTIS SHOP</span>
            </div>
            <button
              onClick={scrollToBody}
              className={s.products__top__aboveImg__content__button}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className={s.products__body} ref={body}>
        <ProductsList productsList={items} />
      </div>
    </div>
  );
};
