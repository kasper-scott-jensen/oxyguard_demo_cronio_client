import { userData } from '../stores/userStore'
import { eventData } from '../stores/eventStore'

const env = import.meta.env

let storeDatabase

$: userData.subscribe(value => {
    storeDatabase = value.database
})

export async function getUserEvents() {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_EVENT_GET}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ database: storeDatabase })
        })
        if (!response.ok) {
            return
        } else {
            const data = await response.json()
            eventData.set(data)
        }
    } catch (error) {
        console.log(error)
    }
}
