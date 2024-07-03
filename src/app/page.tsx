"use client";
import { useQuery, gql, useMutation } from "@apollo/client";
import Link from "next/link";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setProducts } from "../Redux/features/product/productsSlice";
import { RootState } from "@/Redux/store";
import { DELETE_PRODUCT } from "@/graphql/mutations";
import { useEffect } from "react";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      quantity
      description
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
  const dispatch = useDispatch();

  const products = useSelector((store: RootState) => store.product);

  useEffect(() => {
    if (data && data.products) {
      dispatch(setProducts(data.products));
    }
  }, [data, dispatch]);

  const handleDeleteProduct = async (productId: number) => {
    const { data } = await deleteProductMutation({
      variables: { id: productId },
    });
    if (data && data.removeProduct) {
      dispatch(deleteProduct(productId));
    }
  };

  const renderCard = () =>
    products.map((product: any) => (
      <div
        key={product.id}
        className="bg-gray-300 p-5 flex items-center justify-between"
      >
        <div>
          <h3 className="font-bold text-lg text-gray-700">{product.name}</h3>
          <p>
            <span className="font-normal text-gray-600">{product.price}</span>
          </p>
          <p>
            <span className="font-normal text-gray-600">{product.quantity}</span>
          </p>
          <p>
            <span className="font-normal text-gray-600">{product.description}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={`edit-product/${product.id}`}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </Link>

          <button onClick={() => handleDeleteProduct(product.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    ));

  const noUsers = () => (
    <p className="text-center col-span-2 text-gray-700 font-semibold">
      No Products....
    </p>
  );

  return (
    <main>
      <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-5">
        <h1 className="text-center font-bold text-2xl text-gray-700">
          Take-Home
        </h1>
        <Link href="/add-product">
          <Button>Add Product</Button>
        </Link>
        <div className="grid gap-5 md:grid-cols-2">
          {products.length ? renderCard() : noUsers()}
        </div>
      </div>
    </main>
  );
}