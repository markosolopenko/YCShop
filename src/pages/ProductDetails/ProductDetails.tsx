import { useContext } from "react";
import { ProductsContextState } from "context/ProductsContext";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { Counter } from "../../components/Counter/Counter";
import s from "./ProductDetails.module.scss";

export const ProductDetails: React.FC = () => {
  const state = useContext(ProductsContextState);
  const { product } = state;

  return (
    <div className={s["prodcut-detils"]}>
      {product && (
        <div className={s["prodcut-detils__product"]}>
          <div className={s["prodcut-detils__product__top"]}>
            <div className={s["prodcut-detils__product__top__item"]}>
              <span className={s["prodcut-detils__product__top__item__span"]}>Name: </span>
              {product.name}
            </div>
            <div className={s["prodcut-detils__product__top__item"]}>
              <span className={s["prodcut-detils__product__top__item__span"]}>Price: </span>
              {product.price}$
            </div>
          </div>
          <div className={s["prodcut-detils__product__body"]}>
            <div className={s["prodcut-detils__product__body__info"]}>
              <div className={s["prodcut-detils__product__body__info__item"]}>
                <span className={s["prodcut-detils__product__body__info__item__span"]}>
                  Origin:
                </span>
                {product.origin.toUpperCase()}
              </div>
              <div className={s["prodcut-detils__product__body__info__item"]}>
                <span className={s["prodcut-detils__product__body__info__item__span"]}>
                  CreatedAt:
                </span>
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Counter startValue={1} product={product} />
            <div className={s["prodcut-detils__product__body__addToCart"]}>
              <div className={s["prodcut-detils__product__body__addToCart__button"]}>
                ADD TO CART
              </div>
              <Cart className={s["prodcut-detils__product__body__addToCart__cart"]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
