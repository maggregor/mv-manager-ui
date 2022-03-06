<template>
  <div class="container"><Plan v-if="selectedProject.plans" :plans="selectedProject.plans" /></div>
</template>

<script>
import Plan from '@/components/Plan'
import { mapGetters } from 'vuex'
export default {
  components: { Plan },
  computed: {
    ...mapGetters(['selectedProject']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
