const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    reservations(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): ReservationConnection!
    reservation(id: ID!): Reservation
  }

 
  """
  Simple wrapper around our list of reservations that contains a cursor to the
  last item in the list. Pass this cursor to the reservations  query to fetch results
  after these.
  """
  type ReservationConnection {
    cursor: String!
    hasMore: Boolean!
    reservations: [Reservation]!
  }

  type Reservation {
    id: ID!
    property_id : String
    date: String
    updated_at: String
    content: String
    reservation_type: String!
  }
`;

module.exports = typeDefs;
