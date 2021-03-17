import { gql, useQuery } from '@apollo/client';

const getBooksQuery = gql`  
  {
       books {
           id
           name
           author {
               name
           }
       }
   }
  
`;

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong :(</p>

  console.log(data, 'data')

  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
}

export default BookList;
