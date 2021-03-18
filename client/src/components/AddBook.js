import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from "../queries/queries";

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  let content = null;
  if (loading) content = <option>Loading...</option>;
  else if (error) content = <option>Something went wrong :(</option>;
  else if (data) content = data.authors.map(author => {
    return (
      <option key={author.id} value={author.id}>{ author.name }</option>
    )
  });

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const submitForm = e => {
    e.preventDefault();
    console.log(name, genre, authorId)
  };

  return (
    <form id='add-book' onSubmit={(e) => submitForm(e)}>
      <div className='field'>
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)}/>
      </div>
      <div className='field'>
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          {content}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
