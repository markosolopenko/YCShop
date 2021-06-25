import { createSlice } from "@reduxjs/toolkit";
import { PENDING, FULFILLED, REJECTED } from "constants/status";
import { addToCart } from "helpers/addToCart";
import { changeCartCounts } from "helpers/changeCartCounts";
import { fetchProductByIdThunk, fetchProductsThunk } from "./thunks";
import { IProductsSliceState } from "./types";

const initialState: IProductsSliceState = {
  status: null,
  products: [],
  product: null,
  productsAddedToCart: [],
  currentPage: 1,
  perPage: 50,
  totalItems: 0,
  allItemsInCartAmount: 0,
  allItemsInCartSum: 0,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
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
    loadMoreProducts(state) {
      state.currentPage += 1;
    },
    deleteFromCart(state, action) {
      state.productsAddedToCart = state.productsAddedToCart.filter(
        (item) => item.product.id !== action.payload
      );
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
        state.products = [...state.products, ...items];
        state.totalItems = totalItems;
      })
      .addCase(fetchProductsThunk.rejected, (state) => {
        state.error = "Error fetchProdcuts";
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
  },
});

export default productsSlice.reducer;

export const { addToCartAction, deleteFromCart, changeCartCountsAtion, loadMoreProducts } =
  productsSlice.actions;
