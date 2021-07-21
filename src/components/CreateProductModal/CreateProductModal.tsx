import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ProductPortal } from "components/ProductPortal/ProductPortal";
import { TProps } from "./types";
import { createNewProduct } from "../../features/products/productsSlice";
import { IFormData } from "../ProductForm/types";
import { createProductThunk } from "../../features/products/thunks";

const values = { name: "", price: 0, origin: "..." };

export const CreateProductModal: React.FC<TProps> = ({ setClose }) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback((data: IFormData) => {
    const { name, price, origin } = data;
    dispatch(createProductThunk({ name, price, origin }));
    dispatch(
      createNewProduct({
        isEditable: true,
        id: "",
        name,
        price,
        origin,
        createdAt: Date(),
        updatedAt: Date(),
      })
    );
    setClose();
  }, []);
  return (
    <ProductPortal
      values={values}
      onSubmit={onSubmit}
      className="create_modal"
      title="Create Porduct"
      element="div"
      setClose={setClose}
    />
  );
};
