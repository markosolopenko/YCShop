import React, { useEffect, useCallback, useState } from "react";
import { FilterByOrigins } from "components/FilterByOrigins/FilterByOrigins";
import { FilterByPrice } from "components/FilterByPrice/FilterByPrice";
import { FilterProductsPerPage } from "components/FilterProductsPerPage/FilterProductsPerPage";
import { Loader } from "components/Loader/Loader";
import { ProductsList } from "components/ProductsList/ProductsList";
import { PENDING } from "constants/status";
import { useDispatch } from "react-redux";
import { loadMoreProducts } from "features/products/productsSlice";
import { useSelectorsForCreatedProducts } from "hooks/useSelectorsForCreatedProducts";
import { EditProductModal } from "components/EditProductModal/EditProductModal";
import { makeArrayOfSelectedOrigins } from "helpers/arrayFromSelectedOrigins";
import { useQueryParamsProducts } from "hooks/useQueryParamsProducts";
import { fetchProductsThunk } from "features/products/thunks";

import { IProduct } from "../../types/types";
import { useModal } from "../../hooks/useModal";
import { Pagination } from "../../components/Pagination/Pagination";

import s from "./CreatedProducts.module.scss";

export const CreatedProducts: React.FC = () => {
  const { params, isProductCereated, productsStatus, products, range, isDebouncing } =
    useSelectorsForCreatedProducts();
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

  const [editProduct, setEditProduct] = useState<IProduct>({
    isEditable: false,
    id: "",
    name: "",
    price: 0,
    origin: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const { state: isOpen, setOpen, setClose } = useModal(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsThunk({
        page: currentPageQuery,
        isEditable: true,
        perPage: perPageQuery,
        minPrice: minPriceQuery,
        maxPrice: maxPriceQuery,
        origins: originsQuery,
      })
    );
  }, [currentPageQuery, perPageQuery, minPriceQuery, originsQuery, maxPriceQuery]);

  const handlePaginationChange = useCallback(
    (page: number) => {
      dispatch(loadMoreProducts(page));
      setCurrentPageQuery(page);
    },
    [params.page]
  );

  const handleEditClick = (item: IProduct) => {
    setEditProduct(item);
    setOpen();
  };

  return (
    <div className={s["created-products"]}>
      <div className={s["created-products__filters"]}>
        <FilterProductsPerPage perPage={perPageQuery} setPerPageQuery={setPerPageQuery} />
        <FilterByOrigins
          setSelectedOriginsQuery={setOriginsQuery}
          selectedOriginsQuery={originsQuery ? makeArrayOfSelectedOrigins(originsQuery) : []}
        />
        <FilterByPrice
          minPriceQuery={minPriceQuery}
          maxPriceQuery={maxPriceQuery}
          setMinPriceQuery={setMinPriceQuery}
          setMaxPriceQuery={setMaxPriceQuery}
          setPageQuery={setCurrentPageQuery}
        />
      </div>
      {(productsStatus === PENDING && isProductCereated !== "start") || isDebouncing ? (
        <Loader />
      ) : (
        <>
          <div className={s["created-products__body"]}>
            <ProductsList
              productsList={products}
              button={{ text: "EDIT", handleFunction: handleEditClick }}
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
      {isOpen && <EditProductModal setClose={setClose} product={editProduct} />}
    </div>
  );
};
