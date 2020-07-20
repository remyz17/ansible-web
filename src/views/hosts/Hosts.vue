<template>
  <section class="section">
    <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
      <ul>
        <li class="is-active">
          <a href="#">{{ $route.name }}</a>
        </li>
      </ul>
    </nav>
  </section>
  <section class="section">
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Hosts list</p>
        </header>
        <div class="card-content">
          <div class="content">
            <table class="table is-hoverable">
              <thead>
                <tr>
                  <th>Hostname</th>
                  <th>Id</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in res" :key="r.id" @click="onClick(r.id)">
                  <td>{{ r.hostname }}</td>
                  <td>{{ r.id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Api } from '../../servcies/api'

export default {
  name: 'Hosts',
  async setup() {
    const router = useRouter()
    const api = new Api('host')
    let res = ref([])

    res.value = await api.get_multi()
    console.log('ahah timeout')

    console.log(await api.update('5f159dc63f4693d65e963678', {
      hostname: 'Test update from js'
    }))

    return {
      onClick: (id) => {
        console.log('ahaha', id)
        router.push({name: 'HostItem', params: { id } })
      },
      res
    }
    
  }
};
</script>