export interface IFormData {
  name: string;
  price: number;
  origin: string;
}

export type TProps = {
  values: { name: string; price: number | string; origin: string };
  buttons: {
    text: string;
    style: string;
  }[];
  submitHandler: (data: IFormData) => void;
};
