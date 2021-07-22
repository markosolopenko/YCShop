import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ProductPortal } from "../ProductPortal/ProductPortal";
import { updateProductInList } from "../../features/products/productsSlice";
import { IFormData } from "../ProductForm/types";
import { updateProductThunk } from "../../features/products/thunks";
import { TPropsEditProduct } from "./types";

export const EditProductModal: React.FC<TPropsEditProduct> = ({ setClose, product }) => {
  const dispatch = useDispatch();

  const handleSubmitClick = useCallback((data: IFormData) => {
    const { name, price, origin } = data;
    const obj = { id: product.id, product: { name, price, origin } };
    dispatch(updateProductThunk(obj));
    dispatch(updateProductInList(obj));
    setClose();
  }, []);
  return (
    <ProductPortal
      values={product}
      setClose={setClose}
      className="modal__edit"
      element="div"
      title="Edit Product"
      onSubmit={handleSubmitClick}
    />
  );
};
