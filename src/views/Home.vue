<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-6-tablet is-3-desktop">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title is-inline">
                <span>Income</span>
                <span class="tag is-success is-pulled-right">Monthly</span>
              </h3>
            </div>
            <div class="card-content">
              <h3 class="title">108,200</h3>
              <p>Total income</p>
            </div>
          </div>
        </div>
        <div class="column is-6-tablet is-3-desktop">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title is-inline">
                <span>Orders</span>
                <span class="tag is-success is-pulled-right">Monthly</span>
              </h3>
            </div>
            <div class="card-content">
              <h3 class="title">128,430</h3>
              <p>New orders</p>
            </div>
          </div>
        </div>
        <div class="column is-6-tablet is-3-desktop">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title is-inline">
                <span>Visits</span>
                <span class="tag is-success is-pulled-right">Today</span>
              </h3>
            </div>
            <div class="card-content">
              <h3 class="title">81,248</h3>
              <p>New visits</p>
            </div>
          </div>
        </div>
        <div class="column is-6-tablet is-3-desktop">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title is-inline">
                <span>User activity</span>
                <span class="tag is-danger is-pulled-right">Today</span>
              </h3>
            </div>
            <div class="card-content">
              <h3 class="title">2,341</h3>
              <p>Used app more than once</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About"
};
</script>