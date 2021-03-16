const graphql = require('graphql');
const _ = require('lodash');
const authors = require('../dummy/authors');
const books = require('../dummy/books');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:    { type: GraphQLID },
    name:  { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
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
