import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/cart.svg";

import s from "./Cart.module.scss";

export const Cart: React.FC = () => {
  return (
    <div className={s["cart-component"]}>
      <Link to="/cart">
        <div className={s.cart}>
          <CartIcon className={s.cart__icon} />
          <div className={s.cart__counter}>0</div>
        </div>
      </Link>
      <div className={s.amountOfMoney}>0$</div>
    </div>
  );
};
