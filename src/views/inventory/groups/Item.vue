<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link to="/inventory/groups">Groups inventory</router-link>
          </li>
          <li class="is-active">
            <router-link
              :to="{ name: 'Group', params: { id: groupData.id } }"
              >{{ groupData.name }}</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="box">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>Group</strong> {{ groupData.id }}
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
              <label class="label">Name</label>
              <div class="control" v-if="isEditing">
                <input
                  class="input is-small"
                  type="text"
                  v-model="groupData.name"
                />
              </div>
              <div class="control" v-else="">
                <p>{{ groupData.name }}</p>
              </div>
            </div>
            <div v-if="isEditing || groupData.group" class="field">
              <label class="label">Parent group</label>
              <div class="control" v-if="isEditing">
                <ReferenceField
                  label="Parent"
                  model="group"
                  :data="groupData"
                  @update-item="refUpdate"
                  @delete-item="refDelete"
                />
              </div>
              <div class="control" v-else="">
                <router-link
                  :to="{ name: 'Group', params: { id: groupData.group_id } }"
                  >{{ groupData.group.name }}</router-link
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
            <VarsField :data="groupData" :isEditing="isEditing" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import groupApi from '/@/servcies/inventory/group.js'
import ReferenceField from '../composable/ReferenceField.vue'
import VarsField from '../composable/VarsField.vue'

export default {
  name: 'Group',
  components: {
    ReferenceField,
    VarsField,
  },
  setup() {
    let router = useRouter()
    let route = useRoute()
    let groupData = ref([])
    let deletePending = ref(false)
    let isEditing = ref(false)

    const fetchGroup = async (id) => (groupData.value = await groupApi.get(id))

    watchEffect(async () => await fetchGroup(route.params.id))

    const handleDelete = async () => {
      deletePending.value = true
      await groupApi.delete(groupData.value.id)
      deletePending.value = false
      router.push('/inventory/groups')
    }

    const handleEdit = () => (isEditing.value = !isEditing.value)

    const refUpdate = (data) => {
      groupData.value.group_id = data.id
      groupData.value.group = data
    }

    const refDelete = () => {
      groupData.value.group_id = null
      groupData.value.group = null
    }

    const saveEdit = async () => {
      let res = await groupApi.update(groupData.value.id, {
        name: groupData.value.name,
        ...(groupData.value.group_id && {
          group_id: groupData.value.group_id,
        }),
        ...(groupData.value.variables && {
          variables: groupData.value.variables,
        }),
      })
      isEditing.value = false
    }

    return {
      groupData,
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
