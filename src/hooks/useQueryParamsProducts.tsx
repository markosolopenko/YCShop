import { useQueryState } from "react-router-use-location-state";
import { IProductParams } from "types/types";

type TReturnTypeQuery = {
  currentPageQuery: number;
  setCurrentPageQuery: (page: number) => void;
  perPageQuery: number;
  setPerPageQuery: (perPage: number) => void;
  minPriceQuery: string;
  setMinPriceQuery: (minPrice: string) => void;
  maxPriceQuery: string;
  setMaxPriceQuery: (maxPrice: string) => void;
  originsQuery: string;
  setOriginsQuery: (origins: string) => void;
};

export const useQueryParamsProducts = (initialStates: IProductParams): TReturnTypeQuery => {
  const { page, perPage, minPrice, maxPrice, origins } = initialStates;
  const [currentPageQuery, setCurrentPageQuery] = useQueryState("page", page);
  const [perPageQuery, setPerPageQuery] = useQueryState("perPage", perPage);
  const [originsQuery, setOriginsQuery] = useQueryState("origins", origins);
  const [minPriceQuery, setMinPriceQuery] = useQueryState("minPrice", minPrice);
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState("maxPrice", maxPrice);

  return {
    currentPageQuery,
    setCurrentPageQuery,
    perPageQuery,
    setPerPageQuery,
    minPriceQuery,
    setMinPriceQuery,
    maxPriceQuery,
    setMaxPriceQuery,
    originsQuery,
    setOriginsQuery,
  };
};
