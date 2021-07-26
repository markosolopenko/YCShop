import { changeAmountOfPorductsPerPage, setIsDebouncing } from "features/products/productsSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { debounce } from "../../helpers/debounce";
import s from "./FilterProductsPerPage.module.scss";

const options: { value: string; label: string }[] = [
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

  const clickHandler = debounce((value: number) => {
    dispatch(setIsDebouncing(false));
    dispatch(changeAmountOfPorductsPerPage(value));
    setPerPageQuery(value);
  }, 1000);

  const handleInputChange = useCallback((e: { value: string; label: string } | null) => {
    dispatch(setIsDebouncing(true));
    clickHandler(Number(e?.value));
  }, []);

  return (
    <div className={s["filter-perPage"]}>
      <div className={s["filter-perPage__label"]}>Filter amount of products per page</div>
      <Select
        options={options}
        defaultValue={{ value: perPage.toString(), label: perPage.toString() }}
        onChange={handleInputChange}
      />
    </div>
  );
};
