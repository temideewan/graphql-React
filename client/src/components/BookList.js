import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";
const BookList = () => {
  //make our query with useQuery hook
  const { loading, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading books.....</div>;
    } else {
      const { books } = data;
      return books.map((book) => {
        return (
          <li
            onClick={(e) => {
              setSelected(book.id);
            }}
            key={book.id}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div id="main">
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;

/**
 * So here we hook up the refetch
 * for the individual book query
 * to happen whenever we clink on the
 * names of books
 * Scratch that, turns we did not need refetch in the first place
 */
