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

  const ajax = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  export default {
    name: 'CommentList',
    methods: {
      getComments: async function (limit) {
        try {
          const res = await ajax.get('/api/query/', {
            params: {
              limit
            }
          })
          this.comments = res.data.data.map((c) => {
            console.log(c)
            return c.default  // unwrap
          })
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
  .CommentList {
    list-style: none;
    padding: 0;
  }
</style>
