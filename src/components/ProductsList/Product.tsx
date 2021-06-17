import s from "./Product.module.scss";

export const Product: React.FC<any> = ({ item }) => {
  return (
    <div className={s.product}>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Name: </span> {item.name}
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Price: </span> {item.price}$
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Origin: </span> {item.origin.toUpperCase()}
      </div>

      <div className={s.product__buttons}>
        <button className={s.product__buttons__detailBtn}>DETAIL PAGE</button>
        <button className={s.product__buttons__addToCartBtn}>ADD TO CART</button>
      </div>
    </div>
  );
};
