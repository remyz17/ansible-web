<template>
<section class="section">
    <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/hosts">Hosts</router-link>
        </li>
        <li class="is-active">
          <a href="#">{{ hostData.hostname }}</a>
        </li>
      </ul>
    </nav>
  </section>
  <section class="section">
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Hosts Item</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>{{ hostData.hostname }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, watch, ref, onMounted } from 'vue'
import {  
  useRoute,
  useRouter 
} from 'vue-router'
import { Api } from '../servcies/api'

export default {
  name: 'HostItem',
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const hostData = ref([])
    const api = new Api('host')
    /* const hostId = computed(() => route.params.id)
    watchEffect(() => console.log(hostId)) */
    onMounted(async () => {
      console.log('onMounted')
      hostData.value = await api.get(route.params.id)
      console.log(hostData.value)
    })
    return {
      hostData
    }
  }
}
</script>