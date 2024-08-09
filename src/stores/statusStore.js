import { writable } from 'svelte/store'

export const statusData = writable({
    isCheckedIn: null
})
