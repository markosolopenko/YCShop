import { setSlectedOrigins } from "features/products/productsSlice";
import { getOrigins } from "features/products/selectors";
import { ISelectedOrigins } from "features/products/types";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import s from "./FilterByOrigins.module.scss";

export const FilterByOrigins: React.FC = () => {
  const origins = useSelector(getOrigins);
  const dispatch = useDispatch();
  const options = useMemo(
    () =>
      origins.map(
        (origin) =>
          new Object({
            value: origin.value,
            label: origin.displayName,
          })
      ),
    [origins]
  );

  const handleSelect = useCallback((selected: ISelectedOrigins[] | unknown) => {
    dispatch(setSlectedOrigins(selected));
  }, []);

  return (
    <div className={s["filter-by-origins"]}>
      <div className={s["filter-by-origins__label"]}>Filter By Origin</div>
      <Select
        isMulti
        name="origins"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelect}
      />
    </div>
  );
};
