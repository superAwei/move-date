<template>
  <div class="movie-browser container">
    <h2>Movie Browser</h2>
    <input 
      v-model="searchQuery" 
      @input="searchMovies" 
      type="text" 
      placeholder="搜索電影..."
    >
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date }}</p>
        <button @click="addToPreferences(movie.genre_ids)">添加到偏好</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

const API_KEY = '392f3431bc009e57f5dc58f12e4949ee'
const API_URL = 'https://api.themoviedb.org/3'

export default {
  name: 'MovieBrowser',
  setup() {
    const movies = ref([])
    const searchQuery = ref('')

    const searchMovies = async () => {
      if (searchQuery.value.length > 0) {
        try {
          const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery.value}&language=zh-TW`)
          const data = await response.json()
          movies.value = data.results
        } catch (error) {
          console.error('Error searching movies:', error)
        }
      } else {
        movies.value = []
      }
    }

    const addToPreferences = async (genreIds) => {
      const user = auth.currentUser
      if (user) {
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          moviePreferences: arrayUnion(...genreIds)
        })
        alert('偏好已更新！')
      } else {
        alert('請先登錄以更新偏好')
      }
    }

    const getImageUrl = (path) => {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : 'path/to/placeholder/image.jpg'
    }

    onMounted(() => {
      searchMovies()
    })

    return {
      movies,
      searchQuery,
      searchMovies,
      addToPreferences,
      getImageUrl
    }
  }
}
</script>

<style scoped>
.movie-browser {
  text-align: center;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.movie-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.movie-item h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.movie-item p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
</style>
