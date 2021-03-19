import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

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

  const [addBook, { bookData }] = useMutation(addBookMutation);

  const submitForm = e => {
    e.preventDefault();
    if(!authorId) {
      return;
    }
    addBook({variables: {
      name: name,
      genre: genre,
      authorId: authorId
    }})
      .then(response => {
        console.log(response, 'add book response')
      })
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
          <option value='0'>Select author</option>
          {content}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
