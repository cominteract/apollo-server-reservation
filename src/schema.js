const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    reservations : ReservationConnection!
    reservation(id: ID!): Reservation
  }

 
  """
  Simple wrapper around our list of reservations that contains a cursor to the
  last item in the list. Pass this cursor to the reservations  query to fetch results
  after these.
  """
  type ReservationConnection {
    reservations: [Reservation]!
  }

  type Reservation {
    id: ID!
    property_id : String
    date: String
    updated_at: String
    content: String
    reservation_type: String!
    property_url: String
  }
`;

module.exports = typeDefs;
