import { operators } from "constants/operators";
import { IProduct, IProductsInCart } from "../types/types";

export const addToCart = (
  productsInCart: IProductsInCart[],
  product: IProduct,
  operator: string,
  amount: number
): IProductsInCart[] => {
  let flag = false;
  const { plus, minus } = operators;
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].product.id === product.id) {
      if (operator === plus) {
        productsInCart[i].amount += 1;
      } else if (operator === minus) {
        productsInCart[i].amount -= 1;
      } else {
        productsInCart[i].amount = amount;
      }
      flag = true;
      break;
    }
  }
  if (!flag) {
    productsInCart.push({ amount, product: product });
  }

  return productsInCart;
};
