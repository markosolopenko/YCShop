import { getAllItemsInCartSum, getProductsAddedToCart } from "features/products/selectors";
import { formatMoney } from "helpers/formatMoney";
import { useSelector } from "react-redux";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const productsAddedToCart = useSelector(getProductsAddedToCart);
  const allItemsInCartSum = useSelector(getAllItemsInCartSum);

  return (
    <div className={s["products-cart"]}>
      <div className={s["products-cart__box"]}>
        {productsAddedToCart.map((item) => {
          return <ProductInCart item={item} key={item.product.id} />;
        })}
      </div>
      <div className={s["products-cart__total"]}>Total: {formatMoney(allItemsInCartSum)}</div>
    </div>
  );
};
