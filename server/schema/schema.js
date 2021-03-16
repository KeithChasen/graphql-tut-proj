const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

//dummy data
var books = [
  { name: 'Game of Throne', genre: 'fantasy', id: '1', authorId: '1'},
  { name: 'Clash of Kings', genre: 'fantasy', id: '2', authorId: '1'},
  { name: 'Three body problem', genre: 'sci-fi', id: '3', authorId: '2'},
  { name: 'Dark Forest', genre: 'sci-fi', id: '6', authorId: '2'},
  { name: 'Storm of Swords', genre: 'fantasy', id: '4', authorId: '1'},
  { name: 'Blood of Elves', genre: 'fantasy', id: '5', authorId: '3'},
  { name: 'Last Wish', genre: 'fantasy', id: '7', authorId: '3'},
  { name: 'Sword of Destiny', genre: 'fantasy', id: '8', authorId: '3'},
];

var authors = [
  { name: 'George R.R. Martin', age: 72, id: '1'},
  { name: 'Liu Cixin', age: 57, id: '2'},
  { name: 'Andrzej Sapkowski', age: 72, id: '3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:    { type: GraphQLID },
    name:  { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent, 'parent')
        console.log(args, 'args')
        return _.find(authors, { id: parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id:    { type: GraphQLID },
    name:  { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

/**
 *  book (id: 123){
 *    name
 *    genre
 *  }
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // code to get data from DB / other source
        return _.find(books, { id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
