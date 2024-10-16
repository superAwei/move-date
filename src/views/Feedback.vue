<template>
  <div class="feedback">
    <h2>Provide Feedback</h2>
    <form @submit.prevent="submitFeedback">
      <div>
        <label for="rating">Rating:</label>
        <select v-model="rating" id="rating" required>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div>
        <label for="comment">Comment:</label>
        <textarea v-model="comment" id="comment" rows="4" required></textarea>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'FeedbackView',
  setup() {
    const rating = ref(3)
    const comment = ref('')

    const submitFeedback = async () => {
      const user = auth.currentUser
      if (user) {
        try {
          await addDoc(collection(db, 'feedback'), {
            userId: user.uid,
            rating: rating.value,
            comment: comment.value,
            timestamp: new Date()
          })
          alert('Thank you for your feedback!')
          rating.value = 3
          comment.value = ''
        } catch (error) {
          console.error('Error submitting feedback:', error)
          alert('Failed to submit feedback. Please try again.')
        }
      } else {
        alert('Please sign in to submit feedback')
      }
    }

    return {
      rating,
      comment,
      submitFeedback
    }
  }
}
</script>
