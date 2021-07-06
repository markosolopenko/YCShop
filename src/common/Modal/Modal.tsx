import React from "react";
import cn from "classnames";
import { getStatus } from "features/products/selectors";
import { useSelector } from "react-redux";
import { PENDING } from "constants/status";
import { IPropsModal } from "./types";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import s from "./Modal.module.scss";

export const Modal: React.FC<IPropsModal> = ({
  title,
  buttons,
  handleCancelClick,
  children,
  onSubmit,
}) => {
  const handleSubmitClick = () => {
    onSubmit();
  };
  const status = useSelector(getStatus);

  return (
    <div className={s.modal}>
      <div className={s.modal__title}>
        <div className={s.modal__title__h2}>{title}</div>
        <div className={s.modal__title__icon} onClick={handleCancelClick}>
          <Cancel />
        </div>
      </div>
      <div className={s.modal__content}>{children}</div>
      <div className={s.modal__buttons}>
        {buttons.map((button, index) => {
          return (
            <button
              onClick={handleSubmitClick}
              key={index}
              className={cn(s.modal__buttons__button, {
                [s.submit]: button.style === "submit",
                [s.reset]: button.style === "reset",
              })}
              disabled={status === PENDING}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
