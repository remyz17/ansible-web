<template>
  <h2 class="subtitle"><strong>Host</strong> item</h2>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/inventory/hosts">Hosts inventory</router-link>
      </li>
      <li class="is-active">
        <router-link :to="{ name: 'Host', params: { id: hostData.id } }">{{
          hostData.hostname
        }}</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"><strong>Host</strong> item</p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <router-link
            :to="{ name: 'Host', params: { id: hostData.id } }"
            class="button"
            >Edit</router-link
          >
        </p>
        <p class="level-item">
          <a
            class="button is-danger"
            :class="{ 'is-loading': deletePending }"
            @click="handleDelete"
          >
            Delete
          </a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <p>
          <strong>ID:</strong>
          {{ hostData.id }}
        </p>
        <p>
          <strong>Hostname:</strong>
          {{ hostData.hostname }}
        </p>
        <p v-if="hostData.group">
          <strong>Group: </strong>
          <router-link
            :to="{ name: 'Group', params: { id: hostData.group_id } }"
            >{{ hostData.group.name }}</router-link
          >
        </p>
      </div>
      <div class="column">
        <table
          class="table is-hoverable"
          v-if="hostData.hostvars && hostData.hostvars.length > 0"
        >
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_var, index) in hostData.hostvars" :key="index">
              <td>{{ _var.key }}</td>
              <td>{{ _var.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import hostApi from '../../servcies/inventory/host'

export default {
  name: 'Host',
  async setup() {
    let router = useRouter()
    let route = useRoute()
    let hostData = ref([])
    let deletePending = ref(false)

    /* watch(route, async () => {
      console.log('watch trigger')
      hostData.value = await api.get(route.params.id)
    }) */

    watchEffect(() => console.log('trigger', route))

    const handleDelete = async () => {
      deletePending.value = true
      await hostApi.delete(hostData.value.id)
      deletePending.value = false
      router.push('/inventory/hosts')
    }

    hostData.value = await hostApi.get(route.params.id)
    return {
      hostData,
      deletePending,
      handleDelete,
    }
  },
}
</script>
