import { useQueryState } from "react-router-use-location-state";

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

export const useQueryParamsProducts = (): TReturnTypeQuery => {
  const [currentPageQuery, setCurrentPageQuery] = useQueryState("page", 1);
  const [perPageQuery, setPerPageQuery] = useQueryState("perPage", 10);
  const [originsQuery, setOriginsQuery] = useQueryState("origins", "");
  const [minPriceQuery, setMinPriceQuery] = useQueryState("minPrice", "");
  const [maxPriceQuery, setMaxPriceQuery] = useQueryState("maxPrice", "");

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
