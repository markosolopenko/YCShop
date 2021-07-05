import { Link, useLocation } from "react-router-dom";

import { Routes } from "constants/routes";
import cn from "classnames";
import { Portal } from "common/Portal/Portal";
import { useModal } from "hooks/useModal";
import { TNavbarItems } from "./types";
import { Cart } from "../Cart/Cart";
import { Modal } from "../../common/Modal/Modal";

import s from "./Header.module.scss";

const navbarItems: TNavbarItems[] = [
  { id: 1, content: "Products", route: "/products" },
  { id: 2, content: "Details", route: "/details" },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const { state: isOpen, setOpen, setClose } = useModal(false);

  return (
    <div className={s.header}>
      <div className={s.header__logo}>Yalantis Shop</div>
      <div>
        {true && (
          <Portal className="modal__create" element="div">
            <Modal title="Create new Product" buttons={[{ text: "Create", style: "submit" }]}>
              <div>Some</div>
              <div>Some</div>
              <div>Some</div>
              <div>Some</div>
              <div>Some</div>
              <div>Some</div>
              <div>Some</div>
            </Modal>
          </Portal>
        )}
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
              <div>{item.content}</div>
            </Link>
          );
        })}
        {location.pathname !== Routes.PRODUCTS_CART && <Cart />}
      </div>
    </div>
  );
};
