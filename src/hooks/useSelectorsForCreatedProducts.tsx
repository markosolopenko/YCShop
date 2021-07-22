import {
  getParams,
  getProductsList,
  getRange,
  getStatus,
  selectIsProductCreated,
} from "features/products/selectors";
import { useSelector } from "react-redux";
import { IProduct, IProductParams } from "types/types";

type TReturnType = {
  products: IProduct[];
  productsStatus: string | null;
  range: number;
  params: IProductParams;
  isProductCereated: string;
};

export const useSelectorsForCreatedProducts = (): TReturnType => {
  const products = useSelector(getProductsList);
  const status = useSelector(getStatus);
  const range = useSelector(getRange);
  const params = useSelector(getParams);
  const isProductCereated = useSelector(selectIsProductCreated);

  return { products, productsStatus: status, range, params, isProductCereated };
};
