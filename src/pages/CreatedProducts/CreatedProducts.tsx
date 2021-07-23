import React, { useEffect, useCallback, useState } from "react";
import { FilterByOrigins } from "components/FilterByOrigins/FilterByOrigins";
import { FilterByPrice } from "components/FilterByPrice/FilterByPrice";
import { FilterProductsPerPage } from "components/FilterProductsPerPage/FilterProductsPerPage";
import { Loader } from "components/Loader/Loader";
import { ProductsList } from "components/ProductsList/ProductsList";
import { PENDING } from "constants/status";
import { useDispatch } from "react-redux";
import { setIsEditable, loadMoreProducts } from "features/products/productsSlice";
import { useSelectorsForCreatedProducts } from "hooks/useSelectorsForCreatedProducts";
import { EditProductModal } from "components/EditProductModal/EditProductModal";

import { IProduct } from "../../types/types";
import { useModal } from "../../hooks/useModal";
import { Pagination } from "../../components/Pagination/Pagination";

import s from "./CreatedProducts.module.scss";

export const CreatedProducts: React.FC = () => {
  const { params, isProductCereated, productsStatus, products, range, selectedOrigins } =
    useSelectorsForCreatedProducts();
  const [editProduct, setEditProduct] = useState<IProduct>({
    isEditable: false,
    id: "",
    name: "",
    price: 0,
    origin: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const { state: isOpen, setOpen, setClose } = useModal(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsEditable(true));
    return () => {
      dispatch(setIsEditable(false));
    };
  }, [dispatch]);

  const handlePaginationChange = useCallback(
    (page: number) => {
      dispatch(loadMoreProducts(page));
    },
    [params.page]
  );

  const handleEditClick = (item: IProduct) => {
    setOpen();
    setEditProduct(item);
  };

  if (productsStatus === PENDING && isProductCereated !== "start") {
    return <Loader />;
  }

  return (
    <div className={s["created-products"]}>
      <div className={s["created-products__filters"]}>
        <FilterProductsPerPage perPage={params.perPage} setPerPageQuery={() => {}} />
        <FilterByOrigins
          setSelectedOriginsQuery={() => {}}
          selectedOriginsQuery={selectedOrigins}
        />
        <FilterByPrice
          minPriceQuery={""}
          maxPriceQuery={""}
          setMinPriceQuery={() => {}}
          setMaxPriceQuery={() => {}}
        />
      </div>
      <div className={s["created-products__body"]}>
        <ProductsList
          productsList={products}
          button={{ text: "EDIT", handleFunction: handleEditClick }}
        />
      </div>
      {range > 0 && (
        <Pagination onChange={handlePaginationChange} activePage={params.page} totalPages={range} />
      )}
      {isOpen && <EditProductModal setClose={setClose} product={editProduct} />}
    </div>
  );
};
