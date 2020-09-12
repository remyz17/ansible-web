<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/inventory/hosts">Host inventory</router-link>
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
              <a
                @click="createHost"
                class="button is-primary"
                :class="{ 'is-loading': createLoding }"
                >Create</a
              >
            </p>
          </div>
        </nav>
        <div class="columns">
          <div class="column is-4 is-12-mobile">
            <div class="field">
              <label class="label">Hostname</label>
              <div class="control">
                <input
                  class="input is-small"
                  :class="{ 'is-danger': modelState.hostnameErr }"
                  type="text"
                  placeholder="Hostname"
                  @input="modelState.hostnameErr = flase"
                  v-model="modelState.hostname"
                />
              </div>
              <p v-if="modelState.hostnameErr" class="help is-danger">
                Hostname is required !
              </p>
            </div>

            <div class="field">
              <label class="label">Group</label>
              <ReferenceField
                label="Group"
                model="group"
                :data="modelState"
                @update-item="refUpdate"
                @delete-item="refDelete"
              />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="tabs">
              <ul>
                <li class="is-active"><a>Variables</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-mobile">
            <VarsField :data="modelState" :isEditing="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.w100 {
  width: 100%;
}
</style>

<script>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import hostApi from '/@/servcies/inventory/host.js'
import groupApi from '/@/servcies/inventory/group.js'
import ReferenceField from '../composable/ReferenceField.vue'
import VarsField from '../composable/VarsField.vue'

export default {
  name: 'HostCreate',
  components: {
    ReferenceField,
    VarsField,
  },
  setup() {
    let router = useRouter()
    let modelState = reactive({
      hostname: '',
      hostnameErr: false,
      group: '',
      group_id: '',
      groupRO: false,
      variables: [],
    })
    let createLoding = ref(false)

    const createHost = async () => {
      if (modelState.hostname == '') {
        modelState.hostnameErr = true
        return
      }
      modelState.hostnameErr = false
      createLoding.value = true
      let newHost = await hostApi.create({
        hostname: modelState.hostname,
        ...(modelState.groupId && { group_id: modelState.groupId }),
        ...(modelState.variables.length && { variables: modelState.variables }),
      })
      createLoding.value = false
      router.push({ name: 'Host', params: { id: newHost.id } })
    }

    const refUpdate = (group) => {
      modelState.group = group.name
      modelState.group_id = group.id
    }

    const refDelete = () => {
      modelState.group_id = null
      modelState.group = null
    }

    return {
      modelState,
      createHost,
      createLoding,
      refUpdate,
      refDelete,
    }
  },
}
</script>
