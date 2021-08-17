import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { saveProduct } from "../../graphql/mutations";
import { editProduct } from "../../graphql/mutations";
import { getProduct } from "../../graphql/queries";

import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const ProductForm = () => {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if(params.id){
      getproduct();
    }
  }, [])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    params.id ? (
      await updateProduct(data)
    ) : (
      await NewProduct(data)
    )
    history.push("/products")
  };

  const NewProduct = async (data) => {
    try {
      const newProduct = await API.graphql(graphqlOperation(saveProduct, { input: data }));
      const newprod = newProduct.data.saveProduct;
    } catch (error) {
      console.log("error en la creacion");
    }
  };

  const getproduct = async () => {
    console.log(params.id);
    try {
      const fecthProduct = await API.graphql(graphqlOperation(getProduct, { _id: params.id}));
      const product = fecthProduct.data.getProduct;
      setValue("name", product.name);
      setValue("cost", product.cost);
      setValue("description", product.description);
      console.log(product);
    } catch (error) {
      console.log("error al consultar");
    }
  }

  const updateProduct = async (data) => {
    try {
      const updateProduct = await API.graphql(graphqlOperation(editProduct, {_id: params.id, input: data}));
      const updateproduct = updateProduct.data.editProduct;
      console.log(updateproduct);
    } catch (error) {
      console.log("error en la edicion");
    }
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 pt-5">
        <div className="card">
          <div className="card-body">
            <h3>Producto</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="Cual es tu nuevo producto?"
                  className="form-control"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  {...register("cost")}
                  type="number"
                  name="cost"
                  placeholder="Cual es el costo?"
                  className="form-control"
                />
              </div>
              <div className="input-group mb-3">
                <textarea
                  {...register("description")}
                  name="description"
                  rows={3}
                  className="form-control"
                />
              </div>
              {
                params.id ? (
                  <button type="submit" className="btn btn-info">
                    Editar Producto
                  </button>
                ):(
                  <button type="submit" className="btn btn-primary">
                    Crear Producto
                  </button>)
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;