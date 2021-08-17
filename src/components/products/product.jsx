import React from "react";
import { useHistory } from "react-router-dom";
import Editbuttonproduct from "../render/editbuttonproduct";

const Product = (props) => {
  const history = useHistory();
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.product.name}</h5>
        </div>
        <p className="mb-1">{props.product.description}</p>
        <small className="text-muted">Costo: {props.product.cost}</small>
      </div>
      <Editbuttonproduct
        product={props.product}
        deleteProduct={props.deleteProduct}
        usertype={props.usertype}
      ></Editbuttonproduct>
    </li>
  );
};

export default Product;
