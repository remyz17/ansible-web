<template>
<nav class="navbar is-spaced has-shadow" role="navigation" aria-label="dropdown navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <h1>ANSIBLE web</h1>
    </div>
    <div class="navbar-burger burger" @click="toggleBurger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div class="navbar-menu" :class="[menuOpen ? 'is-active' : '']">
    <div class="navbar-end">
      <router-link class="navbar-item" to="/hosts">
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

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  setup() {
    const store = useStore()
    const menuOpen = ref(false)
    
    return {
      toggleBurger: () => menuOpen.value =! menuOpen.value,
      menuOpen
    }
  }
}
</script>