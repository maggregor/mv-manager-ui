<template>
  <a-row
    v-if="!isConnectionCreating"
    @click="setCreating(true)"
    class="container"
    type="flex"
    justify="space-around"
    align="middle"
  >
    <div>
      <a v-if="allConnections.length">Create a new connection to BigQuery</a>
      <a v-else>Create your first connection to BigQuery</a>
    </div>
  </a-row>
  <CreateEditConnectionCard v-else />
</template>
<script>
import CreateEditConnectionCard from '@/components/Connection/CreateEditConnectionCard'
import { ref } from '@vue/reactivity'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CreateEditConnectionCard,
  },
  setup() {
    const creating = ref(false)
    return { creating, ...mapActions({ setCreating: 'SET_CONNECTION_CREATING' }) }
  },
  computed: {
    ...mapGetters(['isConnectionCreating', 'allConnections']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
