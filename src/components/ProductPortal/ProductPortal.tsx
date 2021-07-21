import React from "react";
import { Modal } from "common/Modal/Modal";
import { Portal } from "common/Portal/Portal";
import { PorductForm } from "components/ProductForm/ProductForm";
import { TProps } from "./types";

export const ProductPortal = ({
  values,
  setClose,
  onSubmit,
  className,
  title,
  element,
}: TProps): JSX.Element => {
  return (
    <Portal className={className} element={element}>
      <Modal title={title} handleCancelClick={setClose}>
        <PorductForm values={values} submitHandler={onSubmit} />
      </Modal>
    </Portal>
  );
};
