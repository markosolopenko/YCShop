import React, { useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Products } from "pages/Products/Products";
import { CreatedProducts } from "pages/CreatedProducts/CreatedProducts";
import { useDispatch } from "react-redux";
import { getOriginsThunk } from "features/products/thunks";

import { Orders } from "pages/Orders/Orders";
import { Routes } from "../constants/routes";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { ProductsCart } from "../pages/ProductsCart/ProductsCart";
import { OrdersDetails } from "../pages/OrdersDetails/OrdersDetails";

import { Header } from "../components/Header/Header";

import s from "./App.module.scss";

export const App: React.FC = () => {
  const { PRODUCTS, PRODUCT_DEATAILS, PRODUCTS_CART, CREATED_PRODUCTS, ORDERS, ORDER_DETAILS } =
    Routes;

  const dispatch = useDispatch();

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
        <Route path={ORDERS} component={Orders} />
        <Route path={ORDER_DETAILS} component={OrdersDetails} />

        <Redirect to={PRODUCTS} />
      </Switch>
    </div>
  );
};

export default App;
