/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveProduct = /* GraphQL */ `
  mutation SaveProduct($input: InputProduct) {
    saveProduct(input: $input) {
      _id
      name
      description
      cost
    }
  }
`;
export const removeProduct = /* GraphQL */ `
  mutation RemoveProduct($_id: ID!) {
    removeProduct(_id: $_id) {
      _id
      name
      description
      cost
    }
  }
`;
export const editProduct = /* GraphQL */ `
  mutation EditProduct($_id: ID!, $input: InputProduct) {
    editProduct(_id: $_id, input: $input) {
      _id
      name
      description
      cost
    }
  }
`;
export const saveUser = /* GraphQL */ `
  mutation SaveUser($input: InputUser) {
    saveUser(input: $input) {
      _id
      email
      sub
      type
    }
  }
`;
export const editUser = /* GraphQL */ `
  mutation EditUser($_id: ID!, $input: InputUser) {
    editUser(_id: $_id, input: $input) {
      _id
      email
      sub
      type
    }
  }
`;
