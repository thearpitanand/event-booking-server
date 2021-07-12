// Express
const express = require("express");
const app = express();

// Dotenv
require("dotenv").config();

// GraphQL
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

// MongoDB
const mongoose = require("mongoose");

// CORS
const cors = require("cors");

// Middleware
const isAuth = require("./middleware/is-auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);
// todo:change the route from /graphql to /api.
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Welcome to the event management GraphQL API");
});

const { MONGO_DB_PASSWORD, MONGO_DB_USER, MONGO_DB_Name } = process.env;
mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.brfdp.mongodb.net/${MONGO_DB_Name}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(` 🚀 Database Connected`);
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(` 🚀 Server is running at port http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));
