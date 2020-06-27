import API_URL from "./config.js";

const bookingService = {
  async getNonAvailabeTablesIds(data, id) {
    let translated = {
      data_hora_reservada: data.date_booked
    };

    const response = await fetch(
      `${API_URL}reservas/nonAvailableTablesIds/${id}`,
      {
        method: "POST",
        body: JSON.stringify(translated),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async createReservation(data) {
    let translated = {
      data_hora_reservada: data.date_booked,
      id_utilizador: data.id_user,
      id_restaurante: data.id_restaurant,
      id_mesa: data.id_table,
      data_hora: data.date
    };

    const response = await fetch(`${API_URL}reservas`, {
      method: "POST",
      body: JSON.stringify(translated),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async getUserReservations(id) {
    const response = await fetch(
      `${API_URL}reservas/allUtilizadorReservas/${id}`,
      {
        method: "GET"
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      let translated = [];

      responseData.forEach(reservation => {
        translated.push({
          date_booked: reservation.data_hora_reservada,
          id_user: reservation.id_utilizador,
          id_restaurant: reservation.id_restaurante,
          id_table: reservation.id_mesa,
          date: reservation.data_hora,
          confirmation: reservation.confirmacao,
          presence: reservation.presenca,
          name: reservation.nome,
          capacity: reservation.n_cadeiras
        });
      });
      return translated;
    } else {
      throw Error(response);
    }
  },
  async getRestaurantReservations(id) {
    const response = await fetch(
      `${API_URL}reservas/allRestauranteReservas/${id}`,
      {
        method: "GET"
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      let translated = [];

      responseData.forEach(reservation => {
        translated.push({
          date_booked: reservation.data_hora_reservada,
          id_user: reservation.id_utilizador,
          id_restaurant: reservation.id_restaurante,
          id_table: reservation.id_mesa,
          date: reservation.data_hora,
          confirmation: reservation.confirmacao,
          presence: reservation.presenca,
          username: reservation.user_name,
          capacity: reservation.n_cadeiras
        });
      });
      return translated;
    } else {
      throw Error(response);
    }
  },

  async updateReservation(data, id_res, id_user, id_table) {
    let translated = {
      data_hora_reservada: data.date_booked,
      data_hora: data.date,
      newConfirmacao: data.confirmation,
      newPresenca: data.presence
    };

    const response = await fetch(
      `${API_URL}reservas/restaurantes/${id_res}/utilizadores/${id_user}/mesas/${id_table}`,
      {
        method: "PUT",
        body: JSON.stringify(translated),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },

  async deleteReservation(id_res, id_user, id_table) {
    const response = await fetch(
      `${API_URL}reservas/restaurantes/${id_res}/utilizadores/${id_user}/mesas/${id_table}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },

  async getAllTags() {
    const response = await fetch(`http://localhost:3000/tags`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();

      let translated = [];
      responseData.forEach(tag => {
        translated.push({
          id_tag: tag.id_tag,
          tag_name: tag.desc_tag
        });
      });
      return translated;
    } else {
      throw Error(response);
    }
  }
};

export default bookingService;
