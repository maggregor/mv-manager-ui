<template>
  <div :class="$style.breadcrumbs">
    <div v-if="crumbs.length > 1" :class="$style.path">
      <template v-for="(item, index) in crumbs" :key="index">
        <span v-if="index == 0">
          <router-link :to="item.to">{{ item.text }}</router-link>
        </span>
        <span v-else>
          <span :class="$style.arrow"></span>
          <router-link :to="item.to">{{ item.text }}</router-link>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    crumbs: function() {
      let pathArray = this.$route.path.split('/')
      pathArray.shift()
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? '/' + breadcrumbArray[idx - 1].path + '/' + path
            : '/' + path,
          text: this.$route.matched[idx].meta.title || path,
        })
        return breadcrumbArray
      }, [])
      return breadcrumbs
    },
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
