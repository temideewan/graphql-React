import React from "react";

import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";
const BookList = () => {
  const { loading, data, error } = useQuery(getBooksQuery);
  const displayBooks = () => {
    if (loading) {
      return <div>Loading books.....</div>;
    } else {
      const { books } = data;
      return books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };

  return (
    <div id="main">
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default BookList;
