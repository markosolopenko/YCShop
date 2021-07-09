import { createSlice } from "@reduxjs/toolkit";
import { PENDING, FULFILLED, REJECTED } from "constants/status";

import { addToCart } from "helpers/addToCart";
import { changeCartCounts } from "helpers/changeCartCounts";

import {
  createProductThunk,
  fetchProductByIdThunk,
  fetchProductsThunk,
  getOriginsThunk,
} from "./thunks";
import { IProductsSliceState } from "./types";
import { updateProductThunk } from "./thunks";

const initialState: IProductsSliceState = {
  status: null,
  products: [],
  product: null,
  productsAddedToCart: [],
  currentPage: 1,
  perPage: 10,
  totalItems: 0,
  allItemsInCartAmount: 0,
  allItemsInCartSum: 0,
  error: null,
  origins: [],
  selectedOrigins: [],
  minPrice: "",
  maxPrice: "",
  isEditable: false,
  createdProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addToCartAction(state, action) {
      const { product, operator, amount } = action.payload;
      state.productsAddedToCart = addToCart(state.productsAddedToCart, product, operator, amount);
    },
    changeCartCountsAtion(state) {
      const { sum, count } = changeCartCounts(state.productsAddedToCart);
      state.allItemsInCartAmount = count;
      state.allItemsInCartSum = sum;
    },
    loadMoreProducts(state, action) {
      state.currentPage = action.payload;
    },
    deleteFromCart(state, action) {
      state.productsAddedToCart = state.productsAddedToCart.filter(
        (item) => item.product.id !== action.payload
      );
    },
    setSlectedOrigins(state, action) {
      state.selectedOrigins = action.payload;
    },
    setRangePrices(state, action) {
      const { min, max } = action.payload;

      state.minPrice = min;
      state.maxPrice = max;
    },
    changeAmountOfPorductsPerPage(state, action) {
      state.perPage = action.payload;
    },
    setIsEditable(state, action) {
      state.isEditable = action.payload;
      state.products = [];
      state.minPrice = "";
      state.maxPrice = "";
      state.currentPage = 1;
      state.perPage = 10;
    },
    updateProductInList(state, action) {
      const { id, product } = action.payload;
      const { name, price, origin } = product;
      state.products = state.products.map((item) =>
        item.id === id ? { ...item, name, price, origin } : item
      );
    },
    createNewProduct(state, action) {
      state.createdProducts = [...state.createdProducts, action.payload];
      state.products = [...state.products, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        const { items, totalItems } = action.payload;
        state.status = FULFILLED;
        state.products = items;
        state.totalItems = totalItems;
      })
      .addCase(fetchProductsThunk.rejected, (state) => {
        state.error = "Error fetchProducts";
        state.status = REJECTED;
      });
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = FULFILLED;
      })
      .addCase(fetchProductByIdThunk.rejected, (state) => {
        state.status = REJECTED;
        state.error = "Error fetchProductById";
      });
    builder.addCase(getOriginsThunk.fulfilled, (state, action) => {
      state.origins = action.payload.items;
    });
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(createProductThunk.fulfilled, (state) => {
        state.status = FULFILLED;
      })
      .addCase(createProductThunk.rejected, (state) => {
        state.status = REJECTED;
        state.error = "Erorr createProduct";
      });
    builder
      .addCase(updateProductThunk.fulfilled, (state) => {
        state.status = FULFILLED;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(updateProductThunk.rejected, (state) => {
        state.status = REJECTED;
        state.error = "Error updateProduct";
      });
  },
});

export default productsSlice.reducer;

export const {
  setSlectedOrigins,
  addToCartAction,
  deleteFromCart,
  changeCartCountsAtion,
  loadMoreProducts,
  setRangePrices,
  changeAmountOfPorductsPerPage,
  setIsEditable,
  updateProductInList,
  createNewProduct,
} = productsSlice.actions;
