<template>
  <nav
    class="navbar is-spaced has-shadow"
    role="navigation"
    aria-label="dropdown navigation"
  >
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
        <router-link class="navbar-item" to="/">
          Dashboard
        </router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" to="/inventory">
            Inventory
          </router-link>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="/inventory/hosts">
              Hosts
            </router-link>
            <router-link class="navbar-item" to="/inventory/groups">
              Groups
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #fafafa;
  color: #00d1b2;
}
.navbar-dropdown .router-link-exact-active {
  background-color: whitesmoke; 
}
</style>

<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    const menuOpen = ref(false)

    return {
      toggleBurger: () => (menuOpen.value = !menuOpen.value),
      menuOpen,
    }
  },
}
</script>
