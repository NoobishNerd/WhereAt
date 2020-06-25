import API_URL from "./config.js";

const restaurantService = {

    //-------------------TABLE OPERATIONS----------------------
    async getRestaurantTables(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/mesas`, {
            method: "GET"
        });

        if (response.ok) {
            const responseData = await response.json();
            // eslint-disable-next-line no-console
            return responseData;
        } else {
            throw Error(response);
        }
    },

    async addTable(data, id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/mesas`, {
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

    async deleteTable(id) {
        const response = await fetch(`${API_URL}restaurantes/mesas/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },




    //--------------------COMMENT OPERATIONS---------------


    async getRestaurantComments(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/comentarios`, {
            method: "GET"
        });

        if (response.ok) {
            const responseData = await response.json();;
            return responseData;
        } else {
            throw Error(response);
        }
    },

    async addComment(data, id) {
        // eslint-disable-next-line no-console
        console.log(data,id)
        const response = await fetch(`${API_URL}restaurantes/${id}/comentarios`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw Error(response);
        }
    },

    async deleteComment(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/comentarios`, {
            method: "DELETE",
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },





    //---------------------MENU OPERATIONS-------------------

    async getRestaurantMenu(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/pratos`, {
            method: "GET"
        });
            
        if (response.ok) {
            const responseData = await response.json();
            // eslint-disable-next-line no-console
            console.log(responseData);
            return responseData;
        } else {
            throw Error(response);
        }
    },

    async addDish(data, id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/pratos`, {
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

    async deleteDish(id) {
        const response = await fetch(`${API_URL}restaurantes/pratos/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },

    //---------------------------------PHOTO OPERATIONS----------------------------------------

    async getRestaurantAlbum(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/fotos`, {
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

    async addPhoto(data, id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/fotos`, {
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

    async deletePhoto(id) {
        const response = await fetch(`${API_URL}restaurantes/fotos/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },


    //-----------------------------------------TAG OPERATIONS-----------------------------------------------


    async getRestaurantTags(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/tags`, {
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

    async addRestaurantTag(data, id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/tags`, {
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

    async updateRestaurantTag(id_res, id_tag) {
        const response = await fetch(`${API_URL}restaurantes/${id_res}/tags/${id_tag}`, {
            method: "PUT"
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },

    async deleteRestaurantTag(id_restaurante, id_tag) {
        const response = await fetch(`${API_URL}restaurantes/${id_restaurante}/tags/${id_tag}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return response.json();
        } else {
            throw Error(response);
        }
    },



    //-----------------------------------------HOMEBREW OPERATION-----------------------------------------

    async getRestaurantCards() {
        const response = await fetch(`${API_URL}cartasRestaurantes`, {
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

}

export default restaurantService;