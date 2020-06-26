import API_URL from "./config.js";

const restaurantService = {

    //-------------------TABLE OPERATIONS----------------------
    async getRestaurantTables(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}/mesas`, {
            method: "GET"
        });

        if (response.ok) {
            const responseData = await response.json();
            let translated = []

            responseData.forEach(table => {
                translated.push({
                    id_table: table.id_mesa,
                    id_restaurant: table.id_restaurante,
                    capacity: table.n_cadeiras
                })
            });

            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

    async addTable(data, id) {
        let translated = {
            n_cadeiras: data.capacity
        }

        const response = await fetch(`${API_URL}restaurantes/${id}/mesas`, {
            method: "POST",
            body: JSON.stringify(translated),
            headers: {
                "Content-Type": "application/json",
            }
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
            let translated = []

            responseData.forEach(comment => {
                translated.push({
                    comment: comment.txt_comentario,
                    rating: comment.rating,
                    date: comment.data,
                    username: comment.user_name,
                    profilePic: comment.foto
                })
            });
            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

    async addComment(data, id) {
        let translated = {
            id_utilizador: data.id_user,
            txt_comentario: data.comment,
            rating: data.rating,
            data: data.date
        }

        const response = await fetch(`${API_URL}restaurantes/${id}/comentarios`, {
            method: "POST",
            body: JSON.stringify(translated),
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
            let translated = []

            responseData.forEach(dish => {
                translated.push({
                    id_dish: dish.id_prato,
                    dish_name: dish.desc_prato,
                    price: dish.preco,
                    category: dish.desc_categoria
                })
            });
            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

    async addDish(data, id) {
        let translated = {
            preco: data.price,
            desc_prato: data.dish_name,
            id_categoria: data.id_category

        };

        const response = await fetch(`${API_URL}restaurantes/${id}/pratos`, {
            method: "POST",
            body: JSON.stringify(translated),
            headers: {
                "Content-Type": "application/json",
            }
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
            let translated = []

            responseData.forEach(photo => {
                translated.push({
                    id_photo: photo.id_foto,
                    id_restaurant: photo.id_restaurante,
                    srcLink: photo.link_foto,
                })
            });
            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

    async addPhoto(data, id) {
        let translated = {
            link_foto: data.srcLink
        }

        const response = await fetch(`${API_URL}restaurantes/${id}/fotos`, {
            method: "POST",
            body: JSON.stringify(translated),
            headers: {
                "Content-Type": "application/json",
            }
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
            let translated = []

            responseData.forEach(tag => {
                translated.push({
                    id_tag: tag.id_tag,
                    tag_name: tag.desc_tag,
                    tag_main: tag.tag_principal
                })
            });
            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

    async addRestaurantTag(data, id) {
        let translated = {
            desc_tag: data.tag_name
        }

        const response = await fetch(`${API_URL}restaurantes/${id}/tags`, {
            method: "POST",
            body: JSON.stringify(translated),
            headers: {
                "Content-Type": "application/json",
            }
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
            let translated = []

            responseData.forEach(card => {
                translated.push({
                    name: card.nome,
                    profilePic: card.foto_perfil,
                    id_restaurant: card.id_restaurante,
                    tag_name: card.desc_tag,
                    local: card.localidade
                })
            });
            // eslint-disable-next-line no-console
            console.log(translated);
            return translated;
        } else {
            throw Error(response);
        }
    },

}

export default restaurantService;