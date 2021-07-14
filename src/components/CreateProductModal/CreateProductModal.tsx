import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../common/Modal/Modal";
import { Portal } from "../../common/Portal/Portal";
import { TProps } from "./types";
import { PorductForm } from "../ProductForm/ProductForm";
import { createNewProduct } from "../../features/products/productsSlice";
import { IFormData } from "../ProductForm/types";
import { createProductThunk } from "../../features/products/thunks";

const buttons = [{ text: "Create", style: "submit" }];
const values = { name: "", price: 0, origin: "..." };

export const CreateProductModal: React.FC<TProps> = ({ setClose }) => {
  const handleCloseClick = () => {
    setClose();
  };
  const dispatch = useDispatch();

  const onSubmit = (data: IFormData) => {
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
  };
  return (
    <Portal className="modal__create" element="div">
      <Modal title="Create new Product" handleCancelClick={handleCloseClick}>
        <PorductForm values={values} buttons={buttons} submitHandler={onSubmit} />
      </Modal>
    </Portal>
  );
};
