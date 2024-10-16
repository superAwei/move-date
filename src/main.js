import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import './assets/global.css'  // 添加这一行

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
});
