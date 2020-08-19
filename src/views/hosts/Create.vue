<template>
  <h2 class="subtitle"><strong>Host</strong> item</h2>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/inventory/hosts">Hosts inventory</router-link>
      </li>
      <li class="is-active">
        <router-link :to="{ name: 'HostCreate' }">New item</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"><strong>Host</strong> create</p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <router-link :to="{ name: 'Hosts' }" class="button"
            >Cancel</router-link
          >
        </p>
        <p class="level-item">
          <a class="button is-success">Save</a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Hostname</label>
          <div class="control">
            <input class="input" type="text" placeholder="Hostname" />
          </div>
        </div>
        <div class="field">
          <label class="label">Group</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Group"
              :v-model="group"
              @input="searchFn($event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <ol type="1">
          <li
            v-for="group in payload"
            :key="group.id"
          >
            {{ group.name }}
          </li>
        </ol>
      </div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Api } from '../../servcies/api'

export default {
  name: 'HostCreate',
  async setup() {
    const group = ref('')
    const api = new Api('group')
    let payload = ref([])

    const searchFn = async (query) => {
      payload.value = await api.search(query)
      console.log(payload.value)
    }

    return {
      group,
      searchFn,
      payload,
    }
  },
}
</script>
