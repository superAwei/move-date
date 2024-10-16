<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
    <button @click="handleGoogleSignUp">Sign Up with Google</button>
    <p>Already have an account? <router-link to="/signin">Sign In</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default {
  name: 'SignUpView',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSignUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        await createUserDocument(userCredential.user)
        alert('Sign up successful!')
        router.push('/profile')
      } catch (error) {
        console.error('Error signing up:', error)
        alert(error.message)
      }
    }

    const handleGoogleSignUp = async () => {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        await createUserDocument(result.user)
        alert('Google sign up successful!')
        router.push('/profile')
      } catch (error) {
        console.error('Error signing up with Google:', error)
        alert(error.message)
      }
    }

    const createUserDocument = async (user) => {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        moviePreferences: []
      })
    }

    return {
      email,
      password,
      handleSignUp,
      handleGoogleSignUp
    }
  }
}
</script>
