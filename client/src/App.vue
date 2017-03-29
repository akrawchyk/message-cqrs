<template>
  <div id="App">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  /*
  FIXME
  @import('normalize')
  @import('suitcss')
  */
  button {
    padding: 0.25em 0.5em;
  }

  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
