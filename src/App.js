import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

import Loading from "./components/loading";
import Profile from "./components/profile/profile";
import Admin from "./components/admin/admin";
import Home from "./components/home";
import Navbar from "./components/navbar/navbar";
import Products from "./components/products/products";
import ProductForm from "./components/products/productForm";
import AdminForm from "./components/admin/adminForm";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="d-flex flex-column h-100">
      <Navbar/>
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/products" component={Products} />
          <ProtectedRoute
            path="/new-product"
            component={ProductForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/update-product/:id"
            component={ProductForm}
          ></ProtectedRoute>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/admin" component={Admin} />
          <ProtectedRoute
            path="/update-user/:sub"
            component={AdminForm}
          ></ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
