import { ProductsContextDispatch, ProductsContextState } from "context/ProductsContext";
import { useContext } from "react";
import { CHANGE_CART_COUNTS, DELETE_ITEM_FROM_CART } from "actionTypes/products";
import { formatMoney } from "helpers/formatMoney";
import { operators } from "constants/operators";
import { IProductsInCart } from "../../types/types";
import { Counter } from "../../components/Counter/Counter";
import { ReactComponent as DeleteIcon } from "../../assets/trash-alt-solid.svg";
import s from "./ProductsCart.module.scss";

export const ProductsCart: React.FC = () => {
  const state = useContext(ProductsContextState);
  const dispatch = useContext(ProductsContextDispatch);
  const { minus } = operators;

  const { productsAddedToCart, allItemsInCartSum } = state;
  const handleDeleteProduct = (item: IProductsInCart) => {
    dispatch({ type: DELETE_ITEM_FROM_CART, payload: item.product.id });
    dispatch({
      type: CHANGE_CART_COUNTS,
      payload: { count: item.amount, sum: item.amount * item.product.price, operator: minus },
    });
  };
  const handleInputChange = (inputValue: number) => {
    return inputValue;
  };
  return (
    <div className={s["products-cart"]}>
      <div className={s["products-cart__box"]}>
        {productsAddedToCart.map((item) => {
          return (
            <div className={s["products-cart__box__item"]} key={item.product.id}>
              <div className={s["products-cart__box__item__name"]}>
                <span>Name: </span>
                {item.product.name}
              </div>
              <Counter
                startValue={item.amount}
                product={item.product}
                addToCart={true}
                onChange={handleInputChange}
              />
              <div className={s["products-cart__box__item__total"]}>
                {item.product.price}$ x {item.amount} =
                {formatMoney(item.product.price * item.amount)}
              </div>
              <div
                className={s["products-cart__box__item__delete"]}
                onClick={() => handleDeleteProduct(item)}
              >
                <DeleteIcon className={s["products-cart__box__item__delete__icon"]} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={s["products-cart__total"]}>Total: {formatMoney(allItemsInCartSum)}</div>
    </div>
  );
};
