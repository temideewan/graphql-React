import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorsQuery);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [addBook, { data: bookData }] = useMutation(addBookMutation, {
    variables: {
      name,
      genre,
      authorId,
    },
  });

  console.log(data);

  const submitForm = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(name, genre, authorId);
    addBook();
  };

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      const { authors } = data;
      return authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="">Book name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="">Genre</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor=""> Author</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
