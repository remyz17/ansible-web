<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  setup() {
    const store = useStore()
    const menuOpen = ref(false)
    
    return {
      toggleTheme: () => store.dispatch('toggleTheme'),
      toggleBurger: () => menuOpen.value =! menuOpen.value,
      menuOpen
    }
  }
}
</script>

<template>
<nav class="navbar is-spaced is-fixed-top" role="navigation" aria-label="dropdown navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
    <div class="navbar-burger burger" @click="toggleBurger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div class="navbar-menu" :class="[menuOpen ? 'is-active' : '']">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">
        Hosts
      </router-link>
      <router-link class="navbar-item" to="/groups">
        Groups
      </router-link>
      <router-link class="navbar-item" to="/about">
        About
      </router-link>
    </div>
  </div>
</nav>
</template>

<style scoped>
.router-link-active {
  background-color: #fafafa;
  color: #00d1b2;
}
</style>