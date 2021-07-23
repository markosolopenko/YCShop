import {
  getParams,
  getProductsList,
  getRange,
  getSelectedOrigins,
  getStatus,
  selectIsProductCreated,
} from "features/products/selectors";
import { ISelectedOrigins } from "features/products/types";
import { useSelector } from "react-redux";
import { IProduct, IProductParams } from "types/types";

type TReturnType = {
  products: IProduct[];
  productsStatus: string | null;
  range: number;
  params: IProductParams;
  isProductCereated: string;
  selectedOrigins: ISelectedOrigins[];
};

export const useSelectorsForCreatedProducts = (): TReturnType => {
  const products = useSelector(getProductsList);
  const status = useSelector(getStatus);
  const range = useSelector(getRange);
  const params = useSelector(getParams);
  const isProductCereated = useSelector(selectIsProductCreated);
  const selectedOrigins = useSelector(getSelectedOrigins);

  return { products, productsStatus: status, range, params, isProductCereated, selectedOrigins };
};
