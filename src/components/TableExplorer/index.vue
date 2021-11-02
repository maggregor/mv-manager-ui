<template>
  <div id="app">
    <div class="control_wrapper">
      <ejs-treeview
        id="treeview"
        :fields="fields"
        :show-check-box="true"
        :checked-nodes="checkedNodes"
        :node-checked="nodeChecked"
      ></ejs-treeview>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var dataSource = [
      { id: 1, name: 'Achilio Dev', hasChild: true, expanded: true },
      // Datasets
      { id: 2, pid: 1, name: 'nyc-dataset-1', hasChild: true, expanded: true },
      { id: 3, pid: 1, name: 'nyc-dataset-2', hasChild: true },
      { id: 4, pid: 1, name: 'nyc-dataset-3', hasChild: true },
      // Tables dataset 1
      { id: 21, pid: 2, name: 'my_table_1' },
      { id: 22, pid: 2, name: 'my_table_2' },
      { id: 23, pid: 2, name: 'my_table_3' },
      // Tables dataset 2
      { id: 31, pid: 3, name: 'my_table_1' },
      { id: 32, pid: 3, name: 'my_table_2' },
      { id: 33, pid: 3, name: 'my_table_3' },
      // Tables dataset 3
      { id: 41, pid: 4, name: 'my_table_1' },
      { id: 42, pid: 4, name: 'my_table_2' },
      { id: 43, pid: 4, name: 'my_table_3' },
    ]
    return {
      fields: {
        dataSource: dataSource,
        id: 'id',
        parentID: 'pid',
        text: 'name',
        hasChildren: 'hasChild',
      },
      checkedNodes: [],
    }
  },
  methods: {
    nodeChecked: function(args) {},
  },
}
</script>
<style>
@import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css';
@import '../../../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css';
.control_wrapper {
  display: block;
  margin: auto;
  overflow: auto;
  border-radius: 3px;
}
</style>
