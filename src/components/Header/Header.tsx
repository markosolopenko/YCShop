import { useState } from "react";
import { Link } from "react-router-dom";

import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";

import s from "./Header.module.scss";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: "/products" },
  { id: 2, content: "Link", route: "/s" },
  { id: 3, content: "Link", route: "/d" },
  { id: 4, content: "Link", route: "/f" },
];

export const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState(1);

  const setActiveLinkHandler = (id: number) => {
    setActiveLink(id);
  };
  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>

      <ul className={s.header__navbar}>
        {navbarItems.map((item) => {
          return (
            <li
              onClick={() => setActiveLinkHandler(item.id)}
              className={s.header__navbar__item}
              key={item.id}
              style={{
                backgroundColor: item.id === activeLink ? "#94D2BD" : "#0a9396",
              }}
            >
              <Link className={s.link} to={item.route}>
                {item.content}
              </Link>
            </li>
          );
        })}
        <Cart />
      </ul>
    </div>
  );
};
