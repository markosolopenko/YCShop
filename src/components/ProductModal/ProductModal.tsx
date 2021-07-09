import React from "react";

import { Modal } from "../../common/Modal/Modal";
import { Portal } from "../../common/Portal/Portal";
import { TProps } from "./types";
import { PorductForm } from "../ProductForm/ProductForm";

export const ProductModal: React.FC<TProps> = ({ setClose, buttons, values, onSubmit }) => {
  const handleCloseClick = () => {
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
