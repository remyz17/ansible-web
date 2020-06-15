<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Section</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>
      <p v-for="(item, i) in data">{{ item.a }}</p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Groups',
  setup() {
    const data = ref([{a: 'b'}, {a: 'c'}])

    return {
      data
    }
  }
}
</script>