<template>
  <section class="section">
    <div class="container">
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
                  :class="{ 'is-danger': modelState.nameErr }"
                  type="text"
                  placeholder="Name"
                  @input="modelState.nameErr = flase"
                  v-model="modelState.name"
                />
              </div>
              <p v-if="modelState.nameErr" class="help is-danger">
                Name is required !
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
                    v-model="modelState.parent"
                    :readonly="modelState.parentRO"
                    @input="searchGroup($event.target.value)"
                    @dblclick="unsetParent"
                  />
                  <!-- @blur="onBlurGroup" this make the @click="setParent(group)" uncallable -->
                </div>
                <div class="dropdown-menu w100" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                    <a
                      v-for="parent in searchResults"
                      :key="parent.id"
                      class="dropdown-item"
                      @click="setParent(parent)"
                    >
                      {{ parent.name }}
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
                    <a class="button is-small" @click="addGroupVar"> Add </a>
                  </p>
                </div>
              </div>
            </div>
            <div
              v-show="modelState.groupVars.length > 0"
              v-for="(param, index) in modelState.groupVars"
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
      name: '',
      nameErr: '',
      parent: '',
      parentId: '',
      parentRO: false,
      groupVars: [],
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

    const setParent = (group) => {
      modelState.parent = group.name
      modelState.parentId = group.id
      modelState.parentRO = true
      searchActive.value = false
    }

    const unsetParent = () => {
      modelState.parentId = ''
      modelState.parentRO = false
    }

    const addGroupVar = () => {
      modelState.groupVars.push({
        key: modelState.keyVar,
        value: modelState.valueVar,
      })
    }

    const deleteGroupVar = (index) => modelState.groupVars.splice(index, 1)

    const createHost = async () => {
      if (modelState.name == '') {
        modelState.nameErr = true
        return
      }
      modelState.nameErr = false
      createLoding.value = true
      let newGroup = await groupApi.create({
        name: modelState.name,
        ...(modelState.parentId && { parent_id: modelState.parentId }),
        ...(modelState.groupVars.length && { groupvars: modelState.groupVars }),
      })
      createLoding.value = false
      router.push({ name: 'Group', params: { id: newGroup.id } })
    }

    return {
      modelState,
      searchResults,
      searchGroup,
      searchActive,
      setParent,
      unsetParent,
      addGroupVar,
      deleteGroupVar,
      createHost,
      createLoding,
    }
  },
}
</script>
