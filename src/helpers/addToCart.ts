import { IProduct, IProductsInCart } from "common/types/types";

export const addToCart = (productsInCart: IProductsInCart[], product: IProduct): any => {
  let flag = false;
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].product.id === product.id) {
      productsInCart[i].amount += 1;
      flag = true;
      break;
    }
  }
  if (!flag) {
    productsInCart.push({ amount: 1, product: product });
  }

  return productsInCart;
};
