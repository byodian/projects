<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <router-link to="/">Home</router-link> | 
      <router-link to="/about">About</router-link> | 
      <router-link to="/user/foo">foo</router-link> | 
      <router-link to="/user/bar">bar</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      name: 'Hello world'
    }
  }
}
</script>

<style>
</style>
