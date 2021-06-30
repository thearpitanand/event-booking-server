require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const app = express();

const events = [];

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello World!!");
});

// todo:change the route from /graphql to /api.
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        input EventInput{
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const { title, description, price } = args.eventInput;
        const event = {
          _id: Math.random().toString(),
          title,
          description,
          price: +price,
          date: new Date().toISOString(),
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

const { MONGO_DB_PASSWORD, MONGO_DB_USER } = process.env;
mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.brfdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(` 🚀 Database Connected`);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` 🚀 Server is running at port http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));
