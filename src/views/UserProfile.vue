<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <h3>Movie Preferences</h3>
      <ul>
        <li v-for="genre in user.moviePreferences" :key="genre">{{ getGenreName(genre) }}</li>
      </ul>
      <button @click="signOut">Sign Out</button>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const API_KEY = '392f3431bc009e57f5dc58f12e4949ee'
const API_URL = 'https://api.themoviedb.org/3'

export default {
  name: 'UserProfile',
  setup() {
    const user = ref(null)
    const router = useRouter()
    const genres = ref([])

    onMounted(async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        user.value = userDoc.data()

        // Fetch genres
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)
        const data = await response.json()
        genres.value = data.genres
      } else {
        router.push('/signin')
      }
    })

    const handleSignOut = async () => {
      try {
        await signOut(auth)
        router.push('/signin')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

    const getGenreName = (genreId) => {
      const genre = genres.value.find(g => g.id === genreId)
      return genre ? genre.name : 'Unknown Genre'
    }

    return {
      user,
      signOut: handleSignOut,
      getGenreName
    }
  }
}
</script>
