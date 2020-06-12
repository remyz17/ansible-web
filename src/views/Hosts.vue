<script>
import { onMounted } from 'vue'

export default {
  name: "Hosts",
  setup() {
    onMounted(() => {
      console.log('on mounted')
      fetch('/api/host/create',
        {
          method: 'POST',
          body: JSON.stringify({
            name: 'shshshshshsh'
          })
        }
      ).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    })

    return {}
  }
}
</script>

<template>
  <section>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Hosts</p>
          <div class="columns">
            <div class="column">
              <table class="table is-hoverable">
                <thead>
                  <th>Name</th>
                  <th>IP</th>
                </thead>
                <tbody>
                  <tr>
                    <td>ahahaha</td>
                    <td>192.168.127.10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
