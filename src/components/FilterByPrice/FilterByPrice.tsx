import { setRangePrices } from "features/products/productsSlice";
import { getParams } from "features/products/selectors";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./FilterByPrice.module.scss";

type TStateValues = {
  min: string;
  max: string;
};
export const FilterByPrice: React.FC = () => {
  const { minPrice, maxPrice } = useSelector(getParams);
  const [values, setValues] = useState<TStateValues>({ min: minPrice || "", max: maxPrice || "" });
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
    dispatch(setRangePrices(values));
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
        min={0}
      />
      <input
        type="number"
        placeholder="max"
        className={s["filter-by-price__input"]}
        onChange={handleInputsChange}
        value={max}
        min={0}
      />
      <button className={s["filter-by-price__button"]} onClick={handleFilterClick}>
        Filter
      </button>
    </div>
  );
};
