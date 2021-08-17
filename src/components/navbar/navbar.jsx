import React from "react";
import AuthenticationButton from "../login/authentication-button";
import Adminbutton from "../admin/admin-button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/products">
          Decathlon
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <AuthenticationButton></AuthenticationButton>
            <Adminbutton></Adminbutton>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
