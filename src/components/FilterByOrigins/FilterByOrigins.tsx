import { setSlectedOrigins } from "features/products/productsSlice";
import { getOrigins } from "features/products/selectors";
import { ISelectedOrigins } from "features/products/types";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { OptionsType } from "react-select";
import s from "./FilterByOrigins.module.scss";

type TProps = {
  selectedOriginsQuery: ISelectedOrigins[];
  setSelectedOriginsQuery: (origins: string) => void;
};

export const FilterByOrigins: React.FC<TProps> = ({
  selectedOriginsQuery,
  setSelectedOriginsQuery,
}) => {
  const origins = useSelector(getOrigins);
  const dispatch = useDispatch();
  const options = useMemo(
    () =>
      origins.map((origin) =>
        Object({
          value: origin.value,
          label: origin.displayName,
        })
      ),
    [origins]
  );

  const handleSelect = useCallback((selected: OptionsType<ISelectedOrigins>) => {
    dispatch(setSlectedOrigins(selected));
    setSelectedOriginsQuery(selected ? selected.map((item) => item.value).join(",") : "");
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
        defaultValue={selectedOriginsQuery}
      />
    </div>
  );
};
