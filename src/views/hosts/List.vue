<template>
  <h2 class="subtitle"><strong>Hosts</strong> list</h2>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li class="is-active">
        <router-link to="/hosts">Hosts inventory</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <!-- <div class="level-item">
              <p class="subtitle is-5">
                <strong>123</strong> Groups
              </p>
            </div>-->
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a host" />
            </p>
            <p class="control">
              <button class="button">Search</button>
            </p>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <strong>All</strong>
        </p>
        <p class="level-item">
          <a>With group</a>
        </p>
        <p class="level-item">
          <a class="button">New</a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>GROUP</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="host in payload"
              :key="host.id"
              @click="onHostClick(host.id)"
            >
              <td>{{ host.id }}</td>
              <td>{{ host.hostname }}</td>
              <td>{{ host.group ? host.group.name : ''  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Api } from '../../servcies/api'

export default {
  name: 'Hosts',
  async setup() {
    const router = useRouter()
    const api = new Api('host')
    let payload = ref([])

    payload.value = await api.get_multi()

    return {
      payload,
      onHostClick: (id) => router.push({ name: 'Host', params: { id } }),
    }
  },
}
</script>
