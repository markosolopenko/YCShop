import { IProductsInCart } from "types/types";

type ReturnType = {
  count: number;
  sum: number;
};

export const changeCartCounts = (productsAddedToCart: IProductsInCart[]): ReturnType => {
  let count = 0;
  let sum = 0;
  productsAddedToCart.forEach((item) => {
    count += item.amount;
    sum += item.product.price * item.amount;
  });
  return { sum, count };
};
