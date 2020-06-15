<template>
  <Header />
  <section id="main" class="section">
    <div class="container is-widescreen">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{{ $route.name }}</h1>
          </div>
        </div>
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
  </section>
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>