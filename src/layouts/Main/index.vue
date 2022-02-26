<template>
  <div
    :class="{
      vb__layout__grayBackground: settings.isGrayBackground,
    }"
  >
    <a-layout
      :class="{
        vb__layout: true,
        vb__layout__contentMaxWidth: settings.isContentMaxWidth,
        vb__layout__appMaxWidth: settings.isAppMaxWidth,
        vb__layout__squaredBorders: settings.isSquaredBorders,
        vb__layout__cardsShadow: settings.isCardShadow,
        vb__layout__borderless: settings.isBorderless,
      }"
    >
      <a-layout>
        <a-layout-header>
          <Topbar />
        </a-layout-header>
        <a-layout-content class="vb__layout__content">
          <router-view v-slot="{ Component }">
            <transition :name="settings.routerAnimation" mode="out-in">
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
import { useStore } from 'vuex'
import { computed } from 'vue'
import { mapState } from 'vuex'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
export default {
  name: 'MainLayout',
  components: { Topbar, Footer },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['user'])
    const authorized = computed(() => store.getters['user'].authorized)
    const logout = () => {
      store.dispatch('LOGOUT')
    }
    return {
      user,
      logout,
      authorized,
    }
  },
  computed: mapState(['settings']),
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
