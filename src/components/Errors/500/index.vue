<template>
  <div class="p-5 font-size-30">
    <div class="font-weight-bold mb-3">
      Server Error
    </div>
    <div>This page is deprecated, deleted, or does not exist at all</div>
    <div class="font-weight-bold font-size-38 mb-1">
      500 —
    </div>
    <router-link to="/" class="btn btn-outline-primary width-100">
      Go Back
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Error500',
}
</script>
