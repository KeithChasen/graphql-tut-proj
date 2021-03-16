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
  { name: 'Game of Throne', genre: 'fantasy', id: '1'},
  { name: 'Clash of Kings', genre: 'fantasy', id: '2'},
  { name: 'Three body problem', genre: 'sci-fi', id: '3'},
  { name: 'Storm of Swords', genre: 'fantasy', id: '4'},
  { name: 'Blood of Elves', genre: 'fantasy', id: '5'},
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
    genre: { type: GraphQLString }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
