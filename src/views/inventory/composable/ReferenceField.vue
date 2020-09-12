<template>
  <div class="control">
    <div class="dropdown w100" :class="{ 'is-active': searchActive }">
      <div class="dropdown-trigger w100">
        <input
          class="input is-small"
          type="text"
          placeholder="Group"
          v-model="modelState.value"
          :readonly="modelState.readonly"
          @input="doSearch($event.target.value)"
          @dblclick="unsetActive"
        />
        <!-- @blur="onBlurGroup" this make the @click="setGroup(group)" uncallable -->
      </div>
      <div class="dropdown-menu w100" id="dropdown-menu3" role="menu">
        <div class="dropdown-content">
          <a
            v-for="item in searchResults"
            :key="item.id"
            class="dropdown-item"
            @click="setActive(item)"
          >
            {{ item.name }}
          </a>
          <hr class="dropdown-divider" />
          <router-link to="/inventory/group/create" class="dropdown-item">
            Create
          </router-link>
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
import { computed, reactive, ref } from 'vue'
import Api from '/@/servcies/api.js'

export default {
  name: 'ReferenceField',
  props: {
    label: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const api = new Api(props.model)
    let labelProp = ref(props.label)
    let modelProp = ref(props.model)
    let fetchedData = ref([])
    let searchActive = ref(false)
    let modelState = reactive({
      value: props.data.group ? props.data.group.name : '',
      readonly: true,
    })
    let timeoutRef = null

    const searchResults = computed(() => fetchedData.value)

    const doSearch = (query) => {
      if (query == '') {
        searchActive.value = false
        return
      }
      if (timeoutRef !== null) clearTimeout(timeoutRef)
      timeoutRef = setTimeout(async () => {
        fetchedData.value = await api.search(query)
        searchActive.value = true
      }, 200)
    }

    const setActive = (item) => {
      modelState.value = item.name
      modelState.readonly = true
      searchActive.value = false
      emit('update-item', item)
    }

    const unsetActive = () => {
      modelState.readonly = false
      emit('delete-item')
    }

    return {
      modelState,
      labelProp,
      modelProp,
      searchActive,
      searchResults,
      doSearch,
      setActive,
      unsetActive,
    }
  },
}
</script>
