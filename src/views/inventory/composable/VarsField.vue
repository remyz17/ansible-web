<template>
  <div
    v-if="props.data.variables && props.data.variables.length > 0"
    v-for="(_var, index) in props.data.variables"
    :key="index"
    class="field is-horizontal"
  >
    <div class="field-body">
      <div class="field" :class="{ ' has-addons': props.isEditing }">
        <p class="control">
          <input
            class="input is-small"
            :class="{ 'is-static': !props.isEditing }"
            type="text"
            v-model="_var.key"
            :readonly="!props.isEditing"
          />
        </p>
      </div>

      <div class="field" :class="{ ' has-addons': props.isEditing }">
        <p class="control">
          <input
            class="input is-small"
            :class="{ 'is-static': !props.isEditing }"
            type="text"
            v-model="_var.value"
            :readonly="!props.isEditing"
          />
        </p>
        <p class="control" v-if="props.isEditing">
          <a class="button is-small is-danger" @click="delVar(index)">Del</a>
        </p>
      </div>
    </div>
  </div>
  <div v-if="props.isEditing" class="field is-horizontal">
    <div class="field-body">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input is-small"
            type="text"
            placeholder="Key"
            v-model="varsState.key"
          />
        </div>
      </div>
      <div class="field has-addons">
        <p class="control">
          <input
            class="input is-small"
            type="text"
            placeholder="Value"
            v-model="varsState.value"
          />
        </p>
        <p class="control">
          <a class="button is-small" @click="addVar">Add</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'VarsField',
  props: {
    data: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    let varsState = reactive({
      key: '',
      value: '',
    })

    const addVar = () =>
      props.data.variables
        ? props.data.variables.push({ ...varsState })
        : (props.data.variables = [{ ...varsState }])

    const delVar = (index) => props.data.variables.splice(index, 1)

    return {
      props,
      varsState,
      addVar,
      delVar,
    }
  },
}
</script>
