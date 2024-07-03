"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { addProduct } from "../../Redux/features/product/productsSlice";
import ProductForm from "../components/ProductForm";
import { ADD_PRODUCT } from "@/graphql/mutations";

const AddProduct = () => {
    const [addProductMutation] = useMutation(ADD_PRODUCT);
    const dispatch = useDispatch();
    const router = useRouter();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleAddProduct = async () => {
        try {
            const price = parseFloat(values.price);
            const quantity = parseInt(values.quantity, 10);

            const { data } = await addProductMutation({
                variables: {
                    createProductInput: {
                        ...values,
                        price,
                        quantity
                    },
                },
            });

            if (data) {
                dispatch(addProduct(data.createProduct));
                setValues({ name: "", description: "", price: "", quantity: "" });
                router.push("/");
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <ProductForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleAddProduct}
            buttonText="Submit"
        />
    );
};

export default AddProduct;