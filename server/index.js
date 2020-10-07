const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const schema = require("./schema/schema");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 4000;

// Allow cross origin requestOptions
app.use(cors());
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

app.listen(port, () => {
  console.log("listening for request on port 4000...");
});
