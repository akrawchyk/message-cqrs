<template>
  <div class="Index">
    <h1>Index.vue</h1>
    <p>{{ msg }}</p>
    <comment-form></comment-form>
    <comment-list></comment-list>
  </div>
</template>

<script>
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Index.vue'
    }
  },
  components: {
    CommentForm,
    CommentList
  }
}
</script>

<style scoped>
  h1 {
    font-size: 32px;
  }

  textarea {
    width: 400px;
  }
</style>
