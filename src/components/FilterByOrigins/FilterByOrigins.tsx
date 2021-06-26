import { RootState } from "core/store";
import { setSlectedOrigins } from "features/products/productsSlice";
import { ISelectedOrigins } from "features/products/types";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

export const FilterByOrigins: React.FC = () => {
  const { origins } = useSelector((state: RootState) => state.products);
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

  const handleSelect = useCallback((selected: ISelectedOrigins[] | any) => {
    dispatch(setSlectedOrigins(selected));
  }, []);

  return (
    <div className="filter-by-origins" style={{ flex: 0.3 }}>
      <div style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "5px" }}>
        Filter By Origin
      </div>
      <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelect}
      />
    </div>
  );
};
