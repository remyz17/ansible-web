<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Host {{ hostData.hostname }}</h1>
      <!-- <h2 class="subtitle">
        A simple container to divide your page into
        <strong>sections</strong>, like the one you're currently reading
      </h2>-->
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/hosts">Hosts inventory</router-link>
          </li>
          <li class="is-active">
            <router-link
              :to="{name: 'HostItem', params: { id: hostData.id }}"
            >{{ hostData.hostname }}</router-link>
          </li>
        </ul>
      </nav>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import { watchEffect, watch, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Api } from "../../servcies/api"

export default {
  name: 'Host',
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const hostData = ref([])
    const api = new Api("host");

    hostData.value = await api.get(route.params.id)
    console.log(hostData.value)
    return {
      hostData
    }
  }
}
</script>