import API_URL from "./config.js";

const usersService = {


  async getUserById(id) {
    const response = await fetch(`${API_URL}utilizadores/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async getUser(data) {
    const response = await fetch(`${API_URL}utilizadores`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(JSON.stringify(responseData));
      return responseData;
    } else {
      throw Error(response);
    }
  },
  async registerUser(data) {
    const response = await fetch(`${API_URL}criarUtilizadores`, {
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
  async updateUser(data, id) {
    const response = await fetch(`${API_URL}utilizadores/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },
  async deleteUser(id) {
    const response = await fetch(`${API_URL}utilizadores/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },









  async getRestaurantById(id) {
    const response = await fetch(`${API_URL}restaurantes/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async getRestaurant(data) {
    const response = await fetch(`${API_URL}restaurantes`, {
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
  async registerRestaurant(data) {
    const response = await fetch(`${API_URL}criarRestaurantes`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },
  async updateRestaurant(data, id) {
    const response = await fetch(`${API_URL}restaurantes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },
  async deleteRestaurant(id) {
    const response = await fetch(`${API_URL}restaurantes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },
};

export default usersService;
