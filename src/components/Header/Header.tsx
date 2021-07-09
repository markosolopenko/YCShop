import { Link, useLocation } from "react-router-dom";

import { Routes } from "constants/routes";
import cn from "classnames";

import { useModal } from "hooks/useModal";
import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";
import { CreateProductModal } from "../CreateProductModal/CreateProductModal";

import s from "./Header.module.scss";

const { PRODUCTS, PRODUCT_DEATAILS, CREATED_PRODUCTS } = Routes;
const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: PRODUCTS },
  { id: 2, content: "Details", route: PRODUCT_DEATAILS },
  { id: 3, content: "Created Products", route: CREATED_PRODUCTS },
];

export const Header: React.FC = () => {
  const location = useLocation();

  const { state: isOpen, setOpen, setClose } = useModal(false);
  const handleOpenModalClick = () => {
    setOpen();
  };

  return (
    <div className={s.header}>
      <div className={s.header__logo}>
        <div className={s.header__logo__text}>Yalantis Shop</div>
      </div>
      <div className={s.header__blocks}>
        <div className={s.header__blocks__modal} onClick={handleOpenModalClick}>
          Create Product
        </div>
      </div>
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
              <div className={s.header__navbar__item__content}>{item.content}</div>
            </Link>
          );
        })}
        {location.pathname !== Routes.PRODUCTS_CART && <Cart />}
      </div>
      {isOpen && <CreateProductModal setClose={setClose} />}
    </div>
  );
};
