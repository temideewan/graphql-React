import React from "react";

import { useQuery } from "@apollo/client";

import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  const { loading, data } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId,
    },
  });

  const displayBookDetails = () => {
    if (loading) {
      return <div className="loader"></div>;
    } else if (data) {
      let { book } = data;
      if (book) {
        return (
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <h3>other books by this author</h3>
            <ul className="other-book">
              {book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        return <div>no books selected</div>;
      }
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
