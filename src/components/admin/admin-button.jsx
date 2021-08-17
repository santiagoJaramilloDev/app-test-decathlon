import React from "react";
import { Link } from "react-router-dom";

const Adminbutton = () => {
  return (
    <li className="nav-item">
        <Link className="nav-link" to="/admin">
          Administración
        </Link>
      </li>
  );
};

export default Adminbutton;
