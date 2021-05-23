const { RESTDataSource } = require('apollo-datasource-rest');

class ReservationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://lh-sample.herokuapp.com/api/v1/';
  }

  // leaving this inside the class to make the class easier to test
  reservationReducer(reservation) {
    return {
      date: reservation.date,
      property_id: reservation.property_id,
      content: reservation.content,
      reservation_type: reservation.reservation_type ,
      updated_at: reservation.updated_at,
      property_url: reservation.property_url
    };
  }

  async getAllReservations() {
    const response = await this.get('reservations');
    // transform the raw launches to a more friendly



    return Array.isArray(response)
      ? response.map(reservation => this.reservationReducer(reservation)) : [];
  }

  async getReservationById({ reservationId }) {
    const res = await this.get('reservations', { property_id: reservationId });
    return this.reservationReducer(res[0]);
  }

  async getReservationsByIds({ reservationIds }) {
    return Promise.all(
      reservationIds.map(reservationId => this.getReservationById({ reservationId })),
    );
  }
}

module.exports = ReservationAPI;
