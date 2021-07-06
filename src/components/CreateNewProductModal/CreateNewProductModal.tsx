import { getOrigins } from "features/products/selectors";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createProductThunk } from "features/products/thunks";
import { Modal } from "../../common/Modal/Modal";
import { Portal } from "../../common/Portal/Portal";
import s from "./CreateNewProductModal.module.scss";
import { IFormData, TProps } from "./types";

const buttons = [{ text: "Create", style: "submit" }];

export const CreateNewProductModal: React.FC<TProps> = ({ setClose }) => {
  const origins = useSelector(getOrigins);
  const dispatch = useDispatch();
  const originsForShema = useMemo(() => {
    return origins.map((origin) => origin.value);
  }, [origins]);

  const handleCloseClick = () => {
    setClose();
  };

  const schema = Yup.object().shape({
    name: Yup.string().min(3).max(30).required(),
    price: Yup.number().required().positive().integer(),
    origin: Yup.string().oneOf(originsForShema, "Invalid Origin!!!").required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    const { name, price, origin } = data;
    dispatch(createProductThunk({ name, price, origin }));
    setClose();
  });

  return (
    <Portal className="modal__create" element="div">
      <Modal
        title="Create new Product"
        buttons={buttons}
        handleCancelClick={handleCloseClick}
        onSubmit={onSubmit}
      >
        <form action="" className={s.form}>
          <label className={s.form__label}>Name</label>
          <input {...register("name")} className={s.form__input} placeholder="Product name" />
          <div className={s.form__errors}>{errors.name?.message}</div>

          <label className={s.form__label}>Price</label>
          <input
            {...register("price")}
            type="number"
            className={s.form__input}
            placeholder="Product price"
          />
          <div className={s.form__errors}>{errors.price?.message}</div>

          <label className={s.form__label}>Origin</label>
          <select {...register("origin")} className={s["form__origin-select"]}>
            <option value="...">...</option>
            {origins.map((origin, index) => {
              return (
                <option key={index} value={origin.value}>
                  {origin.displayName}
                </option>
              );
            })}
          </select>
          <div className={s.form__errors}>{errors.origin?.message}</div>
        </form>
      </Modal>
    </Portal>
  );
};
