import { defineStore } from "pinia";

export const useToken = defineStore("token",{
    state: () => {
        return {
            hours: 0
        }
    },
    getters: {
        
    },
    actions: {
        increment(value) {
            this.hours += value
        },
        decrement(value) {
            this.hours -= value
        },
        reboot(value) {
            this.hours = value
        }
    },
    persist: true
})

export default useToken