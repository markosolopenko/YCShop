import { RootState } from "core/store";
import { formatMoney } from "helpers/formatMoney";
import { useSelector } from "react-redux";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const { productsAddedToCart, allItemsInCartSum } = useSelector(
    (state: RootState) => state.products
  );
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
