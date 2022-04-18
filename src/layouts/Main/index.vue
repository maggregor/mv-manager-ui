<template>
  <div>
    <a-layout
      :class="{
        vb__layout: true,
        vb__layout__contentMaxWidth: true,
        vb__layout__appMaxWidth: true,
        vb__layout__squaredBorders: false,
        vb__layout__cardsShadow: true,
        vb__layout__borderless: true,
      }"
    >
      <a-layout>
        <a-layout-header>
          <Topbar />
        </a-layout-header>
        <a-layout-content>
          <router-view v-slot="{ Component }">
            <transition name="zoom-fadein" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </a-layout-content>
        <a-layout-footer>
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
export default {
  name: 'MainLayout',
  components: { Topbar, Footer },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
