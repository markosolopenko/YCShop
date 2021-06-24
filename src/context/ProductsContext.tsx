import React, { createContext, useReducer } from "react";

import {
  ADD_TO_CART,
  CHANGE_CART_COUNTS,
  DELETE_ITEM_FROM_CART,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  LOAD_MORE,
} from "actionTypes/products";
import { addToCart } from "helpers/addToCart";
import { changeCartCounts } from "helpers/changeCartCounts";
import { IProductsContext } from "./types";
import { IProduct, IProducts } from "../types/types";

type Action =
  | { type: "FETCH_PRODUCTS"; payload: IProducts }
  | { type: "FETCH_PRODUCT_BY_ID"; payload: IProduct }
  | { type: "ADD_TO_CART"; payload: { product: IProduct; operator: string; amount: number } }
  | { type: "LOAD_MORE" }
  | { type: "CHANGE_CART_COUNTS"; payload: { count: number; sum: number; operator: string } }
  | { type: "DELETE_ITEM_FROM_CART"; payload: string };

const initialState: IProductsContext = {
  products: [],
  product: null,
  productsAddedToCart: [],
  currentPage: 1,
  perPage: 50,
  totalItems: 0,
  allItemsInCartAmount: 0,
  allItemsInCartSum: 0,
};

export const ProductsContextState = createContext<IProductsContext>(initialState);

export const ProductsContextDispatch = createContext<any>(null);

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      const { items, totalItems } = action.payload;
      return {
        ...state,
        products: [...state.products, ...items],
        totalItems: totalItems,
      };
    }
    case FETCH_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_TO_CART: {
      const { product, operator, amount } = action.payload;
      return {
        ...state,
        productsAddedToCart: addToCart(state.productsAddedToCart, product, operator, amount),
      };
    }
    case CHANGE_CART_COUNTS: {
      const { count, sum, operator } = action.payload;
      const previousState: { count: number; sum: number } = {
        count: state.allItemsInCartAmount,
        sum: state.allItemsInCartSum,
      };
      const { allItemsInCartAmount, allItemsInCartSum } = changeCartCounts(
        count,
        sum,
        operator,
        previousState
      );
      return {
        ...state,
        allItemsInCartAmount,
        allItemsInCartSum,
      };
    }
    case LOAD_MORE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        productsAddedToCart: state.productsAddedToCart.filter(
          (item) => item.product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const ProductsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  return (
    <ProductsContextState.Provider value={state}>
      <ProductsContextDispatch.Provider value={dispatch}>
        {children}
      </ProductsContextDispatch.Provider>
    </ProductsContextState.Provider>
  );
};
