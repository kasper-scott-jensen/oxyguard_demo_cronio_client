import { writable } from 'svelte/store'

export const currentAttendanceData = writable({
    startDate: null,
    startTime: null
})
