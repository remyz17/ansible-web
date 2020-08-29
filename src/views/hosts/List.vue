<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li class="is-active">
            <router-link to="/hosts">Host inventory</router-link>
          </li>
        </ul>
      </nav>
      <div class="box">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <!-- <div class="level-item">
          <p class="subtitle is-5"><strong>123</strong> Groups</p>
        </div> -->
            <div class="level-item">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Find a host"
                    @input="searchHost($event.target.value)"
                  />
                </p>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <!-- <p class="level-item">
          <strong>All</strong>
        </p>
        <p class="level-item">
          <a>With group</a>
        </p> -->
            <p class="level-item">
              <router-link
                :to="{ name: 'HostCreate' }"
                class="button is-primary"
                >Create</router-link
              >
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
                  v-for="host in hostList"
                  :key="host.id"
                  @click="onHostClick(host.id)"
                >
                  <td>{{ host.id }}</td>
                  <td>{{ host.hostname }}</td>
                  <td>{{ host.group ? host.group.name : '' }}</td>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import hostApi from '../../servcies/inventory/host'

export default {
  name: 'Hosts',
  setup() {
    let router = useRouter()
    let hostList = ref([])
    let timeoutRef = null

    onMounted(async () => (hostList.value = await hostApi.get_multi()))

    const onHostClick = (id) => router.push({ name: 'Host', params: { id } })

    const searchHost = async (query) => {
      if (timeoutRef !== null) clearTimeout(timeoutRef)
      timeoutRef = setTimeout(async () => {
        if (query == '') hostList.value = await hostApi.get_multi()
        else hostList.value = await hostApi.search(query)
      }, 200)
    }

    return {
      hostList,
      onHostClick,
      searchHost,
    }
  },
}
</script>
