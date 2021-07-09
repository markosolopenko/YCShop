import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../common/Modal/Modal";
import { Portal } from "../../common/Portal/Portal";
import { PorductForm } from "../ProductForm/ProductForm";
import { updateProductInList } from "../../features/products/productsSlice";
import { IFormData } from "../ProductForm/types";
import { updateProductThunk } from "../../features/products/thunks";
import { TPropsEditProduct } from "./types";

const buttons = [
  { text: "Reset", style: "reset" },
  { text: "Submit", style: "submit" },
];

export const EditProductModal: React.FC<TPropsEditProduct> = ({ setClose, product }) => {
  const handleCloseClick = () => {
    setClose();
  };
  const dispatch = useDispatch();

  const handleSubmitClick = (data: IFormData) => {
    const { name, price, origin } = data;
    const obj = { id: product.id, product: { name, price, origin } };
    dispatch(updateProductThunk(obj));
    dispatch(updateProductInList(obj));
    setClose();
  };
  return (
    <Portal className="modal__edit" element="div">
      <Modal title="Edit Product" handleCancelClick={handleCloseClick}>
        <PorductForm values={product} buttons={buttons} submitHandler={handleSubmitClick} />
      </Modal>
    </Portal>
  );
};
