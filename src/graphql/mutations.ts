import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      price
      quantity
      description
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EditProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      name
      price
      quantity
      description
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    removeProduct(id: $id)
  }
`;
