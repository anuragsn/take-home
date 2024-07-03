import React from "react";
import TextField from "./TextField";
import Button from "./Button";

interface Props {
  values: { name: string, price: string, quantity: string, description: string }, handleChange: () => void,
  handleSubmit: () => void, buttonText: string
}

const ProductForm = ({ values, handleChange, handleSubmit, buttonText }: any) => {
  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        name="name"
        value={values?.name}
        onChange={handleChange}
        inputProps={{ type: "text", placeholder: "Enter Name" }}
      />
      <br />
      <TextField
        label="Price"
        name="price"
        value={values?.price}
        onChange={handleChange}
        inputProps={{ type: "number", placeholder: "Enter Price" }}
      />
      <br />
      <TextField
        label="Quantity"
        name="quantity"
        value={values?.quantity}
        onChange={handleChange}
        inputProps={{ type: "number", placeholder: "Enter Quantity" }}
      />
      <br />
      <TextField
        label="Description"
        name="description"
        value={values?.description}
        onChange={handleChange}
        inputProps={{ type: "text", placeholder: "Enter Description" }}
      />
      <Button onClick={handleSubmit}>{buttonText}</Button>
    </div>
  );
};

export default ProductForm;
