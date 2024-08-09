import { statusData } from "../stores/statusStore"
import { userData } from "../stores/userStore"

const env = import.meta.env

let storeEmail

$: userData.subscribe(value => {
    storeEmail = value.email
})

export async function getCurrentStatus() {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_STATUS_GET}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: storeEmail
            })
        })
        if (!response.ok) {
            return
        } else {
            const data = await response.json()
            statusData.set({
                isCheckedIn: data.isCheckedIn
            })
        }
    } catch (error) {
        console.log(error)
    }
}