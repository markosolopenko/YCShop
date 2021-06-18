import { ADD_TO_CART, FETCH_PRODUCTS } from "actionTypes/products";
import { IProduct } from "common/types/types";
import { ProductsContextDispatch, ProductsContextState } from "context/ProductsContext";
import { useContext, useEffect, useRef } from "react";
import { getProducts } from "../../api/productsRequests";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const state = useContext(ProductsContextState);
  const dispatch = useContext(ProductsContextDispatch);

  useEffect(() => {
    getProducts(1, 50).then((data) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
  }, []);

  const { products, productsAddedToCart } = state;
  const { items } = products;

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);
  const scrollToBody = () => {
    if (body.current) {
      body.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };
  const handleAddToCartClick = (product: IProduct) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };
  console.log(productsAddedToCart);
  return (
    <div className={s.products}>
      <div className={s.products__top}>
        <div className={s.products__top__aboveImg}>
          <div className={s.products__top__aboveImg__content}>
            <div className={s.products__top__aboveImg__content__text}>
              Welcome to <span className={s.logo}>YALANTIS SHOP</span>
              <div>The most famous shop in the World</div>
            </div>
            <button onClick={scrollToBody} className={s.products__top__aboveImg__content__button}>
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className={s.products__body} ref={body}>
        <ProductsList productsList={items} handleAddToCartClick={handleAddToCartClick} />
      </div>
    </div>
  );
};
