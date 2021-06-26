import { useCallback, useEffect, useRef } from "react";
import { fetchProductsThunk, getOriginsThunk } from "features/products/thunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "core/store";
import { loadMoreProducts } from "features/products/productsSlice";

import { ProductsList } from "../../components/ProductsList/ProductsList";
import { FilterByOrigins } from "../../components/FilterByOrigins/FilterByOrigins";
import { FilterProductsPerPage } from "../../components/FilterProductsPerPage/FilterProductsPerPage";

import { FilterByPrice } from "../../components/FilterByPrice/FilterByPrice";
import { Pagination } from "../../components/Pagination/Pagination";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const { products, currentPage, perPage, totalItems, selectedOrigins, minPrice, maxPrice } =
    useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsThunk({
        page: currentPage,
        perPage,
        origins: selectedOrigins,
        minPrice,
        maxPrice,
      })
    );
  }, [currentPage, selectedOrigins, minPrice, perPage]);

  useEffect(() => {
    dispatch(getOriginsThunk());
  }, []);

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);

  const scrollToBody = useCallback(() => {
    if (body.current) {
      body.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const handlePaginationChange = (page: number) => {
    dispatch(loadMoreProducts(page));
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

      <div className={s.products__filters}>
        <FilterProductsPerPage />
        <FilterByOrigins />
        <FilterByPrice />
      </div>
      <div className={s.products__body} ref={body}>
        <ProductsList productsList={products} />
      </div>
      <Pagination
        onChange={handlePaginationChange}
        activePage={currentPage}
        totalPages={totalItems}
      />
    </div>
  );
};
