import { Link, useLocation } from "react-router-dom";

import { Routes } from "constants/routes";
import cn from "classnames";
import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";

import s from "./Header.module.scss";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: "/products" },
  { id: 2, content: "Details", route: "/details" },
];

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>

      <div className={s.header__navbar}>
        {navbarItems.map((item) => {
          return (
            <Link
              to={item.route}
              key={item.id}
              className={cn(s.header__navbar__item, {
                [s.active]: location.pathname === item.route,
              })}
            >
              <div>{item.content}</div>
            </Link>
          );
        })}
        {location.pathname !== Routes.PRODUCTS_CART && <Cart />}
      </div>
    </div>
  );
};
