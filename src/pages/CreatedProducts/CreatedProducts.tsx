import React, { useEffect, useCallback, useState } from "react";
import { FilterByOrigins } from "components/FilterByOrigins/FilterByOrigins";
import { FilterByPrice } from "components/FilterByPrice/FilterByPrice";
import { FilterProductsPerPage } from "components/FilterProductsPerPage/FilterProductsPerPage";
import { Loader } from "components/Loader/Loader";
import { ProductsList } from "components/ProductsList/ProductsList";
import { PENDING } from "constants/status";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditable, loadMoreProducts } from "features/products/productsSlice";
import { getParams, getProductsList, getRange, getStatus } from "features/products/selectors";
import { EditProductModal } from "components/EditProductModal/EditProductModal";

import { IProduct } from "../../types/types";
import { useModal } from "../../hooks/useModal";
import { Pagination } from "../../components/Pagination/Pagination";

import s from "./CreatedProducts.module.scss";

export const CreatedProducts: React.FC = () => {
  const products = useSelector(getProductsList);
  const status = useSelector(getStatus);
  const range = useSelector(getRange);
  const params = useSelector(getParams);
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
    dispatch(setIsEditable(true));
    return () => {
      dispatch(setIsEditable(false));
    };
  }, [dispatch]);

  const handlePaginationChange = useCallback(
    (page: number) => {
      dispatch(loadMoreProducts(page));
    },
    [params.page]
  );

  const handleEditClick = (item: IProduct) => {
    setOpen();
    setEditProduct(item);
  };

  if (status === PENDING) {
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
        <ProductsList
          productsList={products}
          button={{ text: "EDIT", handleFunction: handleEditClick }}
        />
      </div>
      {range > 0 && (
        <Pagination onChange={handlePaginationChange} activePage={params.page} totalPages={range} />
      )}
      {isOpen && <EditProductModal setClose={setClose} product={editProduct} />}
    </div>
  );
};
