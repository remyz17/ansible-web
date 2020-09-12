<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/inventory/hosts">Host inventory</router-link>
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
              <p class="subtitle is-5">
                <strong>Host</strong>
                {{ hostData.id }}
              </p>
            </div>
          </div>

          <div class="level-right">
            <p class="level-item" v-if="!isEditing">
              <a @click="handleEdit" class="button">Edit</a>
            </p>
            <p class="level-item" v-if="!isEditing">
              <a
                class="button is-danger"
                :class="{ 'is-loading': deletePending }"
                @click="handleDelete"
                >Delete</a
              >
            </p>
            <p class="level-item" v-if="isEditing">
              <a @click="isEditing = false" class="button">Cancel</a>
            </p>
            <p class="level-item" v-if="isEditing">
              <a @click="saveEdit" class="button is-primary">Save</a>
            </p>
          </div>
        </nav>
        <div class="columns">
          <div class="column is-one-third">
            <div class="field">
              <label class="label">Hostname</label>
              <div class="control" v-if="isEditing">
                <input
                  class="input is-small"
                  type="text"
                  v-model="hostData.hostname"
                />
              </div>
              <div class="control" v-else>
                <p>{{ hostData.hostname }}</p>
              </div>
            </div>

            <div v-if="isEditing || hostData.group" class="field">
              <label class="label">Group</label>
              <div class="control" v-if="isEditing">
                <ReferenceField
                  label="Group"
                  model="group"
                  :data="hostData"
                  @update-item="refUpdate"
                  @delete-item="refDelete"
                />
              </div>
              <div class="control" v-else>
                <router-link
                  :to="{ name: 'Group', params: { id: hostData.group.id } }"
                  >{{ hostData.group.name }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="tabs">
              <ul>
                <li class="is-active">
                  <a>Variables</a>
                </li>
                <li>
                  <a>Jobs</a>
                </li>
                <li>
                  <a>All groups</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-mobile">
            <VarsField :data="hostData" :isEditing="isEditing" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import hostApi from '/@/servcies/inventory/host.js'
import ReferenceField from '../composable/ReferenceField.vue'
import VarsField from '../composable/VarsField.vue'

export default {
  name: 'Host',
  components: {
    ReferenceField,
    VarsField,
  },
  setup() {
    let router = useRouter()
    let route = useRoute()
    let hostData = ref([])
    let deletePending = ref(false)
    let isEditing = ref(false)

    const fetchHost = async (id) => (hostData.value = await hostApi.get(id))

    watchEffect(async () => await fetchHost(route.params.id))

    const handleDelete = async () => {
      deletePending.value = true
      await hostApi.delete(hostData.value.id)
      deletePending.value = false
      router.push('/inventory/hosts')
    }

    const handleEdit = () => (isEditing.value = !isEditing.value)

    const refUpdate = (data) => {
      hostData.value.group_id = data.id
      hostData.value.group = data
    }

    const refDelete = () => {
      hostData.value.group_id = null
      hostData.value.group = null
    }

    const saveEdit = async () => {
      let res = await hostApi.update(hostData.value.id, {
        hostname: hostData.value.hostname,
        ...(hostData.value.group_id && { group_id: hostData.value.group_id }),
        ...(hostData.value.variables && {
          variables: hostData.value.variables,
        }),
      })
      isEditing.value = false
    }

    return {
      hostData,
      deletePending,
      handleDelete,
      isEditing,
      handleEdit,
      saveEdit,
      refUpdate,
      refDelete,
    }
  },
}
</script>
