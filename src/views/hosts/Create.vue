<template>
  <h2 class="subtitle"><strong>Host</strong> item</h2>
  <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/inventory/hosts">Hosts inventory</router-link>
      </li>
      <li class="is-active">
        <router-link :to="{ name: 'HostCreate' }">New item</router-link>
      </li>
    </ul>
  </nav>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5"><strong>Host</strong> create</p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <router-link :to="{ name: 'Hosts' }" class="button"
            >Cancel</router-link
          >
        </p>
        <p class="level-item">
          <a class="button is-success">Save</a>
        </p>
      </div>
    </nav>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Hostname</label>
          <div class="control">
            <input class="input" type="text" placeholder="Hostname" />
          </div>
        </div>
      </div>
      <div class="column">
      
      </div>
      <div class="column">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HostCreate',
}
</script>
