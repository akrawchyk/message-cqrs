<template>
  <div class="CommentForm">
    <form v-bind:action="API_URL + '/api/command'" v-on:submit="submitText" method="post">
      <textarea class="CommentForm-text" v-model.trim="text" name="text" placeholder="add multiple lines"></textarea>
      <div>
        <button v-on:click="isSubmitting = true" v-bind:disabled="isSubmitting" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Fingerprint2 from 'fingerprintjs2'

  function getFingerprint2 () {
    return new Promise((resolve, reject) => {
      const fingerprint = new Fingerprint2()
      try {
        fingerprint.get((result, components) => {
          // beware of updated components on version change
          resolve(result)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  const ajax = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  export default {
    name: 'comment-form',
    methods: {
      submitText: async function (e) {
        e.preventDefault()

        try {
          const fingerprint = await getFingerprint2()
          const data = {
            fingerprint,
            text: this.text
          }
          await ajax.post('/api/command/', qs.stringify(data))
          this.clearText()
        } catch (err) {
          console.log(err)
          throw new Error(`Unhandled: ${err.message}`)
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
  .CommentForm {
  }

  .CommentForm-text {
    width: 100%;
  }
</style>
