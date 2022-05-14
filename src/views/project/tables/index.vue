<template>
  <a-row class="container">
    <a-col>
      <h3 class="mt-2">Tables</h3>
    </a-col>
    <a-col :span="24"> <TableList /></a-col>
  </a-row>
</template>

<script>
import TableList from '@/components/TableList'
export default {
  name: 'Tables',
  components: {
    TableList,
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
