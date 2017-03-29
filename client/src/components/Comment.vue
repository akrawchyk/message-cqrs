<template>
  <div class="Comment">
    <p class="Comment-date">
      {{ c.createdAt }} <span class="Comment-timestamp">(submitted {{ c.timestamp }})</span>
    </p>
    <p class="Comment-text">{{ decodeURIComponent(c.text) }}</p>
</div>
</template>

<script>
  export default {
    name: 'Comment',
    props: ['c']
  }
</script>

<style scoped>
  .Comment {
    border: 1px solid #333;
    margin-bottom: 1em;
    padding: 0.5em;
  }

  .Comment-date {
    color: #902100;
    border-bottom: 1px solid #bbb;
  }

  .Comment-timestamp {
    color: #001209;
  }

  .Comment-text {
    white-space: pre;
  }
</style>
