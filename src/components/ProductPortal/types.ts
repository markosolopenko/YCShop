import { IFormData } from "components/ProductForm/types";

export type TProps = {
  values: IFormData;
  setClose: () => void;
  onSubmit: (data: IFormData) => void;
  className: string;
  title: string;
  element: string;
};
