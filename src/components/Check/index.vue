<template>
  <div class="container">
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17.5" cy="17.5" r="17.5" :fill="color" />
      <circle cx="17.5" cy="17.5" r="17.5" :fill="color" />
      <line x1="10.3536" y1="17.6464" x2="15.3536" y2="22.6464" stroke="white" />
      <line x1="27.3536" y1="11.3536" x2="15.3536" y2="23.3536" stroke="white" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'Check',
  props: {
    color: {
      type: String,
      default: '#62D493',
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  bottom: 0px;
}
</style>
