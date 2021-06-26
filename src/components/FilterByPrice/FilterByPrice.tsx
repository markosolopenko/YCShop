import { setRangePrices } from "features/products/productsSlice";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import s from "./FilterByPrice.module.scss";

type TStateValues = {
  min: string;
  max: string;
};
export const FilterByPrice: React.FC = () => {
  const [values, setValues] = useState<TStateValues>({ min: "", max: "" });
  const dispatch = useDispatch();

  const handleInputsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (e.target.placeholder === "min") {
        setValues({ ...values, min: value });
      } else {
        setValues({ ...values, max: value });
      }
    },
    [values]
  );
  const { min, max } = values;
  const handleFilterClick = useCallback(() => {
    if (max !== "" || min !== "") {
      dispatch(setRangePrices(values));
    }
  }, [values]);

  return (
    <div className={s["filter-by-price"]}>
      <div className={s["filter-by-price__label"]}>Filter By Price</div>
      <input
        type="number"
        placeholder="min"
        className={s["filter-by-price__input"]}
        onChange={handleInputsChange}
        value={min}
      />
      <input
        type="number"
        placeholder="max"
        className={s["filter-by-price__input"]}
        onChange={handleInputsChange}
        value={max}
      />
      <button className={s["filter-by-price__button"]} onClick={handleFilterClick}>
        Filter
      </button>
    </div>
  );
};
