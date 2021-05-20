const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    reservations: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allReservations = await dataSources.reservationAPI.getAllReservations();
      // we want these in reverse chronological order
      allReservations.reverse();

      const reservations = paginateResults({
        after,
        pageSize,
        results: allReservations,
      });

      return {
        reservations,
        cursor: reservations.length ? reservations[reservations.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: reservations.length
          ? reservations[reservations.length - 1].cursor !==
            allReservations[allReservations.length - 1].cursor
          : false,
      };
    },
    reservation: (_, { id }, { dataSources }) =>
      dataSources.reservationsAPI.getReservationById({ reservationId: id }),
  },
};
