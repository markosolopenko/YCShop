import React from "react";

import { IPropsModal } from "./types";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import s from "./Modal.module.scss";

export const Modal: React.FC<IPropsModal> = ({ title, handleCancelClick, children }) => {
  return (
    <div className={s.modal}>
      <div className={s.modal__title}>
        <div className={s.modal__title__h2}>{title}</div>
        <div className={s.modal__title__icon} onClick={handleCancelClick}>
          <Cancel />
        </div>
      </div>
      <div className={s.modal__content}>{children}</div>
    </div>
  );
};
