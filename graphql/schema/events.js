// Types
exports.Event = `
type Event{
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}`;

// Inputs
exports.EventInput = `
input EventInput{
    title:String!
    description:String!
    price:Float!
    date:String!
}`;

// Query
exports.events = ` events: [Event!]! `;

// Mutation
exports.createEvent = ` createEvent(eventInput: EventInput): Event `;
