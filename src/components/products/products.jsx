import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Product from "./product";
import Addproduct from "../render/addproduct";
import { useAuth0 } from "@auth0/auth0-react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { removeProduct } from "../../graphql/mutations";
import { getProducts } from "../../graphql/queries";
import { getUser } from "../../graphql/queries";

import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const Products = () => {
  const [userlog, setUserlog] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrenPage] = useState(0);
  const [search, setSearch] = useState("");

  const { user } = useAuth0();
  const { name, picture, email, sub } = user;

  useEffect(() => {
    fecthUsers();
    fecthProducts();
  }, []);

  const fecthUsers = async () => {
    try {
      const userData = await API.graphql(
        graphqlOperation(getUser, { sub: sub })
      );
      const userlogin = userData.data.getUser;
      setUserlog(userlogin);
    } catch (error) {
      console.log("error en la consulta");
    }
  };

  const filteredProducts = () => {
    if (search.length === 0)
      return products.slice(currentPage, currentPage + 5);

    const filtered = products.filter((e) =>
      e.name.toUpperCase().includes(search.toUpperCase())
    );
    return filtered.slice(currentPage, currentPage + 5);
  };

  const onSearchChange = ({ target }) => {
    setCurrenPage(0);
    setSearch(target.value);
  };

  const nextPage = () => {
    if (
      products.filter((e) => e.name.includes(search)).length >
      currentPage + 5
    )
      setCurrenPage(currentPage + 5);
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrenPage(currentPage - 5);
    }
  };

  const fecthProducts = async () => {
    try {
      const productsData = await API.graphql(graphqlOperation(getProducts));
      const prods = productsData.data.getProducts;
      setProducts(prods);
    } catch (error) {
      console.log("error en la consulta");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const deleteData = await API.graphql(
        graphqlOperation(removeProduct, { _id: id })
      );
      const deleteprod = deleteData.data.removeProduct;
      fecthProducts();
      console.log(deleteprod);
    } catch (error) {
      console.log("error en la consulta");
    }
  };

  return (
    <div className="pt-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            PRODUCTOS
          </li>
        </ol>
        <input
          onChange={onSearchChange}
          type="text"
          value={search}
          className="mb-2 form-control"
        ></input>
      </nav>
      <Addproduct usertype={userlog.type}></Addproduct>
      <ol className="list-group">
        {filteredProducts().map((e) => (
          <Product
            key={e._id}
            product={e}
            deleteProduct={deleteProduct}
            usertype={userlog.type}
          ></Product>
        ))}
      </ol>
      <button onClick={previousPage} className="btn btn-primary">
        Anterior
      </button>
      &nbsp;
      <button onClick={nextPage} className="btn btn-primary">
        Siguiente
      </button>
    </div>
  );
};

export default Products;
