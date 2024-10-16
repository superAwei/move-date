<template>
  <div id="app">
    <nav>
      <router-link to="/"><i class="fas fa-home icon"></i>Home</router-link>
      <router-link to="/movies"><i class="fas fa-film icon"></i>Movies</router-link>
      <router-link to="/matches"><i class="fas fa-heart icon"></i>Matches</router-link>
      <router-link to="/chat"><i class="fas fa-comments icon"></i>Chat</router-link>
      <router-link to="/profile"><i class="fas fa-user icon"></i>Profile</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}

nav {
  padding: 20px;
  background-color: var(--accent-color);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  font-weight: bold;
  color: var(--text-color);
  margin: 0 15px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

nav a:hover,
nav a.router-link-exact-active {
  background-color: var(--primary-color);
  color: var(--background-color);
}
</style>
