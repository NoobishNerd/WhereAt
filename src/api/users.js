import API_URL from './config.js'

const users = {
    
    async getUser(data) {
        const response = await fetch(`${API_URL}utilizadores`, {
            method: "GET",
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },
    async registerUser(data) {
        let user_name = data.user_name;
        let email =data.email;
        let password =data.password;
        alert(JSON.stringify({user_name,email,password}))
        const response = await fetch(`${API_URL}utilizadores`, {
            method: "POST",
            body: JSON.stringify({user_name,email,password})
        })

        if (response.ok) {
            
            return response.json()
        } else {
            throw Error(response)
        }
    },
    async updateUser(data, id) {
        const response = await fetch(`${API_URL}utilizadores/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },
    async deleteUser(id) {
        const response = await fetch(`${API_URL}utilizadores/${id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },



    async getRestaurant(data) {
        const response = await fetch(`${API_URL}restaurantes`, {
            method: "GET",
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }

    },
    async registerRestaurant(data) {
        const response = await fetch(`${API_URL}restaurantes`, {
            method: "POST",
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },
    async updateRestaurant(data, id) {
        const response = await fetch(`${API_URL}restaurantes/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },
    async deleteRestaurant(id) {
        const response = await fetch(`${API_URL}restaurantes/${id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            return response.json()
        } else {
            throw Error(response)
        }
    },
}

export default users;