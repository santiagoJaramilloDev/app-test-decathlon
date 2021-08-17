import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { getUsers } from "../../graphql/queries";

import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const Admin = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const { user } = useAuth0();
  const { name, picture, email, sub } = user;

  useEffect(() => {
    fecthUsers();
  }, []);

  const fecthUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUsers));
      const userslogin = userData.data.getUsers;
      setUsers(userslogin);
    } catch (error) {
      console.log("error en la consulta");
    }
  };

  return (
    <div className="pt-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            USUARIOS
          </li>
        </ol>
      </nav>
      <ol className="list-group">
        {users.map((e) => (
          <li
            key={e._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{e.email}</h5>
              </div>
              <p className="mb-1">{e.type}</p>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                onClick={() =>
                  history.push(`/update-user/${e.sub}`)
                }
                className="btn me-md-2"
                type="button"
              >
                <i className="icon-pencil"></i>
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Admin;
