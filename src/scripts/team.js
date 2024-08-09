import { db } from '../config/firebase.config'
import { collection, getDocs } from 'firebase/firestore'
import { teamData } from '../stores/teamStore'

export async function getTeamData() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data() });
        });
        teamData.set(documents)
    } catch (error) {
        console.log(error)
    }
}
