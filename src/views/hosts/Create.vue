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
          <a @click="createHost" class="button is-success">Create</a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-4 is-12-mobile">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Hostname</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input 
                  class="input"
                  type="text"
                  placeholder="Hostname"
                  v-model="hostnameModel"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Group</label>
          </div>
          <div class="dropdown w100" :class="{ 'is-active': searchActive }">
            <div class="dropdown-trigger w100">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Group"
                      v-model="groupModel"
                      :readonly="groupModelRO"
                      @input="debouceSearch($event.target.value)"
                      @dblclick="setGroupRW"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown-menu w100" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              <a
                v-for="group in data"
                :key="group.id"
                class="dropdown-item"
                @click="setGroup(group)"
              >
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
      </div>
      <div class="column is-8 is-12-mobile">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Hostvars</label>
          </div>
          <div class="field-body">
            <div class="field">
              <input 
                class="input"
                type="text"
                placeholder="Key"
                v-model="keyModel"
              />
            </div>
            <div class="field has-addons">
              <p class="control">
              <input
                class="input"
                type="text"
                placeholder="Value"
                v-model="valueModel"
              />
              </p>
              <p class="control">
                <a 
                  class="button"
                  @click="addHostVar"
                >
                  Add
                </a>
              </p>
            </div>
          </div>
        </div>
        <div v-show="hostVars.length > 0" v-for="(param, index) in hostVars" :key="param.key" class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">{{ index + 1 }}</label>
          </div>
          <div class="field-body">
            <div class="field">
              <input 
                class="input"
                type="text"
                :value="param.key"
                readonly
              />
            </div>
            <div class="field has-addons">
              <p class="control">
              <input
                class="input"
                type="text"
                :value="param.value"
                readonly
              />
              </p>
              <p class="control">
                <a 
                  class="button is-danger"
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
</template>

<style scoped>
.w100 {
  width: 100%;
}
</style>

<script>
import { ref, computed, reactive } from 'vue'
import { Api } from '../../servcies/api'

const groupApi = new Api('group')
const hostApi = new Api('host')

export default {
  name: 'HostCreate',
  async setup() {
    let hostnameModel = ref('')
    let groupModel = ref('')
    let groupModelRO = ref(false)
    let groupId = ref('')
    let hostVars = ref([])
    let keyModel = ref('')
    let valueModel = ref('')
    let payload = ref([])
    let searchActive = ref(false)
    let timeoutRef = null

    const debouceSearch = (query) => {
      if (query == '') return
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef)
      }
      timeoutRef = setTimeout(async () => {
        payload.value = await groupApi.search(query)
        searchActive.value = true
        console.log(payload.value)
      }, 200)
    }

    const setGroup = async (group) => {
      console.log(group)
      groupModel.value = group.name
      groupId.value = group.id
      groupModelRO.value = true
      searchActive.value = false
    }

    const addHostVar = () => {
      console.log(hostVars.value)
      hostVars.value.push(
        {
          'key': keyModel.value,
          'value': valueModel.value
        }
      )
      console.log(hostVars.value)
    }

    const deleteHostVar = index => hostVars.value.splice(index, 1)

    const createHost = async () => {
      let vals = {
        'hostname': hostnameModel.value,
        'group_id': groupId.value,
        'hostvars': hostVars.value
      }
      let newHost = await hostApi.create(vals)
      console.log(newHost)
    }

    return {
      data: computed(() => payload.value),
      hostnameModel,
      groupModel,
      debouceSearch,
      searchActive,
      setGroup,
      groupModelRO,
      setGroupRW: () => (groupModelRO.value = false),
      hostVars,
      addHostVar,
      deleteHostVar: index => hostVars.value.splice(index, 1),
      keyModel,
      valueModel,
      createHost
    }
  },
}
</script>
