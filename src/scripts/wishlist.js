import { userData } from '../stores/userStore'
import { wishData } from '../stores/wishStore'
import { notifier } from '@beyonk/svelte-notifications'

const env = import.meta.env

let storeDatabase

$: userData.subscribe(value => {
    storeDatabase = value.database
})

export async function getUserWishList() {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_WISHLIST_GET}`, {
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
            wishData.set(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function saveUserWishList(data) {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_WISHLIST_SAVE}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                database: storeDatabase,
                wishlist: data
            })
        })
        if (!response.ok) {
            notifier.danger('Error saving changes', 3000)
            return
        } else {
            wishData.set(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteWish(wish) {
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_WISHLIST_DELETE}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                database: storeDatabase,
                wish: wish
            })
        })
        if (!response.ok) {
            notifier.danger('Error deleting event', 3000)
            return
        } else {
            notifier.success('Event successfully deleted', 3000)
        }
    } catch (error) {
        console.log(error)
    }
}
