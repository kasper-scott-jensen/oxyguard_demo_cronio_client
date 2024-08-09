import { userData } from '../stores/userStore'
import { notifier } from '@beyonk/svelte-notifications'
import { currentAttendanceData } from '../stores/currentCheckIn'
import { attendanceData } from '../stores/attendanceStore'
import { statusData } from '../stores/statusStore'

const env = import.meta.env

let storeEmail
let storeDatabase

$: userData.subscribe(value => {
    storeEmail = value.email
    storeDatabase = value.database
})

export async function setCheckIn() {
    let refStartDate =  new Date().toISOString().split('T')[0]
    let refStartTime  = new Date().toTimeString().split(' ')[0]
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_ATTENDANCE_CHECK_IN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: storeEmail,
                database: storeDatabase,
                startDate: refStartDate,
                startTime: refStartTime
            })
        })
        if (!response.ok) {
            notifier.danger('Error checking in', 3000)
            return
        }
        currentAttendanceData.set({
            startDate: refStartDate,
            startTime: refStartTime

        })
        statusData.set({
            isCheckedIn: true
        })     
        notifier.success('You have been successfully checked in', 3000)
    } catch (error) {
        console.log(error)
    }
}

export async function setCheckOut() {
    let refEndDate =  new Date().toISOString().split('T')[0]
    let refEndTime  = new Date().toTimeString().split(' ')[0]
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_ATTENDANCE_CHECK_OUT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: storeEmail,
                database: storeDatabase,
                endDate: refEndDate,
                endTime: refEndTime
            })
        })
        if (!response.ok) {
            notifier.danger('Error checking out', 3000)
            return
        }
        currentAttendanceData.set({
            startDate: null,
            startTime: null

        })
        statusData.set({
            isCheckedIn: false
        })
        notifier.success('You have been successfully checked out', 3000)
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentCheckIn() {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_ATTENDANCE_GET_LATEST}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                database: storeDatabase
            })
        })
        if (!response.ok) {
            currentAttendanceData.set({
                startDate: null,
                startTime: null
            })
            return
        } else {
            const data = await response.json()
            if (data.latestAttendance.end_date && data.latestAttendance.end_time) {
                currentAttendanceData.set({
                    startDate: null,
                    startTime: null
                })
            } else {
                currentAttendanceData.set({
                    startDate: data.latestAttendance.start_date,
                    startTime: data.latestAttendance.start_time
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getAttendance() {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_ATTENDANCE_GET}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                database: storeDatabase
            })
        })
        if (!response.ok) {
            attendanceData.set([])
            return
        } else {
            const data = await response.json()
            attendanceData.set(data.attendance)
        }
    } catch (error) {
        console.log(error)
    }
}
