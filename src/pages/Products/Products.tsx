import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  loadMoreProducts,
  changeCartCountsAtion,
} from "features/products/productsSlice";

import {
  getProductsList,
  getRange,
  getStatus,
  selectIsDebouncing,
} from "features/products/selectors";
import { PENDING } from "constants/status";
import { Loader } from "components/Loader/Loader";
import { makeArrayOfSelectedOrigins } from "helpers/arrayFromSelectedOrigins";
import { openNotificationWithIcon } from "helpers/notification";
import { useQueryParamsProducts } from "hooks/useQueryParamsProducts";
import { fetchProductsThunk } from "features/products/thunks";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { FilterByOrigins } from "../../components/FilterByOrigins/FilterByOrigins";
import { FilterProductsPerPage } from "../../components/FilterProductsPerPage/FilterProductsPerPage";

import { FilterByPrice } from "../../components/FilterByPrice/FilterByPrice";
import { Pagination } from "../../components/Pagination/Pagination";
import { IProduct } from "../../types/types";
import { operators } from "../../constants/operators";

import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const products = useSelector(getProductsList);
  const range = useSelector(getRange);
  const status = useSelector(getStatus);
  const isDebouncing = useSelector(selectIsDebouncing);

  const {
    currentPageQuery,
    setCurrentPageQuery,
    perPageQuery,
    setPerPageQuery,
    minPriceQuery,
    setMinPriceQuery,
    maxPriceQuery,
    setMaxPriceQuery,
    originsQuery,
    setOriginsQuery,
  } = useQueryParamsProducts();

  const dispatch = useDispatch();
  const { plus } = operators;
  useEffect(() => {
    dispatch(
      fetchProductsThunk({
        page: currentPageQuery,
        isEditable: false,
        perPage: perPageQuery,
        minPrice: minPriceQuery,
        maxPrice: maxPriceQuery,
        origins: originsQuery,
      })
    );
  }, [currentPageQuery, perPageQuery, minPriceQuery, originsQuery]);

  const body: React.RefObject<HTMLDivElement> | null = useRef(null);

  const scrollToBody = useCallback(() => {
    if (body.current) {
      body.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const handlePaginationChange = (page: number) => {
    dispatch(loadMoreProducts(page));
    setCurrentPageQuery(page);
  };

  const handleAddToCartClick: (item: IProduct) => void = useCallback((item: IProduct) => {
    dispatch(addToCartAction({ product: item, operator: plus, amount: 1 }));
    dispatch(changeCartCountsAtion());
    openNotificationWithIcon("success", "Add to cart", "Item has been added to cart");
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

      <div className={s.products__filters}>
        <FilterProductsPerPage perPage={perPageQuery} setPerPageQuery={setPerPageQuery} />
        <FilterByOrigins
          selectedOriginsQuery={originsQuery ? makeArrayOfSelectedOrigins(originsQuery) : []}
          setSelectedOriginsQuery={setOriginsQuery}
        />
        <FilterByPrice
          minPriceQuery={minPriceQuery}
          maxPriceQuery={maxPriceQuery}
          setMinPriceQuery={setMinPriceQuery}
          setMaxPriceQuery={setMaxPriceQuery}
          setPageQuery={setCurrentPageQuery}
        />
      </div>
      {status === PENDING || isDebouncing ? (
        <Loader />
      ) : (
        <>
          <div className={s.products__body} ref={body}>
            <ProductsList
              productsList={products}
              button={{ text: "ADD TO CART", handleFunction: handleAddToCartClick }}
            />
          </div>
          {range > 0 && (
            <Pagination
              onChange={handlePaginationChange}
              activePage={currentPageQuery}
              totalPages={range}
            />
          )}
        </>
      )}
    </div>
  );
};
