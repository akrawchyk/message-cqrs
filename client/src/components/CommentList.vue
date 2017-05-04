<template>
  <div>
    <label>
      <input type="checkbox" v-model="polling" v-on:change="startStopPolling"> <span> Poll for updates?</span>
    </label>
    <ul class="CommentList">
      <li v-for="c in comments">
        <comment v-bind:c="c" v-bind:key="c.text"></comment>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import Comment from './Comment'

  const COMMENT_LIST_POLL_INTERVAL_MS = 5000

  const ajax = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  export default {
    name: 'CommentList',
    methods: {
      startStopPolling: function () {
        if (this.polling && !this.pollingInterval) {
          this.getComments(5)
          this.pollingInterval = setInterval(() => {
            this.getComments(5)
          }, COMMENT_LIST_POLL_INTERVAL_MS)
        } else if (this.pollingInterval) {
          clearInterval(this.pollingInterval)
          this.pollingInterval = null
        }
      },
      getComments: async function (limit) {
        try {
          const res = await ajax.get('/api/query/', {
            params: {
              limit
            }
          })
          this.comments = res.data.comments
        } catch (err) {
          console.log(err)
        }
      }
    },
    data () {
      return {
        comments: [],
        polling: false
      }
    },
    created () {
      this.getComments(5)
      this.startStopPolling()
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>
  .CommentList {
    list-style: none;
    padding: 0;
  }
</style>
