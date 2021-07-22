import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPortal } from "components/ProductPortal/ProductPortal";
import {
  selectCreatedProducts,
  selectIsProductCreated,
  selectProductError,
} from "features/products/selectors";
import { openNotificationWithIcon } from "helpers/notification";
import { TProps } from "./types";
import { createNewProduct, cleareCreatedProducts } from "../../features/products/productsSlice";
import { IFormData } from "../ProductForm/types";
import { createProductThunk } from "../../features/products/thunks";

const values = { name: "", price: 0, origin: "..." };

export const CreateProductModal: React.FC<TProps> = ({ setClose }) => {
  const dispatch = useDispatch();
  const isProductCreated = useSelector(selectIsProductCreated);
  const cretaedProducts = useSelector(selectCreatedProducts);
  const errorMessage = useSelector(selectProductError);

  useEffect(() => {
    if (cretaedProducts.length > 0) {
      if (isProductCreated === "success") {
        openNotificationWithIcon("success", "Create product", "Product has been created!");
        setClose();
      } else {
        openNotificationWithIcon(
          "error",
          "Create product",
          typeof errorMessage === "string" ? errorMessage : "Something went wrong!!!"
        );
      }
      dispatch(cleareCreatedProducts());
    }
  }, [isProductCreated, errorMessage]);

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
