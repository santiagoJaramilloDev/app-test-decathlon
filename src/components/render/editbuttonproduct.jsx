import React from "react";
import { useHistory } from "react-router-dom";

const Editbuttonproduct = (props) => {
  const history = useHistory();
  if (props.usertype === "admin") {
    return (
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          onClick={() => history.push(`/update-product/${props.product._id}`)}
          className="btn me-md-2"
          type="button"
        >
          <i className="icon-pencil"></i>
        </button>
        <button
          onClick={props.deleteProduct.bind(this, props.product._id)}
          className="btn"
          type="button"
        >
          <i className="icon-trash"></i>
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Editbuttonproduct;
