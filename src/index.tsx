import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         books: offsetLimitPagination(),
//       },
//     },
//   },
// });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contacts: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
