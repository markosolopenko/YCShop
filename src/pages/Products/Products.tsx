import { useRef } from "react";
import s from "./Products.module.scss";

export const Products: React.FC = () => {
  const body: React.RefObject<HTMLDivElement> | null = useRef(null);
  const scrollToBody = () => {
    if (body.current) {
      body.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  return (
    <div className={s.products}>
      <div className={s.products__top}>
        <div className={s.products__top__aboveImg}>
          <div className={s.products__top__aboveImg__content}>
            <div className={s.products__top__aboveImg__content__text}>
              Welcome to <span className={s.logo}>YALANTIS SHOP</span>
            </div>
            <button
              onClick={scrollToBody}
              className={s.products__top__aboveImg__content__button}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className={s.products__body} ref={body}></div>
    </div>
  );
};
