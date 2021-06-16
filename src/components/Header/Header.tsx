import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Some", route: "/cart" },
  { id: 2, content: "Some", route: "/cart" },
  { id: 3, content: "Some", route: "/cart" },
  { id: 4, content: "Some", route: "/cart" },
  { id: 5, content: "Some", route: "/cart" },
  { id: 6, content: "Some", route: "/cart" },
  { id: 7, content: "Come", route: "/cart" },
  { id: 8, content: <Cart />, route: "/cart" },
];

export const Header: React.FC = () => {
  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>
      <ul className={s.header__navbar}>
        {navbarItems.map((item) => {
          return (
            <Link className="link" to={item.route} key={item.id}>
              <li className={s.header__navbar__item}>{item.content}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
