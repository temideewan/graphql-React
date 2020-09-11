const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// define a book type as a new graphqlobjecttype

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });

        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });

        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   Go through the books array and find the one with the corresponding ID
        // console.log(typeof args.id);
        // return _.find(books, { id: args.id });
        // get data from DB/ other source

        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });

        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        // create a local variable out of our mongoose model that was imported
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        /**
         * this line saves into the database
         * and also returns the value saved referencesso we can access them
         */
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// We make a query object from graphqlobjecttype
// it has a name and fields which contain the data we are storing
// The field elements have their own specified datatype destructured from graphql
// we can also havee a resolve function that has access  to
// parent which is the root from which we are accessing a particular query and
// args which is the gql object itself on which we have different properties

/**
 * We wrap the fields inside a function so that when its referenced later
 * it has access to all the references it makes at a later time during the execution process
 */

//
// tdgql21496

/**
 * We use mutations to make changes to the database
 * we define our mutation as a graphql object type
 * with a name and fields on it.
 * and also arguments on each individual field that determine how we mutate our data.
 * we also have the resolve function that can then be used to make changes to our database by accessing values on the args object
 */
