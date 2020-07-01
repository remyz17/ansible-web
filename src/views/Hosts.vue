<script>
import { onMounted, ref } from "vue"
import { Api } from '../servcies/api'

export default {
  name: "Hosts",
  async setup() {
    const api = new Api('host')
    let res = false

    onMounted(async () => {
      console.log('ahaha')
      res = await api.get_multi()
      console.log(res)
    })
    return {
      res
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Hosts list</p>
        </header>
        <div class="card-content">
          <div class="content">
            <table class="table is-hoverable">
              <thead>
                <tr>
                  <th>Hostname</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>shshs</td>
                  <td>shshs</td>
                </tr>
                <tr>
                  <td>shshs</td>
                  <td>shshs</td>
                </tr>
                <tr>
                  <td>shshs</td>
                  <td>shshs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
