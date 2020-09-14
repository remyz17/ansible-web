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
      name: '',
      nameErr: false,
      parent: '',
      parent_id: '',
      variables: [],
    })
    let createLoding = ref(false)

    const createHost = async () => {
      if (modelState.name == '') {
        modelState.nameErr = true
        return
      }
      modelState.nameErr = false
      createLoding.value = true
      let newGroup = await groupApi.create({
        name: modelState.name,
        ...(modelState.parent_id && { parent_id: modelState.parent_id }),
        ...(modelState.variables.length && { variables: modelState.variables }),
      })
      createLoding.value = false
      router.push({ name: 'Group', params: { id: newGroup.id } })
    }

    const refUpdate = (group) => {
      modelState.parent = group.name
      modelState.parent_id = group.id
    }

    const refDelete = () => {
      modelState.parent_id = null
      modelState.parent = null
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
