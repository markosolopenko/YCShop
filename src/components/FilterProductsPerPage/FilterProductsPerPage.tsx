import { changeAmountOfPorductsPerPage, setIsDebouncing } from "features/products/productsSlice";
import { useDebounce } from "hooks/useDebounce";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import s from "./FilterProductsPerPage.module.scss";

type TEvent = {
  value: string;
  label: string;
};

const options: TEvent[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

type TProps = {
  perPage: number;
  setPerPageQuery: (perPage: number) => void;
};

export const FilterProductsPerPage: React.FC<TProps> = ({ perPage, setPerPageQuery }) => {
  const dispatch = useDispatch();
  const value = useMemo(() => {
    return {
      value: perPage.toString(),
      label: perPage.toString(),
    };
  }, [perPage]);

  const clickHandler = useDebounce((value: number) => {
    dispatch(setIsDebouncing(false));
    dispatch(changeAmountOfPorductsPerPage(value));
    setPerPageQuery(value);
  });

  const handleInputChange = useCallback((e: TEvent | null) => {
    dispatch(setIsDebouncing(true));
    clickHandler(Number(e?.value));
  }, []);

  return (
    <div className={s["filter-perPage"]}>
      <div className={s["filter-perPage__label"]}>Filter amount of products per page</div>
      <Select options={options} onChange={handleInputChange} defaultValue={value} />
    </div>
  );
};
