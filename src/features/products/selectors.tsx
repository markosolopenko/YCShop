import { createSelector } from "@reduxjs/toolkit";
import { TGetOriginsParams } from "api/productsRequests";
import { RootState } from "core/store";
import { IProduct, IProductsInCart } from "types/types";
import { ISelectedOrigins } from "./types";

export const getProductsList = (state: RootState): IProduct[] => state.products.products;
export const getProduct = (state: RootState): IProduct | null => state.products.product;
export const getProductsAddedToCart = (state: RootState): IProductsInCart[] =>
  state.products.productsAddedToCart;

export const getCurrentPage = (state: RootState): number => state.products.currentPage;
export const getPerPage = (state: RootState): number => state.products.perPage;
export const getTotalItems = (state: RootState): number => state.products.totalItems;
export const getAllItemsInCartAmount = (state: RootState): number =>
  state.products.allItemsInCartAmount;

export const getAllItemsInCartSum = (state: RootState): number => state.products.allItemsInCartSum;
export const getOrigins = (state: RootState): TGetOriginsParams[] => state.products.origins;
export const getSelectedOrigins = (state: RootState): ISelectedOrigins[] =>
  state.products.selectedOrigins;

export const getMinPrice = (state: RootState): string => state.products.minPrice;
export const getMaxPrice = (state: RootState): string => state.products.maxPrice;
export const selectCreatedProducts = (state: RootState): IProduct[] =>
  state.products.createdProducts;

export const getStatus = (state: RootState): string | null => state.products.status;
export const getIsEditable = (state: RootState): boolean => state.products.isEditable;

export const getParams = createSelector(
  getCurrentPage,
  getPerPage,
  getSelectedOrigins,
  getMinPrice,
  getMaxPrice,
  getIsEditable,
  (page, perPage, selectedOrigins, minPrice, maxPrice, isEditable) => ({
    page,
    perPage,
    origins: selectedOrigins || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    isEditable,
  })
);

export const getRange = createSelector(getTotalItems, getPerPage, (totalItems, perPage) =>
  Math.ceil(totalItems / perPage)
);
