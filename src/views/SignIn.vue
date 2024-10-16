<template>
  <div class="signin container">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit"><i class="fas fa-sign-in-alt icon"></i>Sign In</button>
    </form>
    <button @click="handleGoogleSignIn" class="google-btn">
      <i class="fab fa-google icon"></i>Sign In with Google
    </button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export default {
  name: 'SignIn',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/profile')
      } catch (error) {
        console.error('Error signing in:', error)
        alert(error.message)
      }
    }

    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        await ensureUserDocument(result.user)
        router.push('/profile')
      } catch (error) {
        console.error('Error signing in with Google:', error)
        alert(error.message)
      }
    }

    const ensureUserDocument = async (user) => {
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          moviePreferences: []
        })
      }
    }

    return {
      email,
      password,
      handleSignIn,
      handleGoogleSignIn
    }
  }
}
</script>

<style scoped>
.signin {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
}

.google-btn {
  background-color: #4285F4;
  margin-top: 20px;
}

.google-btn:hover {
  background-color: #357ae8;
}

p {
  margin-top: 30px;
  text-align: center;
}
</style>
