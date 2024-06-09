import { defineStore } from "pinia";

export const useAuth = defineStore("auth",{
    state: () => {
        return {
            token: null,
            user_name: null,
            id_user: null,
            // baseUrl: "https://bdoapi.ivancano.com/api"
            baseUrl: "http://localhost:3000/api"
        }
    },
    getters: {
        
    },
    actions: {
        async login(email, password) {
            const uri = `${this.baseUrl}/users/login`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })

            const response = await rawResponse.json()

            if(response.status == false) {
                this.token = null
                this.user_name = null
                this.id_user = null
                return false
            } else {
                this.token = response.data.token
                this.user_name = response.data.user_name
                this.id_user = response.data.id_user
                return true
            }
        },
        async getZones() {
            const uri = `${this.baseUrl}/zones`

            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async getUsers() {
            const uri = `${this.baseUrl}/users`

            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async getDrops() {
            const uri = `${this.baseUrl}/drops`

            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async getZone(id) {
            const uri = `${this.baseUrl}/zones/${id}`
            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async getDropsByZone(id) {
            const uri = `${this.baseUrl}/drops/${id}`
            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async createHour(id_zone, num_hours) {
            const uri = `${this.baseUrl}/hours/createhour`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id_zone": id_zone,
                    "id_user": this.id_user,
                    "num_hours": num_hours
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async createDrop(id_zone, drop_name, img_url) {
            const uri = `${this.baseUrl}/drops/createdrop`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id_zone": id_zone,
                    "drop_name": drop_name,
                    "img_url": img_url
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async createDropHour(array) {
            const uri = `${this.baseUrl}/drops/insertdrophour`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(array)
            })

            const response = await rawResponse.json()
            return response
        },
        async createNewZone(name_zone, img_url) {
            const uri = `${this.baseUrl}/zones/createzone`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "name_zone": name_zone,
                    "img_url": img_url
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async editDrop(id_drop, id_zone, drop_name, img_url) {
            const uri = `${this.baseUrl}/drops/editdrop/${id_drop}`

            const rawResponse = await fetch(uri, {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id_zone": id_zone,
                    "drop_name": drop_name,
                    "img_url": img_url
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async editHour(id_hour, id_zone, id_user, num_hours) {
            const uri = `${this.baseUrl}/hours/edithour/${id_hour}`

            const rawResponse = await fetch(uri, {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id_zone": id_zone,
                    "id_user": id_user,
                    "num_hours": num_hours
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async editDropHour(id_drop, id_hours, drop_quantity) {
            const uri = `${this.baseUrl}/drops/editdrophour`

            const rawResponse = await fetch(uri, {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id_drop": id_drop,
                    "id_hours": id_hours,
                    "drop_quantity": drop_quantity
                })
            })

            const response = await rawResponse.json()
            return response
        },
        async deletedrop(id_drop) {
            const uri = `${this.baseUrl}/drops/deletedrop/${id_drop}`

            const rawResponse = await fetch(uri, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async deleteHour(id_hours) {
            const uri = `${this.baseUrl}/hours/deletehour/${id_hours}`

            const rawResponse = await fetch(uri, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        },
        async getDropsHour(id_hours) {
            const uri = `${this.baseUrl}/drops/getdropshour/${id_hours}`

            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            const response = await rawResponse.json()
            return response
        }
    },
    persist: true
})

export default useAuth