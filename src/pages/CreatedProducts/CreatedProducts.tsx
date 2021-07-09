import React, { useEffect } from "react";
import { FilterByOrigins } from "components/FilterByOrigins/FilterByOrigins";
import { FilterByPrice } from "components/FilterByPrice/FilterByPrice";
import { FilterProductsPerPage } from "components/FilterProductsPerPage/FilterProductsPerPage";
import { Loader } from "components/Loader/Loader";
import { ProductsList } from "components/ProductsList/ProductsList";
import { PENDING } from "constants/status";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditable } from "features/products/productsSlice";
import { getParams, getProductsList, getRange, getStatus } from "features/products/selectors";
import { ProductModal } from "components/ProductModal/ProductModal";
import { useState } from "react";
import { IProduct } from "../../types/types";
import { useModal } from "../../hooks/useModal";
import { Pagination } from "../../components/Pagination/Pagination";
import { IFormData } from "../../components/ProductForm/types";

import s from "./CreatedProducts.module.scss";
import { updateProductThunk } from "../../features/products/thunks";

const buttons = [
  { text: "Reset", style: "reset" },
  { text: "Submit", style: "submit" },
];

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
  }, [dispatch]);

  const handlePaginationChange = () => {};

  const handleEditClick = (item: IProduct) => {
    setOpen();
    setEditProduct(item);
  };
  const handleSubmitClick = (data: IFormData) => {
    const { name, price, origin } = data;
    dispatch(updateProductThunk({ id: editProduct.id, product: { name, price, origin } }));
    setClose();
  };

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
        <ProductsList
          productsList={products}
          button={{ text: "EDIT", handleFunction: handleEditClick }}
        />
      </div>
      {range > 0 && (
        <Pagination onChange={handlePaginationChange} activePage={params.page} totalPages={range} />
      )}
      {isOpen && (
        <ProductModal
          setClose={setClose}
          buttons={buttons}
          values={{
            name: editProduct.name,
            price: editProduct.price,
            origin: editProduct.origin,
          }}
          onSubmit={handleSubmitClick}
        />
      )}
    </div>
  );
};
