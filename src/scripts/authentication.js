import { getCurrentCheckIn, getAttendance } from "./attendance.js";
import { getCurrentStatus } from ".//status.js";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { navigate } from 'svelte-routing'
import { userAuth } from '../stores/authenticationStore'
import { getUserData } from './user';
import { getTeamData } from './team';
import { getUserEvents } from '../scripts/event';
import { getUserWishList } from '../scripts/wishlist'
import { notifier } from '@beyonk/svelte-notifications';

import Cookies from 'js-cookie';

const auth = getAuth()

const env = import.meta.env

export async function loginAttempt(data) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        if (data.remember) {
            const sessionToken = await user.getIdToken();
            Cookies.set('session_token', sessionToken, { secure: true, sameSite: 'strict' });
        }
        loginAndGetData(user.email)
    } catch (error) {
        setUserAuth(false, null)
        notifier.danger('Invalid credentials', 3000)
        console.log(error);
    }
}

export async function logoutAttempt() {
    try {
        await signOut(auth);
        setUserAuth(false, null)
    } catch (error) {
        console.error(error.message);
    } finally {
        Cookies.remove('session_token');
        navigate('/')
        notifier.success('You have been logged out', 3000)
    }
}

export async function verifyToken() {
    let sessionToken = Cookies.get('session_token')
    try {
        const response = await fetch(`${env.VITE_SERVER}${env.VITE_AUTH_VERIFY_TOKEN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionToken })
        })
        if (!response.ok) {
            setUserAuth(false, null)
            return
        } else {
            const data = await response.json()
            loginAndGetData(data.token.email)
        }
    } catch (error) {
        setUserAuth(false, null)
        console.log(error)
    }
}

function setUserAuth(isAuthenticated, user) {
    userAuth.set({ isAuthenticated: isAuthenticated, user: user})
}

async function loginAndGetData(email) {
    setUserAuth(true, email)
    await getUserData(email)
    await getTeamData()
    await getUserEvents()
    await getUserWishList()
    await getCurrentStatus();
    await getCurrentCheckIn();
    await getAttendance(); 
    navigate('/dashboard')
    notifier.success('Successfully logged in', 3000)
}
