import React, { createContext, Reducer, useReducer } from "react";

import {
  ADD_TO_CART,
  CHANGE_CART_COUNTS,
  DELETE_ITEM_FROM_CART,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  LOAD_MORE,
} from "actionTypes/products";
import { addToCart } from "helpers/addToCart";
import { IProductsContext } from "./types";
import { IProduct, IProducts } from "../common/types/types";

type Action =
  | { type: "FETCH_PRODUCTS"; payload: IProducts }
  | { type: "FETCH_PRODUCT_BY_ID"; payload: IProduct }
  | { type: "ADD_TO_CART"; payload: { product: IProduct; operator: string } }
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
      const { product, operator } = action.payload;
      return {
        ...state,
        productsAddedToCart: addToCart(state.productsAddedToCart, product, operator),
      };
    }
    case CHANGE_CART_COUNTS: {
      const { count, sum, operator } = action.payload;
      return {
        ...state,
        allItemsInCartAmount:
          operator === "+"
            ? state.allItemsInCartAmount + count
            : state.allItemsInCartAmount - count,
        allItemsInCartSum:
          operator === "+" ? state.allItemsInCartSum + sum : state.allItemsInCartSum - sum,
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
  const [state, dispatch] = useReducer<Reducer<any, any>>(productsReducer, initialState);
  return (
    <ProductsContextState.Provider value={state}>
      <ProductsContextDispatch.Provider value={dispatch}>
        {children}
      </ProductsContextDispatch.Provider>
    </ProductsContextState.Provider>
  );
};
