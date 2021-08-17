/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProducts = /* GraphQL */ `
  query GetProducts {
    getProducts {
      _id
      name
      description
      cost
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      description
      cost
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers {
    getUsers {
      _id
      email
      sub
      type
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($sub: ID!) {
    getUser(sub: $sub) {
      _id
      email
      sub
      type
    }
  }
`;
