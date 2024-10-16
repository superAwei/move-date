<template>
  <div class="chat">
    <h2>Chat with {{ matchEmail }}</h2>
    <div class="messages">
      <div v-for="message in messages" :key="message.id" :class="['message', message.sender === currentUser.uid ? 'sent' : 'received']">
        {{ message.text }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Type a message...">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { auth, rtdb } from '@/firebase'
import { ref as dbRef, push, onChildAdded, off } from 'firebase/database'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  name: 'ChatView',
  setup() {
    const route = useRoute()
    const matchId = route.params.id
    const currentUser = auth.currentUser
    const messages = ref([])
    const newMessage = ref('')
    const matchEmail = ref('')

    const chatRef = dbRef(rtdb, `chats/${currentUser.uid}_${matchId}`)

    onMounted(async () => {
      onChildAdded(chatRef, (snapshot) => {
        messages.value.push(snapshot.val())
      })

      // Fetch match email
      const matchDoc = await getDoc(doc(db, 'users', matchId))
      if (matchDoc.exists()) {
        matchEmail.value = matchDoc.data().email
      }
    })

    onUnmounted(() => {
      off(chatRef)
    })

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        push(chatRef, {
          text: newMessage.value,
          sender: currentUser.uid,
          timestamp: Date.now()
        })
        newMessage.value = ''
      }
    }

    return {
      messages,
      newMessage,
      sendMessage,
      matchEmail,
      currentUser
    }
  }
}
</script>
