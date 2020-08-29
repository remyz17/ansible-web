<template>
  <Header />
  <main id="main">
    <!-- <Suspense>
      <template #default> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- </template>
      <template #fallback>
        <div class="hero-body">
          <div class="container has-text-centered">
            <img id="loader" src="./assets/loader.svg" />
          </div>
        </div>
      </template>
    </Suspense> -->
  </main>
  <Footer />
</template>

<style>
#loader {
  width: 150px;
  padding: 20px 40px;
}
#loader src {
  fill: #ff0000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import Header from '/@/components/Header.vue'
import Footer from '/@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>
