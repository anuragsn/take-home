"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";

export function Providers({ children }: any) {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                {children}
            </Provider>
        </ApolloProvider>
    )
}


