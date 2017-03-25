<template>
  <div class="Comment">
    <p>{{ c.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['c']
}
</script>

<style scoped>
</style>
