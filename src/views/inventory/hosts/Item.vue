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
              <div class="control" v-else="">
                <p>{{ hostData.hostname }}</p>
              </div>
            </div>

            <div v-if="hostData.group" class="field">
              <label class="label">Group</label>
              <div class="control" v-if="isEditing">
                <!-- <input
                  class="input is-small"
                  type="text"
                  v-model="hostData.group.name"
                /> -->
                <ReferenceField
                  label="Group"
                  model="group"
                  :initialVal="hostData.group.name"
                  @update-item="refUpdate"
                  @delete-item="refDelete"
                />
              </div>
              <div class="control" v-else="">
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
                      v-model="_var.key"
                      :readonly="!isEditing"
                    />
                  </p>
                </div>

                <div class="field" :class="{ ' has-addons': isEditing }">
                  <p class="control">
                    <input
                      class="input is-small"
                      :class="{ 'is-static': !isEditing }"
                      type="text"
                      v-model="_var.value"
                      :readonly="!isEditing"
                    />
                  </p>
                  <p class="control" v-if="isEditing">
                    <a
                      class="button is-small is-danger"
                      @click="delHostVar(index)"
                    >
                      Del
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="isEditing" class="field is-horizontal">
              <div class="field-body">
                <div class="field has-addons">
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Key"
                      v-model="hostVarState.key"
                    />
                  </div>
                </div>
                <div class="field has-addons">
                  <p class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Value"
                      v-model="hostVarState.value"
                    />
                  </p>
                  <p class="control">
                    <a class="button is-small" @click="addHostVar"> Add </a>
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
import ReferenceField from '../composable/ReferenceField.vue'

export default {
  name: 'Host',
  components: {
    ReferenceField,
  },
  setup() {
    let router = useRouter()
    let route = useRoute()
    let hostData = ref([])
    let editState = null
    let deletePending = ref(false)
    let isEditing = ref(false)
    let hostVarState = reactive({
      key: '',
      value: '',
    })

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

    const refUpdate = (data) => {
      console.log('on update', data)
      hostData.value.group_id = data.id
      hostData.value.group = data
    }

    const refDelete = () => {
      hostData.value.group_id = null
      hostData.value.group = null
    }

    const handleEdit = () => {
      isEditing.value = !isEditing.value
    }

    const saveEdit = async () => {
      console.log('tigger save')
      console.log(hostData.value, hostData.value.id)
      let res = await hostApi.update(hostData.value.id, hostData.value)
      console.log(res)
      isEditing.value = false
    }

    const addHostVar = () =>
      hostData.value.hostvars
        ? hostData.value.hostvars.push({ ...hostVarState })
        : (hostData.value.hostvars = [{ ...hostVarState }])

    const delHostVar = (index) => hostData.value.hostvars.splice(index, 1)

    return {
      hostData,
      deletePending,
      handleDelete,
      isEditing,
      handleEdit,
      saveEdit,
      refUpdate,
      refDelete,
      hostVarState,
      addHostVar,
      delHostVar,
    }
  },
}
</script>
