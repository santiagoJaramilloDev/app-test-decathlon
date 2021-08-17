import React from "react";
import { Link } from "react-router-dom";

const Addproduct = (props) => {
  if (props.usertype === "admin") {
    return (
      <div className="d-flex">
        <Link to="/new-product">Crear un producto</Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Addproduct;
