<template>
  <div class="box">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>Host</strong> item
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <a class="button is-success">Save</a>
        </p>
        <p class="level-item">
          <router-link :to="{name: 'Host', params: { id: route.params.id }}" class="button is-danger">Cancel</router-link>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <p>
          ẗodo
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Api } from "../../servcies/api";

export default {
  name: "HostItem",
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const hostData = ref([]);
    const api = new Api("host");
    /* const hostId = computed(() => route.params.id)
    watchEffect(() => console.log(hostId)) */
    /* hostData.value = await api.get(route.params.id);
    console.log(hostData.value); */
    return {
      /* hostData */
      route
    }
  }
};
</script>