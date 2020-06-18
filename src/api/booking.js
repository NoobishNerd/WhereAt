import API_URL from "./config.js";

const bookingService = {
    async getNonAvailabeTablesIds (data, id) {
        const response = await fetch(`${API_URL}reservas/nonAvailableTablesIds/${id}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData);
          return responseData;
        } else {
          throw Error(response);
        }
    },

    async createReservation(data) {
        const response = await fetch(`${API_URL}reservas`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData);
          return responseData;
        } else {
          throw Error(response);
        }
    },

    async getUserReservations (id) {
        const response = await fetch(`${API_URL}reservas/allUtilizadorReservas/${id}`, {
          method: "GET",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData);
          return responseData;
        } else {
          throw Error(response);
        }
    },
    async getRestaurantReservations (id) {
        const response = await fetch(`${API_URL}reservas/allRestauranteReservas/${id}`, {
          method: "GET",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData);
          return responseData;
        } else {
          throw Error(response);
        }
    },

    async updateReservation(data, id_res, id_user, id_table) {
        const response = await fetch(`${API_URL}reservas/restaurantes/${id_res}/utilizadores/${id_user}/mesas/${id_table}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response);
        }
    },

    async deleteUser(id_res, id_user, id_table) {
        const response = await fetch(`${API_URL}reservas/restaurantes/${id_res}/utilizadores/${id_user}/mesas/${id_table}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response);
        }
    },
}


export default bookingService;