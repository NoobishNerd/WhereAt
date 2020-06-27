import API_URL from "./config.js";

const usersService = {


  async getUserById(id) {
    const response = await fetch(`${API_URL}utilizadores/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();
      let translated = {
        id_user: responseData.id_utilizador,
        username: responseData.user_name,
        email: responseData.email,
        password: responseData.password,
        admin: responseData.administrador,
        profilePic: responseData.foto,
        phone: responseData.numero_tel       
      }
      // eslint-disable-next-line no-console
      console.log("getUserById")
      // eslint-disable-next-line no-console
      console.log(translated);
      return translated;
    } else {
      throw Error(response);
    }
  },

  //neste não é necesséio traduzir pk password e email são ambas palavras inglesas
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
      let translated = {
        id_user: responseData.id_utilizador,
        username: responseData.user_name,
        email: responseData.email,
        password: responseData.password,
        admin: responseData.administrador,
        profilePic: responseData.foto,
        phone: responseData.numero_tel
      }
      // eslint-disable-next-line no-console
      console.log("getUser")
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(translated));
      return translated;
    } else {
      throw Error(response);
    }
  },

  async registerUser(data) {
    let translated = {
      user_name: data.username,
      email: data.email,
      password: data.password
    }

    const response = await fetch(`${API_URL}criarUtilizadores`, {
      method: "POST",
      body: JSON.stringify(translated),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const responseData = await response.json();
            // eslint-disable-next-line no-console
            console.log("registerUser")
      // eslint-disable-next-line no-console
      console.log(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async updateUser(data, id) {
    let translated = {
      user_name: data.username,
      email: data.email,
      password: data.password,
      administrador: data.admin,
      foto: data.profilePic,
      numero_tel: data.phone
    }

    const response = await fetch(`${API_URL}utilizadores/${id}`, {
      method: "PUT",
      body: JSON.stringify(translated),
      headers: {
        "Content-Type": "application/json",
      }
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

  //--------------------------------------------------user tags------------------------------------------------

  async getUserTags(id) {
    const response = await fetch(`${API_URL}utilizadores/${id}/tags`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();
      let translated = []

      responseData.forEach(tag => {
        translated.push({
          id_tag: tag.id_tag,
          tag_name: tag.desc_tag,
        })
      });
            // eslint-disable-next-line no-console
            console.log("getUserTags")
      // eslint-disable-next-line no-console
      console.log(translated);
      return translated;
    } else {
      throw Error(response);
    }
  },

  async addUserTag(id_user, id_tag) {
    const response = await fetch(`${API_URL}utilizadores/${id_user}/tags/${id_tag}`, {
      method: "POST"
    });

    if (response.ok) {
      const responseData = await response.json();
            // eslint-disable-next-line no-console
            console.log("addUserTag")
      // eslint-disable-next-line no-console
      console.log(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async deleteUserTag(id_user, id_tag) {
    const response = await fetch(`${API_URL}utilizadores/${id_user}/tags/${id_tag}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response);
    }
  },













  //---------------------------------Restaurant OPERATIONS----------------------------------------
  async getRestaurantById(id) {
    const response = await fetch(`${API_URL}restaurantes/${id}`, {
      method: "GET"
    });

    if (response.ok) {
      const responseData = await response.json();
      let translated = {
        id_restaurant: responseData.id_restaurante,
        name: responseData.nome,
        email: responseData.email,
        password: responseData.password,
        info: responseData.informacao,
        profilePic: responseData.foto_perfil,
        address: responseData.morada,
        approval: responseData.aprovacao,
        postalCode: responseData.cod_postal,
        availability: responseData.disponibilidade,
        local: responseData.localidade
      }
            // eslint-disable-next-line no-console
            console.log("getRestaurantById")
      // eslint-disable-next-line no-console
      console.log(translated);
      return translated;
    } else {
      throw Error(response);
    }
  },


  //neste não é necesséio traduzir pk password e email são ambas palavras inglesas
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
      let translated = {
        id_restaurant: responseData.id_restaurante,
        name: responseData.nome,
        email: responseData.email,
        password: responseData.password,
        info: responseData.informacao,
        profilePic: responseData.foto_perfil,
        address: responseData.morada,
        approval: responseData.aprovacao,
        postalCode: responseData.cod_postal,
        availability: responseData.disponibilidade
      }
       // eslint-disable-next-line no-console
      console.log("getRestaurant")
      // eslint-disable-next-line no-console
      console.log(translated);
      return translated;
    } else {
      throw Error(response);
    }
  },

  async registerRestaurant(data) {
    let translated = {
      nome: data.name,
      password: data.password,
      morada: data.address,
      cod_postal: data.postalCode,
      localidade: data.local,
      email: data.email
    }

    const response = await fetch(`${API_URL}criarRestaurantes`, {
      method: "POST",
      body: JSON.stringify(translated),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
            // eslint-disable-next-line no-console
            console.log("registerRestaurant")
      // eslint-disable-next-line no-console
      console.log(responseData);
      return responseData;
    } else {
      throw Error(response);
    }
  },

  async updateRestaurant(data, id) {
    let translated = {
      foto_perfil: data.profilePic,
      informacao: data.info,
      aprovacao: data.approval,
      disponibilidade: data.availability
    }

    const response = await fetch(`${API_URL}restaurantes/${id}`, {
      method: "PUT",
      body: JSON.stringify(translated),
      headers: {
        "Content-Type": "application/json",
      }
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