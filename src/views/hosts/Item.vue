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
                <strong>Host</strong> {{ hostData.id }}
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
              >
                Delete
              </a>
            </p>
            <p class="level-item" v-if="isEditing">
              <a @click="handleEdit" class="button">Cancel</a>
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
                  :value="hostData.hostname"
                />
              </div>
              <div class="control" v-else="">
                <p>{{ hostData.hostname }}</p>
              </div>
            </div>

            <div v-if="hostData.group" class="field">
              <label class="label">Group</label>
              <div class="control" v-if="isEditing">
                <input
                  class="input is-small"
                  type="text"
                  :value="hostData.group.name"
                />
              </div>
              <div class="control" v-else="">
                <router-link
                  :to="{ name: 'Group', params: { id: hostData.group_id } }"
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
                <li class="is-active"><a>Variables</a></li>
                <li><a>Jobs</a></li>
                <li><a>All groups</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-mobile">
            <div
              v-if="hostData.hostvars && hostData.hostvars.length > 0"
              v-for="(_var, index) in hostData.hostvars"
              :key="index"
              class="field is-horizontal"
            >
              <div class="field-body">
                <div class="field" :class="{ ' has-addons': isEditing }">
                  <p class="control">
                    <input
                      class="input is-small"
                      :class="{ 'is-static': !isEditing }"
                      type="text"
                      :value="_var.key"
                      :readonly="!isEditing"
                      @input="handleKeyChange($event.target.value, index)"
                    />
                  </p>
                  <p v-if="isEditing" class="control">
                    <a class="button is-small"> save </a>
                  </p>
                </div>

                <div class="field" :class="{ ' has-addons': isEditing }">
                  <p class="control">
                    <input
                      class="input is-small"
                      :class="{ 'is-static': !isEditing }"
                      type="text"
                      :value="_var.value"
                      :readonly="!isEditing"
                      @input="handleValueChange($event.target.value, index)"
                    />
                  </p>
                  <p v-if="isEditing" class="control">
                    <a class="button is-small"> save </a>
                  </p>
                </div>
              </div>
            </div>
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

export default {
  name: 'Host',
  setup() {
    let router = useRouter()
    let route = useRoute()
    let hostData = ref([])
    let editState = reactive({
      hostname: '',
      group: '',
      group_id: '',
      hostvars: [],
    })
    let deletePending = ref(false)
    let isEditing = ref(false)

    const fetchHost = async (id) => {
      hostData.value = await hostApi.get(id)
    }

    /* onMounted(async () => await fetchHost(route.params.id)) */

    watchEffect(async () => await fetchHost(route.params.id))

    const handleDelete = async () => {
      deletePending.value = true
      await hostApi.delete(hostData.value.id)
      deletePending.value = false
      router.push('/inventory/hosts')
    }

    const handleEdit = () => {
      editState.hostname
      isEditing.value = !isEditing.value
    }
    const saveEdit = () => {
      console.log('tigger save')
      console.log(hostData.value)
    }

    const handleKeyChange = (val, index) =>
      (hostData.value.hostvars[index].key = val)

    const handleValueChange = (val, index) =>
      (hostData.value.hostvars[index].value = val)

    return {
      hostData,
      deletePending,
      handleDelete,
      isEditing,
      handleEdit,
      saveEdit,
      handleKeyChange,
      handleValueChange,
    }
  },
}
</script>
