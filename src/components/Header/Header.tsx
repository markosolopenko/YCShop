import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";

import s from "./Header.module.scss";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: "/products" },
  { id: 2, content: "Details", route: "/details" },
  { id: 3, content: "Linkboss", route: "/d" },
  { id: 4, content: "Linkloss", route: "/f" },
];

export const Header: React.FC = () => {
  const [pathname, setPathName] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>

      <ul className={s.header__navbar}>
        {navbarItems.map((item) => {
          return (
            <Link
              to={item.route}
              key={item.id}
              className={s.header__navbar__item}
              style={{
                backgroundColor: pathname === item.route ? "#94D2BD" : "#0a9396",
              }}
            >
              <li>{item.content}</li>
            </Link>
          );
        })}
        <Cart />
      </ul>
    </div>
  );
};
