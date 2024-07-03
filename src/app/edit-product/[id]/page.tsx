"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import { editProduct } from "../../../Redux/features/product/productsSlice";
import ProductForm from "../../components/ProductForm";
import { useMutation } from "@apollo/client";
import { EDIT_PRODUCT } from "@/graphql/mutations";


interface Props {
    params: { id: number };
}

const EditProduct = ({ params: { id } }: Props) => {
    const [editProductMutation] = useMutation(EDIT_PRODUCT);

    const products = useSelector((store: any) => store.product);
    const product = products?.find((p: any) => p.id === Number(id));

    const { name, description, price, quantity } = product;

    const dispatch = useDispatch();
    const router = useRouter();

    const [values, setValues] = useState({
        name,
        description,
        price,
        quantity
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleEditProduct = async () => {

        const { name, description, price, quantity } = values;

        const intId = Number(id);
        const intPrice = parseFloat(price);
        const intQuantity = parseFloat(quantity);


        const { data } = await editProductMutation({
            variables: {
                updateProductInput: { id: intId, price: intPrice, quantity: intQuantity, name, description },
            },
        });

        if (data) {
            dispatch(editProduct({ id, ...values }));
            setValues({ name: "", price: "", quantity: "", description: "" });
        }

        router.push("/");

    };

    return (
        <ProductForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleEditProduct}
            buttonText="Edit"
        />
    );
};

export default EditProduct;
