const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
  { name: 'Game of Throne', genre: 'fantasy', id: '1'},
  { name: 'Clash of Kings', genre: 'fantasy', id: '2'},
  { name: 'Three body problem', genre: 'sci-fi', id: '3'},
  { name: 'Storm of Swords', genre: 'fantasy', id: '4'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:    { type: GraphQLString },
    name:  { type: GraphQLString },
    genre: { type: GraphQLString }
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
      args: { id: { type: GraphQLString }},
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
