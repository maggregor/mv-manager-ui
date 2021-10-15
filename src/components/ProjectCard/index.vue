<template>
    <div :class="$style.projectContainer">
      <div/>
          <div class="pl-4 d-flex flex-wrap align-items-center ">
          <div class="mr-auto">
            <div class="font-weight-bold font-size-18  text-dark">
              {{projectName}}
            </div>
            <div class="font-size-14">
              {{ projectId }}
            </div>
            <div class="font-size-14">
              <p v-html="datasetField"></p>
            </div>
          </div>
          <div class="mr-auto">
            
          </div>
          <div class="pr-3">
            <router-link :to="`/${projectId}/settings`" class="m-1 btn btn-outline-primary text-weight-600 width-150">
              Settings
            </router-link>
            <router-link :to="`/${projectId}/overview`" class="m-1 btn btn-primary text-weight-600 width-150">
              Open
            </router-link>
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
      default: -1,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    datasetField() {
      switch (this.datasetCount) {
        case -1:
          return "Loading...";
        case 0:
          return "No datasets";
        default:
          return `${this.datasetCount} dataset(s)`;
      }
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
