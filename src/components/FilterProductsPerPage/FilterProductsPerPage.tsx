import { changeAmountOfPorductsPerPage } from "features/products/productsSlice";

import { useDispatch } from "react-redux";
import Select from "react-select";
import s from "./FilterProductsPerPage.module.scss";

const options: { value: string; label: string }[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

export const FilterProductsPerPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e: { value: string; label: string } | null) => {
    dispatch(changeAmountOfPorductsPerPage(Number(e?.value)));
  };

  return (
    <div className={s["filter-perPage"]}>
      <div className={s["filter-perPage__label"]}>Filter amount of products per page</div>
      <Select options={options} defaultValue={options[0]} onChange={handleInputChange} />
    </div>
  );
};
