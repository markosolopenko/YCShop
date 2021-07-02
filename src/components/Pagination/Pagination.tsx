import { paginationChange } from "helpers/paginationGenerator";
import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
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

  const handleArrowForward = useCallback(() => {
    if (activePage < totalPages) {
      onChange(activePage + 1);
    }
  }, [activePage]);

  const handleArrowBack = useCallback(() => {
    if (activePage > 1) {
      onChange(activePage - 1);
    }
  }, [activePage]);

  const handlePageClick = useCallback((page: number | string) => {
    if (typeof page === "number") {
      onChange(page);
    }
  }, []);

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
              className={cn(s.pagination__pages__page, {
                [s.active]: item === activePage,
                [s.border]: item !== "...",
              })}
              key={index}
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
