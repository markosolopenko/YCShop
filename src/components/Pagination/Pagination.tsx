import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import s from "./Pagination.module.scss";

export interface IPaginationProps {
  onChange: (page: number) => void;
  activePage: number;
  totalPages: number;
}

export const Pagination: React.FC<IPaginationProps> = ({ onChange, activePage, totalPages }) => {
  const handleArrowsClick = () => {};
  const [paginItems, setPaginItems] = useState([1, 2, 3, 4, "...", totalPages]);

  const handlepaPignationsChanges = (page: number | string) => {
    if (typeof page === "number") {
      if (page >= 3 && page <= totalPages - 2) {
        setPaginItems([1, "...", page - 1, page, page + 1, "...", totalPages]);
      } else if (page >= totalPages - 2 && page < totalPages) {
        setPaginItems([1, "...", page - 2, page - 1, page, totalPages]);
      } else if (page === totalPages) {
        setPaginItems([1, "...", page - 3, page - 2, page - 1, totalPages]);
      }
      onChange(page);
    }
  };
  return (
    <div className={s.pagination}>
      <div className={s.pagination__arrow}>
        <ArrowLeft className={s.pagination__arrow__icon} />
      </div>
      <div className={s.pagination__pages}>
        {paginItems.map((item) => {
          return (
            <div
              className={s.pagination__pages__page}
              key={item}
              onClick={() => handlepaPignationsChanges(item)}
              style={{ backgroundColor: item === activePage ? "blue" : "orange" }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className={s.pagination__arrow}>
        <ArrowRight className={s.pagination__arrow__icon} />
      </div>
    </div>
  );
};
