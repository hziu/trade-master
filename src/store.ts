import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('counter', () => {
    const islogin = ref(false)
    function login() {
        islogin.value = true
    }
    function logout() {
        islogin.value = false
    }

    return { islogin, login }
}, { persist: true })