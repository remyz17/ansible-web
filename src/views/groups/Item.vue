<template>
  <h2 class="subtitle"><strong>Group</strong> item</h2>
    <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/inventory/groups">Groups inventory</router-link>
      </li>
      <li class="is-active">
        <router-link :to="{ name: 'Group', params: { id: groupData.id } }">{{
          groupData.name
        }}</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"><strong>Group</strong> item</p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <router-link
            :to="{ name: 'Group', params: { id: groupData.id } }"
            class="button"
            >Edit</router-link
          >
        </p>
        <p class="level-item">
          <a class="button is-danger">Delete</a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <p>
          <strong>ID:</strong>
          {{ groupData.id }}
        </p>
        <p>
          <strong>Name:</strong>
          {{ groupData.name }}
        </p>
        <p v-if="groupData.parent">
          <strong>Group: </strong>
          <router-link :to="{ name: 'Group', params: { id: groupData.parent_id } }">{{ groupData.parent.name }}</router-link>
        </p>
      </div>
      <div class="column">
        <table class="table is-hoverable" v-if="groupData.groupvars">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_var, index) in groupData.groupvars" :key="index">
              <td>{{ _var.key }}</td>
              <td>{{ _var.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Hostloader {
  width: 150px;
  padding: 20px 40px;
}
#Hostloader src {
  fill: #ff0000;
}
</style>

<script>
import { watchEffect, watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Api } from '../../servcies/api'

export default {
  name: 'Host',
  async setup() {
    const route = useRoute()
    const router = useRouter()
    const groupData = ref([])
    const api = new Api('group')

    watch(route, async () => {
      console.log('watch trigger')
      groupData.value = await api.get(route.params.id)
    })

    /* watchEffect(() => {
      console.log('trigger', route.params)
      groupData.value = await api.get(route.params.id)
    }) */

    groupData.value = await api.get(route.params.id)
    return {
      groupData,
    }
  },
}
</script>
