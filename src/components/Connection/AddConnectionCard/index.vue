<template>
  <a-row
    v-if="!isCreating"
    @click="setEditing(true)"
    class="container"
    type="flex"
    justify="space-around"
    align="middle"
  >
    <div>
      <a>Create a connection to BigQuery </a>
    </div>
  </a-row>
  <CreateConnectionCard v-else />
</template>
<script>
import CreateConnectionCard from '@/components/Connection/CreateConnectionCard'
import { ref } from '@vue/reactivity'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CreateConnectionCard,
  },
  setup() {
    const creating = ref(false)
    return { creating, ...mapActions({ setEditing: 'SET_CREATING' }) }
  },
  computed: {
    ...mapGetters(['isCreating']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
