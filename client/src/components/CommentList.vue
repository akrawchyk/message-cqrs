<template>
  <ul class="CommentList">
    <li v-for="c in comments">
      <comment v-bind:c="c" v-bind:key="c.text"></comment>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import Comment from './Comment'

export default {
  name: 'CommentList',
  methods: {
    getComments: async function (limit) {
      // query for comments wtih axios
      const ajax = axios.create({
        baseURL: process.env.API_URL,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        params: {
          limit
        }
      })

      try {
        const res = await ajax.get('/api/query/')
        this.comments = res.data.comments[0]
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.getComments(5)
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
</style>
