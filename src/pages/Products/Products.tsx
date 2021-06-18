import { ADD_TO_CART, CHANGE_CART_COUNTS, FETCH_PRODUCTS, LOAD_MORE } from "actionTypes/products";
import { IProduct } from "common/types/types";
import { ProductsContextDispatch, ProductsContextState } from "context/ProductsContext";
import { useContext, useEffect, useRef } from "react";
import { getProducts } from "../../api/productsRequests";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { ReactComponent as ArrowDown } from "../../assets/chevron-down-solid.svg";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const state = useContext(ProductsContextState);
  const dispatch = useContext(ProductsContextDispatch);

  const { products, currentPage, perPage, totalItems } = state;

  useEffect(() => {
    getProducts(currentPage, perPage).then((data) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
  }, [currentPage]);

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);

  const scrollToBody = () => {
    if (body.current) {
      body.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };
  const handleAddToCartClick = (product: IProduct) => {
    dispatch({ type: ADD_TO_CART, payload: { product, operator: "+", amount: 1 } });
    dispatch({
      type: CHANGE_CART_COUNTS,
      payload: { count: 1, sum: product.price, operator: "+" },
    });
  };

  const loadMoreHandler = () => {
    if (products.length !== totalItems) {
      dispatch({ type: LOAD_MORE });
    }
  };
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
        <ProductsList productsList={products} handleAddToCartClick={handleAddToCartClick} />
      </div>
      <div className={s.products__loadMore} onClick={loadMoreHandler}>
        LOAD MORE <ArrowDown className={s.products__loadMore__arrow} />
      </div>
    </div>
  );
};
