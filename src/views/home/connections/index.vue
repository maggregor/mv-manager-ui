<template>
  <div>
    <h3 class="mb-4">Connections</h3>
    <a-row type="flex">
      <ConnectionCard v-for="c in allConnections" :key="c.id" :connection="c" />
      <AddConnectionCard />
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddConnectionCard from '@/components/Connection/AddConnectionCard'
import ConnectionCard from '@/components/Connection/ConnectionCard'

export default {
  name: 'Home',
  components: {
    AddConnectionCard,
    ConnectionCard,
  },
  computed: {
    ...mapGetters(['allConnections']),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
