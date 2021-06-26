import { paginationStyles } from "constants/styles";
import { paginationChange } from "helpers/paginationGenerator";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import s from "./Pagination.module.scss";

export interface IPaginationProps {
  onChange: (page: number) => void;
  activePage: number;
  totalPages: number;
}

export const Pagination: React.FC<IPaginationProps> = ({ onChange, activePage, totalPages }) => {
  const [paginItems, setPaginItems] = useState<Array<string | number>>([]);
  const { ACTIVE_PAGE, NOT_ACTIVE_PAGE, PAGE_BORDER } = paginationStyles;

  const handleArrowForward = () => {
    if (activePage < totalPages) {
      onChange(activePage + 1);
    }
  };
  const handleArrowBack = () => {
    if (activePage > 1) {
      onChange(activePage - 1);
    }
  };
  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      onChange(page);
    }
  };

  useEffect(() => {
    setPaginItems(paginationChange(activePage, totalPages));
  }, [activePage, totalPages]);

  return (
    <div className={s.pagination}>
      <div className={s.pagination__arrow} onClick={handleArrowBack}>
        <ArrowLeft className={s.pagination__arrow__icon} />
      </div>
      <div className={s.pagination__pages}>
        {paginItems.map((item, index) => {
          return (
            <div
              className={s.pagination__pages__page}
              key={index}
              style={{
                backgroundColor: item === activePage ? ACTIVE_PAGE : NOT_ACTIVE_PAGE,
                border: item !== "..." ? PAGE_BORDER : "none",
              }}
              onClick={() => handlePageClick(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className={s.pagination__arrow} onClick={handleArrowForward}>
        <ArrowRight className={s.pagination__arrow__icon} />
      </div>
    </div>
  );
};
