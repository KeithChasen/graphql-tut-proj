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

  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type="text"/>
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type="text"/>
      </div>
      <div className='field'>
        <label>Author:</label>
        <select>
          {content}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
