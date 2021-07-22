export interface IFormData {
  name: string;
  price: number;
  origin: string;
}

export type TProps = {
  values: { name: string; price: number; origin: string };
  submitHandler: (data: IFormData) => void;
};
