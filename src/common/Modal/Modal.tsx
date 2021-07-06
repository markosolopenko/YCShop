import React from "react";
import cn from "classnames";
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
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
