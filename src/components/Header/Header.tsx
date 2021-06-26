import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { linksStyles } from "constants/styles";
import { Routes } from "constants/routes";
import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";

import s from "./Header.module.scss";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: "/products" },
  { id: 2, content: "Details", route: "/details" },
];

export const Header: React.FC = () => {
  const [pathname, setPathName] = useState("");
  const location = useLocation();
  const { ACIVE_LINK, NOT_ACTIVE } = linksStyles;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>

      <div className={s.header__navbar}>
        {navbarItems.map((item) => {
          return (
            <Link
              to={item.route}
              key={item.id}
              className={s.header__navbar__item}
              style={{
                backgroundColor: pathname === item.route ? ACIVE_LINK : NOT_ACTIVE,
              }}
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
