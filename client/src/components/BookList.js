import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  let content = null;
  if (loading) content = <p>Loading...</p>;
  else if (error) content = <p>Something went wrong :(</p>;
  else if (data) content = data.books.map(book => {
    return (
      <li key={book.id}>{ book.name }</li>
    )
  });
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
        { content }
      </ul>
    </div>
  );
}

export default BookList;
