import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useForm, useFormState } from "react-hook-form";
import s from "./ProductForm.module.scss";
import { getOrigins } from "../../features/products/selectors";
import { TProps, IFormData } from "./types";

export const PorductForm: React.FC<TProps> = ({ values, buttons, submitHandler }) => {
  const origins = useSelector(getOrigins);
  const originsForShema = useMemo(() => {
    return origins.map((origin) => origin.value);
  }, [origins]);

  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(30),
    price: yup.number().required().positive().integer(),
    origin: yup.string().required().oneOf(originsForShema, "Invalid Origin!!!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormData>({ resolver: yupResolver(schema), defaultValues: values });

  const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => {
    submitHandler(data);
  });
  const handleResetClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  }, []);

  return (
    <form className={s.form}>
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
      <div className={s.form__buttons}>
        {buttons.map((button, index) => {
          return (
            <button
              onClick={button.style === "submit" ? onSubmit : handleResetClick}
              key={index}
              className={cn(s.form__buttons__button, {
                [s.submit]: button.style === "submit",
                [s.reset]: button.style === "reset",
                [s.disabled]: button.style === "submit" && !isDirty,
              })}
              disabled={!isDirty}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </form>
  );
};
