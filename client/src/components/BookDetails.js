import { useQuery } from '@apollo/client';
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId}) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId }
  });

  let content = null;
  if (loading) content = <p>Loading...</p>;
  else if (error) content = <p>Something went wrong :(</p>;

  else if (data.book)
    content = ( <div>
    <h2>{ data.book.name }</h2>
    <p>{ data.book.genre }</p>
    <p> { data.book.author.name} </p>
    <p>All books:</p>
    <ul className='other-books'>
      { data.book.author.books.map(book => {
        return ( <li key={book.id}>{book.name}</li> )
      })}
    </ul>
  </div>);

  return (
    <div id='book-details'>
      <p>Book Details</p>
      { content }
    </div>
  );
}

export default BookDetails;