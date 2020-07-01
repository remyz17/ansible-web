<template>
  <Header />
  <main id="main">
    <div class="container is-widescreen">
      <section class="section">
        <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
          <ul>
            <li class="is-active">
              <a href="#">{{ $route.name }}</a>
            </li><!-- 
            <li>
              <a href="#">{{ $route.params.id }}</a>
            </li> -->
          </ul>
        </nav>
      </section>
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <span>I'm a loading screen, I'm waiting the view to be ready!</span>
        </template>
      </Suspense>
    </div>
  </main>
  <Footer />
</template>

<script>
import { useRoute } from 'vue-router'
import Header from "/@/components/Header.vue"
import Footer from "/@/components/Footer.vue"

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  setup() {
    const route = useRoute()

    if (route.params) {
      console.log(Object.keys(route.params).length)
    }

    return {
      route
    }
  }
}
</script>