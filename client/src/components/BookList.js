import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);

  let content = null;
  if (loading) content = <p>Loading...</p>;
  else if (error) content = <p>Something went wrong :(</p>;
  else if (data) content = data.books.map(book => {
    return (
      <li key={book.id} onClick={e => {setSelected(book.id)}}>{ book.name }</li>
    )
  });
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
        { content }
      </ul>
      <BookDetails bookId={ selected }/>
    </div>
  );
}

export default BookList;
