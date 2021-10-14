<template>
  <div :class="$style.container">
    <div :class="[ $style.status, activatedClass ]" />
    <div class="d-flex flex-nowrap align-items-center pb-3 pl-4 pr-4">
      <div class="mr-auto">
        <div class="font-weight-bold font-size-24 text-dark">
          {{projectName}}
        </div>
        <div class="font-size-18">
          {{ projectId }}
        </div>
        <div class="font-size-18">
          {{ datasetCount ? `${datasetCount} dataset(s)` : 'No datasets available' }}
        </div>
      </div>
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
    projectName:{
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
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
