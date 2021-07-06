import { FilterByOrigins } from "components/FilterByOrigins/FilterByOrigins";
import { FilterByPrice } from "components/FilterByPrice/FilterByPrice";
import { FilterProductsPerPage } from "components/FilterProductsPerPage/FilterProductsPerPage";
import { Loader } from "components/Loader/Loader";
import { ProductsList } from "components/ProductsList/ProductsList";
import { PENDING } from "constants/status";
import { setIsEditable } from "features/products/productsSlice";
import { getParams, getProductsList, getRange, getStatus } from "features/products/selectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination";

import s from "./CreatedProducts.module.scss";

export const CreatedProducts: React.FC = () => {
  const products = useSelector(getProductsList);
  const status = useSelector(getStatus);
  const range = useSelector(getRange);
  const params = useSelector(getParams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsEditable(true));
  }, [dispatch]);

  const handlePaginationChange = () => {};

  if (status === PENDING && products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={s["created-products"]}>
      <div className={s["created-products__filters"]}>
        <FilterProductsPerPage />
        <FilterByOrigins />
        <FilterByPrice />
      </div>
      <div className={s["created-products__body"]}>
        <ProductsList productsList={products} />
      </div>
      {range > 0 && (
        <Pagination onChange={handlePaginationChange} activePage={params.page} totalPages={range} />
      )}
    </div>
  );
};
