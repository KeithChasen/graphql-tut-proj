const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, error => {
  if (error) {
    console.log(error, 'Mongo error')
  } else {
    console.log('Connected to MongoDB')
  }
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('listening on port 4000')
});
