<template>
  <div class="p-3" :class="$style.container">
    <div :class="[ $style.status, activatedClass ]" />
    <div class="d-flex flex-nowrap align-items-center pb-3 pl-4 pr-4">
      <div class="mr-auto">
        <div class="font-weight-bold font-size-24 text-dark">
          {{projectId}}
        </div>
        <div class="font-size-18">
          {{ datasetCount }} dataset(s)
        </div>
      </div>
      <div class="ml-1 text-success">
        <i class="fe fe-arrow-right-circle font-size-40" />
      </div>
    </div>
    <div class="py-3 pl-4" :class="$style.footer">
      Let's manage this project.
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectCard',
  props: { 
    projectId:{
      type: String,
      default: '',
    },
    datasetCount: {
      type: Number,
      default: 0,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activatedClass: function () {
      return { 'bg-success': this.activated, 'bg-danger': !this.activated }
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
