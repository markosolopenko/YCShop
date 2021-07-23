import React, { ChangeEvent, useCallback, useState } from "react";
import { loadMoreProducts, setRangePrices } from "features/products/productsSlice";
import { useDispatch } from "react-redux";
import s from "./FilterByPrice.module.scss";

type TStateValues = {
  min: string;
  max: string;
};
type TProps = {
  minPriceQuery: string;
  maxPriceQuery: string;
  setMinPriceQuery: (minPrice: string) => void;
  setMaxPriceQuery: (maxPrice: string) => void;
};

export const FilterByPrice: React.FC<TProps> = ({
  minPriceQuery,
  maxPriceQuery,
  setMinPriceQuery,
  setMaxPriceQuery,
}) => {
  const [values, setValues] = useState<TStateValues>({ min: minPriceQuery, max: maxPriceQuery });
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
    dispatch(loadMoreProducts(1));
    setMinPriceQuery(min);
    setMaxPriceQuery(max);
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
