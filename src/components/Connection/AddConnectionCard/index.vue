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
