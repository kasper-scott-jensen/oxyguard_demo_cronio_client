import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { userData } from '../stores/userStore'
import { getTeamData } from './team';
import { db, storage } from '../config/firebase.config'
import { notifier } from '@beyonk/svelte-notifications';

let storeEmail

$: userData.subscribe(value => {
    storeEmail = value.email
})

export async function getUserData(email) {
    try {
        const userRef = doc(db, 'users', email)
        const userSnapshot = await getDoc(userRef)
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data()
            setUserData(userData)
        } else {
            setUserData(false, null)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserData(data) {
    try {
        const userRef = doc(db, 'users', storeEmail);
        await updateDoc(userRef, {
            firstName: data.firstName,
            lastName: data.lastName,
            title: data.title,
            department: data.department,
            bio: data.bio,
            phone: data.phone
        });
        notifier.success('Information successfully saved', 3000)
        await getUserData();
        await getTeamData()
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserAvatar(avatar) {
    try {
        const avatarFilename = `avatar.${avatar.name.split('.').pop()}`;
        const avatarStorageRef = ref(storage, `${storeEmail}/${avatarFilename}`);
        await uploadBytes(avatarStorageRef, avatar);
        const avatarUrl = await getDownloadURL(avatarStorageRef);
        await updateUserAvatarDoc(avatarUrl)
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserBanner(banner) {
    try {
        const bannerFilename = `banner.${banner.name.split('.').pop()}`;
        const bannerStorageRef = ref(storage, `${storeEmail}/${bannerFilename}`);
        await uploadBytes(bannerStorageRef, banner);
        const bannerUrl = await getDownloadURL(bannerStorageRef);
        await updateUserBannerDoc(bannerUrl)
    } catch (error) {
        console.log(error)
    }
}

async function updateUserAvatarDoc(avatarUrl) {
    try {
        const userRef = doc(db, 'users', storeEmail);
        await updateDoc(userRef, {
            avatarUrl: avatarUrl,
        });
        await getUserData();
    } catch (error) {
        console.log(error);
    }
}

async function updateUserBannerDoc(bannerUrl) {
    try {
        const userRef = doc(db, 'users', storeEmail);
        await updateDoc(userRef, {
            bannerUrl: bannerUrl
        });
        await getUserData()
    } catch (error) {
        console.log(error);
    }
}

function setUserData(user) {
    userData.set(user)
}
