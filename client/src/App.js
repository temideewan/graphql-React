import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// Apollo client set up

// we use the location of an already running instance of a gql server as our uri
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninjas reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
