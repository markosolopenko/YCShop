import { useCallback, useEffect, useRef } from "react";
import { fetchProductsThunk } from "features/products/thunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "core/store";
import { loadMoreProducts } from "features/products/productsSlice";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { ReactComponent as ArrowDown } from "../../assets/chevron-down-solid.svg";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const { products, currentPage, perPage, totalItems } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk({ page: currentPage, perPage }));
  }, [currentPage]);

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);

  const scrollToBody = useCallback(() => {
    if (body.current) {
      body.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const loadMoreHandler = useCallback(() => {
    dispatch(loadMoreProducts());
  }, []);

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
        <ProductsList productsList={products} />
      </div>
      {products.length !== totalItems && (
        <div className={s.products__loadMore} onClick={loadMoreHandler}>
          LOAD MORE <ArrowDown className={s.products__loadMore__arrow} />
        </div>
      )}
    </div>
  );
};
