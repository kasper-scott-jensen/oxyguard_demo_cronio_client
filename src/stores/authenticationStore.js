import { writable } from 'svelte/store'

export const userAuth = writable({
    isAuthenticated: false,
    user: null
})
