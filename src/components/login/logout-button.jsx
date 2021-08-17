import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Fragment>
      <li className="nav-item">
        <button
          className="nav-link btn"
          onClick={() =>
            logout({
              returnTo: window.location.origin,
            })
          }
        >
          Log Out
        </button>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          Perfil
        </Link>
      </li>
    </Fragment>
  );
};

export default LogoutButton;
