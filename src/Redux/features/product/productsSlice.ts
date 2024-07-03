"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const initialState: ProductState[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductState[]>) => {
      return action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      state.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<ProductState>) => {
      const { id, name, description, price, quantity } = action.payload;
      const product = state.find((p) => p.id === id);
      if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
