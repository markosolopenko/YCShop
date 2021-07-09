import { IFormData } from "../ProductForm/types";
export type TProps = {
  setClose: () => void;
  buttons: { text: string; style: string }[];
  values: { name: string; price: number | string; origin: string };
  onSubmit: (data: IFormData) => void;
};
