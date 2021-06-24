import { operators } from "constants/operators";
import { IProduct, IProductsInCart } from "../types/types";

export const addToCart = (
  productsInCart: IProductsInCart[],
  product: IProduct,
  operator: string,
  amount: number
): IProductsInCart[] => {
  let flag = false;
  const { plus } = operators;
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].product.id === product.id) {
      if (operator === plus) {
        productsInCart[i].amount += amount;
      } else {
        productsInCart[i].amount -= 1;
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
