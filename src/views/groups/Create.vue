<template>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/inventory/groups">Group inventory</router-link>
      </li>
      <li class="is-active">
        <router-link :to="{ name: 'GroupCreate' }">New item</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"><strong>Group</strong> create</p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <router-link :to="{ name: 'Groups' }" class="button"
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
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="Name"
              v-model="nameModel"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Group</label>
          <div class="dropdown w100" :class="{ 'is-active': searchActive }">
            <div class="dropdown-trigger w100">
              <input
                class="input is-small"
                type="text"
                placeholder="Group"
                v-model="parentModel"
                :readonly="parentModelRO"
                @input="debouceSearch($event.target.value)"
                @dblclick="unsetParent"
              />
              <!-- @blur="onBlurGroup" this make the @click="setGroup(group)" uncallable -->
            </div>
            <div class="dropdown-menu w100" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a
                  v-for="parent in data"
                  :key="parent.id"
                  class="dropdown-item"
                  @click="setGroup(parent)"
                >
                  {{ parent.name }}
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
                v-model="keyModel"
              />
            </div>
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Value"
                  v-model="valueModel"
                />
              </p>
              <p class="control">
                <a class="button is-small" @click="addGroupVar"> Add </a>
              </p>
            </div>
          </div>
        </div>
        <div
          v-show="groupVars.length > 0"
          v-for="(param, index) in groupVars"
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
                  @click="deleteGroupVar(index)"
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
import { useRouter } from 'vue-router'
import hostApi from '../../servcies/inventory/host'
import groupApi from '../../servcies/inventory/group'

export default {
  name: 'HostCreate',
  async setup() {
    let router = useRouter()
    let nameModel = ref('')
    let parentModel = ref('')
    let parentModelRO = ref(false)
    let parentId = ref('')
    let groupVars = ref([])
    let keyModel = ref('')
    let valueModel = ref('')
    let payload = ref([])
    let searchActive = ref(false)
    let createLoding = ref(false)
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

    const setGroup = (group) => {
      console.log('group set', group)
      parentModel.value = group.name
      parentId.value = group.id
      parentModelRO.value = true
      searchActive.value = false
    }

    const unsetGroup = () => {
      parentId.value = ''
      parentModelRO.value = false
    }

    const addGroupVar = () => {
      console.log(groupVars.value)
      groupVars.value.push({
        key: keyModel.value,
        value: valueModel.value,
      })
      console.log(groupVars.value)
    }

    const deleteGroupVar = (index) => groupVars.value.splice(index, 1)

    const createHost = async () => {
      createLoding.value = true
      let vals = {
        name: nameModel.value,
        ...(parentId.value && { parent_id: parentId.value }),
        ...(groupVars.value.length && { groupvars: groupVars.value }),
      }
      let newGroup = await groupApi.create(vals)
      console.log(newGroup)
      createLoding.value = false
      router.push({ name: 'Group', params: { id: newGroup.id } })
    }

    return {
      data: computed(() => payload.value),
      nameModel,
      parentModel,
      debouceSearch,
      searchActive,
      setGroup,
      unsetGroup,
      parentModelRO,
      groupVars,
      addGroupVar,
      deleteGroupVar: (index) => groupVars.value.splice(index, 1),
      keyModel,
      valueModel,
      createHost,
      createLoding,
    }
  },
}
</script>
