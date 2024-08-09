import { writable } from 'svelte/store'

export const userData = writable({
    firstName: '',
    lastName: '',
    role: '',
    bio: '',
    title: '',
    empDate: '',
    department: '',
    avatarUrl: '',
    bannerUrl: '',
    database: ''
})
