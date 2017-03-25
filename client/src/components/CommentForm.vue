<template>
  <div class="CommentForm">
    <form v-bind:action="API_URL + '/api/command'" v-on:submit="submitText" method="post" rows="4">
      <textarea v-model.trim="text" v-on:submitSuccess="clearText" name="text" placeholder="add multiple lines"></textarea>
      <div>
        <button v-on:click="isSubmitting = true" v-bind:disabled="isSubmitting" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'comment-form',
  methods: {
    submitText: async function (e) {
      e.preventDefault()
      const data = new FormData(e.target)
      const ajax = axios.create({
        baseURL: process.env.API_URL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        },
        data
      })

      try {
        const res = await ajax.post('/api/command/')
        this.$emit('submitSuccess')
        console.log(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        this.isSubmitting = false
      }
    },

    clearText: function () {
      this.text = ''
    }
  },
  data () {
    return {
      API_URL: process.env.API_URL,
      text: '',
      isSubmitting: false
    }
  }
}
</script>

<style scoped>
</style>
