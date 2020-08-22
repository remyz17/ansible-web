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

        <div class="dropdown" :class="[data.length > 0 ? 'is-active' : '']">
          <div class="dropdown-trigger">
            <div class="field">
              <label class="label">Group</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Group"
                  @input="debouceSearch($event.target.value)"
                />
              </div>
            </div>
          </div>
          <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              <a v-for="group in data" :key="group.id" class="dropdown-item">
                {{ group.name }}
              </a>
              <hr class="dropdown-divider" />
              <router-link to="/inventory/group/create" class="dropdown-item">
                Create
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
  </div>
</template>

<style scoped>
.searchGroup {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.26s ease;
}
.searchGroup.expanded {
  transform: scaleY(1);
}
</style>

<script>
import { ref, computed } from 'vue'
import { Api } from '../../servcies/api'

export default {
  name: 'HostCreate',
  async setup() {
    const api = new Api('group')
    let payload = ref([])
    let timeoutRef = null

    const debouceSearch = query => {
      if (query == '') return
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef)
      }
      timeoutRef = setTimeout(async () => {
        payload.value = await api.search(query)
        console.log(payload.value)
      }, 200)
    }

    return {
      data: computed(() => payload.value),
      debouceSearch
    }
  },
}
</script>
