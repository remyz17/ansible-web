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
              <div class="dropdown w100" :class="{ 'is-active': searchActive }">
                <div class="dropdown-trigger w100">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="Group"
                    v-model="modelState.group"
                    :readonly="modelState.groupRO"
                    @input="searchGroup($event.target.value)"
                    @dblclick="unsetGroup"
                  />
                  <!-- @blur="onBlurGroup" this make the @click="setGroup(group)" uncallable -->
                </div>
                <div class="dropdown-menu w100" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                    <a
                      v-for="group in searchResults"
                      :key="group.id"
                      class="dropdown-item"
                      @click="setGroup(group)"
                    >
                      {{ group.name }}
                    </a>
                    <hr class="dropdown-divider" />
                    <router-link
                      to="/inventory/group/create"
                      class="dropdown-item"
                    >
                      Create
                    </router-link>
                  </div>
                </div>
              </div>
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
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <input
                    class="input is-small"
                    type="text"
                    placeholder="Key"
                    v-model="modelState.keyVar"
                  />
                </div>
                <div class="field has-addons">
                  <p class="control">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Value"
                      v-model="modelState.valueVar"
                    />
                  </p>
                  <p class="control">
                    <a class="button is-small" @click="addHostVar"> Add </a>
                  </p>
                </div>
              </div>
            </div>
            <div
              v-show="modelState.hostVars.length > 0"
              v-for="(param, index) in modelState.hostVars"
              :key="param.key"
              class="field is-horizontal"
            >
              <div class="field-body">
                <div class="field">
                  <input
                    class="input is-small"
                    type="text"
                    :value="param.key"
                    readonly
                  />
                </div>
                <div class="field has-addons">
                  <p class="control">
                    <input
                      class="input is-small"
                      type="text"
                      :value="param.value"
                      readonly
                    />
                  </p>
                  <p class="control">
                    <a
                      class="button is-danger is-small"
                      @click="deleteHostVar(index)"
                    >
                      delete
                    </a>
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

<style scoped>
.w100 {
  width: 100%;
}
</style>

<script>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import hostApi from '../../servcies/inventory/host'
import groupApi from '../../servcies/inventory/group'

export default {
  name: 'HostCreate',
  setup() {
    let router = useRouter()
    let modelState = reactive({
      hostname: '',
      hostnameErr: false,
      group: '',
      groupRO: false,
      hostVars: [],
      keyVar: '',
      valueVar: '',
    })
    let groupsData = ref([])
    let searchActive = ref(false)
    let createLoding = ref(false)
    let timeoutRef = null

    const searchResults = computed(() => groupsData.value)

    const searchGroup = (query) => {
      if (query == '') {
        searchActive.value = false
        return
      }
      if (timeoutRef !== null) clearTimeout(timeoutRef)
      timeoutRef = setTimeout(async () => {
        groupsData.value = await groupApi.search(query)
        searchActive.value = true
      }, 200)
    }

    const setGroup = (group) => {
      modelState.group = group.name
      modelState.groupId = group.id
      modelState.groupRO = true
      searchActive.value = false
    }

    const unsetGroup = () => {
      modelState.groupId = ''
      modelState.groupModelRO = false
    }

    const addHostVar = () => {
      modelState.hostVars.push({
        key: modelState.keyVar,
        value: modelState.valueVar,
      })
    }

    const deleteHostVar = (index) => modelState.hostVars.splice(index, 1)

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
        ...(modelState.hostVars.length && { hostvars: modelState.hostVars }),
      })
      createLoding.value = false
      router.push({ name: 'Host', params: { id: newHost.id } })
    }

    return {
      modelState,
      searchResults,
      searchGroup,
      searchActive,
      setGroup,
      unsetGroup,
      addHostVar,
      deleteHostVar,
      createHost,
      createLoding,
    }
  },
}
</script>
