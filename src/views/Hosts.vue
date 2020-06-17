<script>
import { onMounted, ref } from "vue";

export default {
  name: "Hosts",
  async setup() {
    /* const dataa = ref([{ a: "b" }, { a: "c" }]);
    const res = await fetch("http://localhost:8000/api/host/get_multi", {
      method: "GET"
    });
    const a = await res.json()
    console.log(a.data);
    const b = a.data
    return {
      dataa,
      b
    }; */
  }
};
</script>

<template>
  <section>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Hosts</p>
          <!-- <div class="columns">
            <div class="column">
              <table class="table is-hoverable">
                <thead>
                  <th>Name</th>
                  <th>IP</th>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in b">
                    <td>{{ item.hostname }}</td>
                    <td>{{ item._id['$oid'] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
