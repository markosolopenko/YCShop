import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useForm } from "react-hook-form";
import s from "./ProductForm.module.scss";
import { getOrigins } from "../../features/products/selectors";
import { TProps, IFormData } from "./types";

export const PorductForm: React.FC<TProps> = ({ values, buttons, submitHandler }) => {
  const origins = useSelector(getOrigins);

  const originsForShema = useMemo(() => {
    return origins.map((origin) => origin.value);
  }, [origins]);

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
    submitHandler(data);
  });

  const { name, price, origin } = values;

  return (
    <form action="" className={s.form}>
      <label className={s.form__label}>Name</label>
      <input
        {...register("name")}
        className={s.form__input}
        placeholder="Product name"
        defaultValue={name}
      />
      <div className={s.form__errors}>{errors.name?.message}</div>

      <label className={s.form__label}>Price</label>
      <input
        {...register("price")}
        type="number"
        className={s.form__input}
        placeholder="Product price"
        defaultValue={price}
      />
      <div className={s.form__errors}>{errors.price?.message}</div>

      <label className={s.form__label}>Origin</label>
      <select {...register("origin")} className={s["form__origin-select"]} defaultValue={origin}>
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
      <div className={s.form__buttons}>
        {buttons.map((button, index) => {
          return (
            <button
              onClick={onSubmit}
              key={index}
              className={cn(s.form__buttons__button, {
                [s.submit]: button.style === "submit",
                [s.reset]: button.style === "reset",
              })}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </form>
  );
};
