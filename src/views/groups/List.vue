<template>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li class="is-active">
        <router-link to="/groups">Group inventory</router-link>
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
              <input
                class="input"
                type="text"
                placeholder="Find a group"
                @input="searchGroup($event.target.value)"
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
          <a>With parent</a>
        </p> -->
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
              <th>PARENT GROUP</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="group in groupList"
              :key="group.id"
              @click="onGroupClick(group.id)"
            >
              <td>{{ group.id }}</td>
              <td>{{ group.name }}</td>
              <td>{{ group.parent ? group.parent.name : '' }}</td>
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
import groupApi from '../../servcies/inventory/group'

export default {
  name: 'Groups',
  async setup() {
    let router = useRouter()
    let groupList = ref([])
    let timeoutRef = null

    groupList.value = await groupApi.get_multi()

    const onGroupClick = (id) => router.push({ name: 'Group', params: { id } })

    const searchGroup = async (query) => {
      if (timeoutRef !== null) clearTimeout(timeoutRef)
      timeoutRef = setTimeout(async () => {
        if (query == '') groupList.value = await groupApi.get_multi()
        else groupList.value = await groupApi.search(query)
      }, 200)
    }

    return {
      groupList,
      onGroupClick,
      searchGroup,
    }
  },
}
</script>
