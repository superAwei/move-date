<template>
  <div class="user-matching">
    <h2>Your Matches</h2>
    <div v-if="matches.length">
      <div v-for="match in matches" :key="match.id" class="match-item">
        <h3>{{ match.email }}</h3>
        <p>Common movie preferences: {{ match.commonPreferences.join(', ') }}</p>
        <button @click="startChat(match.id)">Start Chat</button>
      </div>
    </div>
    <div v-else>
      <p>No matches found. Try updating your movie preferences!</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'

export default {
  name: 'UserMatching',
  setup() {
    const matches = ref([])
    const router = useRouter()

    onMounted(async () => {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data()
        const userPreferences = userData.moviePreferences || []

        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('moviePreferences', 'array-contains-any', userPreferences))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          if (doc.id !== user.uid) {
            const matchData = doc.data()
            const commonPreferences = matchData.moviePreferences.filter(pref => userPreferences.includes(pref))
            matches.value.push({
              id: doc.id,
              email: matchData.email,
              commonPreferences
            })
          }
        })
      } else {
        router.push('/signin')
      }
    })

    const startChat = (matchId) => {
      router.push({ name: 'Chat', params: { id: matchId } })
    }

    return {
      matches,
      startChat
    }
  }
}
</script>
