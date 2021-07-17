// Types
exports.Booking = `
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}`;

// Query
exports.bookings = `bookings:[Booking!]!`;

// Mutation
exports.bookEvent = `bookEvent(eventId:ID!): Booking!`;
exports.cancelBooking = `cancelBooking(bookingId:ID!): Event!`;
