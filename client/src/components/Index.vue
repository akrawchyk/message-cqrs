<template>
  <div id="index">
    <h1>Index.vue</h1>
    <p>{{ msg }}</p>
    <form v-bind:action="API_URL + '/api/command'" v-on:submit="submitText" method="post">
      <textarea v-model.trim="text" name="text" placeholder="add multiple lines"></textarea>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'index',
  methods: {
    submitText: function (e) {
      e.preventDefault()
      console.log(e)
      const data = new FormData(e.target)

      axios.post(`${process.env.API_URL}/api/command/`, data)
        .then(res => {
          res.text()
        })
        .then(text => {
          console.log(text)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data () {
    return {
      API_URL: process.env.API_URL,
      msg: 'Welcome to Index.vue',
      text: ''
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 32px;
  }
</style>
