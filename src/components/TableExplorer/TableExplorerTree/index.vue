<template>
  <div class="control_wrapper">
    <ejs-treeview
      id="treeview"
      :fields="fields"
      :show-check-box="true"
      :checked-nodes="checkedNodes"
      :node-checked="nodeChecked"
      :node-clicked="nodeClicked"
      :node-checking="nodeChecking"
    ></ejs-treeview>
  </div>
</template>
<script>
export default {
  name: 'TableExplorerTree',
  data() {
    var nodeTemplate = require('@/components/TableExplorer/TableExplorerNode')
    var dataSource = [
      // Datasets
      { id: 'nyc-dataset-1', name: 'nyc-dataset-1', hasChild: true },
      { id: 'nyc-dataset-2', name: 'nyc-dataset-2', hasChild: true },
      { id: 'nyc-dataset-3', name: 'nyc-dataset-3', hasChild: true },
      { id: 'nyc-dataset-4', name: 'nyc-dataset-4', hasChild: true },
      // Tables dataset 1
      { id: 'nyc-dataset-1:my_table_1', pid: 'nyc-dataset-1', name: 'my_table_1' },
      { id: 'nyc-dataset-1:my_table_2', pid: 'nyc-dataset-1', name: 'my_table_2' },
      { id: 'nyc-dataset-1:my_table_3', pid: 'nyc-dataset-1', name: 'my_table_3' },
      // Tables dataset 2
      { id: 'nyc-dataset-2:my_table_1', pid: 'nyc-dataset-2', name: 'my_table_1' },
      { id: 'nyc-dataset-2:my_table_1', pid: 'nyc-dataset-2', name: 'my_table_2' },
      { id: 'nyc-dataset-2:my_table_1', pid: 'nyc-dataset-2', name: 'my_table_3' },
      // Tables dataset 3
      { id: 'nyc-dataset-3:my_table_1', pid: 'nyc-dataset-3', name: 'my_table_1' },
      { id: 'nyc-dataset-3:my_table_1', pid: 'nyc-dataset-3', name: 'my_table_2' },
      { id: 'nyc-dataset-3:my_table_1', pid: 'nyc-dataset-3', name: 'my_table_3' },
      // Tables dataset 4
      { id: 'nyc-dataset-4:my_table_1', pid: 'nyc-dataset-4', name: 'my_table_1' },
      { id: 'nyc-dataset-4:my_table_1', pid: 'nyc-dataset-4', name: 'my_table_2' },
      { id: 'nyc-dataset-4:my_table_1', pid: 'nyc-dataset-4', name: 'my_table_3' },
    ]
    return {
      fields: {
        dataSource: dataSource,
        id: 'id',
        parentID: 'pid',
        text: 'name',
        hasChildren: 'hasChild',
      },
      Template: function(e) {
        return {
          template: nodeTemplate,
        }
      },
      checkedNodes: [],
    }
  },
  methods: {
    nodeChecked: function(args) {
      // console.log('ok')
    },
    nodeClicked: function() {
      // Example that disable node 22 (table2 of dataset1)
      // when any node is clicked
      var tree = document.getElementById('treeview').ej2_instances[0]
      console.log(tree)
      console.log(tree.getTreeData())
      tree.disableNodes(['nyc-dataset-1'])
      // tree.checkAll()
    },
    nodeChecking: function(args) {
      setTimeout(() => {
        console.log('World!')
      }, 2000)
      console.log('loading...')
    },
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
