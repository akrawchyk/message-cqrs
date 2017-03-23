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
import qs from 'qs'

export default {
  name: 'index',
  methods: {
    submitText: function (e) {
      e.preventDefault()
      const data = new FormData(e.target)

      const ajax = axios.create({
        baseURL: `${process.env.API_URL}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })

      ajax.post('/api/command/', qs.stringify({
        text: data.get('text')
      }))
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
