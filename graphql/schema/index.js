const { buildSchema } = require("graphql");

// Import Type, Input, Query and Mutation
const { AuthData, User, UserInput, login, createUser } = require("./auth");
const { Booking, bookEvent, bookings, cancelBooking } = require("./booking");
const { Event, EventInput, createEvent, events } = require("./events");

module.exports = buildSchema(`

    ${AuthData}

    ${User}

    ${Booking}

    ${Event}
    
    ${UserInput}

    ${EventInput}

    type RootQuery {
        ${events}
        ${bookings}
        ${login}
    }

    type RootMutation {
        ${bookEvent}
        ${cancelBooking}
        ${createUser}
        ${createEvent}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
