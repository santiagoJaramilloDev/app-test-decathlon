import React, { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { editUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";

const AdminForm = () => {
  const history = useHistory();
  const params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    getuser();
  }, []);



  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await updateUser(data);
    history.push("/admin");
  };

  const getuser = async () => {
    console.log(params.sub);
    try {
      const fecthUser = await API.graphql(
        graphqlOperation(getUser, { sub: params.sub })
      );
      const userlog = fecthUser.data.getUser;
      setValue("email", userlog.email);
      setUser(userlog)
      //console.log(userlog);
    } catch (error) {
      console.log("error al consultar");
    }
  };

  const updateUser = async (data) => {
    const dat = {
        "email": user.email,
        "sub": user.sub,
        "type": data.Developer
    }

    try {
      const updateUser = await API.graphql(
        graphqlOperation(editUser, { _id: user._id, input: dat })
      );
      const update = updateUser.data.editUser;
      console.log(update);
    } catch (error) {
      console.log("error en la edicion");
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 pt-5">
        <div className="card">
          <div className="card-body">
            <h3>Usuario</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  disabled
                  {...register("email")}
                  type="text"
                  name="email"
                  placeholder="Cual es tu nuevo producto?"
                  className="form-control"
                />
              </div>
              <div className="form-check">
                <input
                  {...register("Developer", { required: true })}
                  type="radio"
                  value="admin"
                />
                <label className="form-check-label">Administrador</label>
              </div>
              <div className="form-check">
                <input
                  {...register("Developer", { required: true })}
                  type="radio"
                  value="client"
                />
                <label className="form-check-label">Cliente</label>
              </div>

              <button type="submit" className="btn btn-info">
                Actualizar usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
