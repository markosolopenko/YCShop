import { IProduct, IProductsInCart } from "common/types/types";

export const addToCart = (
  productsInCart: IProductsInCart[],
  product: IProduct,
  operator: string,
  amount: number
): any => {
  let flag = false;
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].product.id === product.id) {
      if (operator === "+") {
        productsInCart[i].amount += amount;
      } else if (operator === "-") {
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
