const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  "mongodb+srv://temideewan:tdgql21496@cluster0.tzrp7.mongodb.net/Graphql?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("Connection established");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening for request on port 4000...");
});
