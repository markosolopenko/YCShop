import React, { useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { CreatedProducts } from "pages/CreatedProducts/CreatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk, getOriginsThunk } from "features/products/thunks";
import { getParams } from "features/products/selectors";
import { Routes } from "../constants/routes";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { ProductsCart } from "../pages/ProductsCart/ProductsCart";

import { Header } from "../components/Header/Header";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { PRODUCTS, PRODUCT_DEATAILS, PRODUCTS_CART, CREATED_PRODUCTS } = Routes;
  const params = useSelector(getParams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk(params));
  }, [params]);

  useEffect(() => {
    dispatch(getOriginsThunk());
  }, []);

  return (
    <div className={s.app}>
      <Header />
      <Switch>
        <Route path={PRODUCTS} component={Products} />
        <Route path={PRODUCT_DEATAILS} component={ProductDetails} />
        <Route path={PRODUCTS_CART} component={ProductsCart} />
        <Route path={CREATED_PRODUCTS} component={CreatedProducts} />

        <Redirect to={PRODUCTS} />
      </Switch>
    </div>
  );
};

export default App;
