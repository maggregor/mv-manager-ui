<template>
  <div class="container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="details_container" :span="10">
        <h2>Automatically improve your performance</h2>
        <h1>With Achilio</h1>
      </a-col>
      <a-col class="details_container" :span="2">
        <a-divider style="height: 30vh" type="vertical" />
      </a-col>
      <a-col class="login_container" :span="10">
        <google-button class="mb-4" @click="handleFinish" />
        <p>
          By signing up, you agree to Achilio’s
          <a href="https://www.achilio.com/privacy-terms"><b>Privacy Terms.</b></a
          >.
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { useStore } from 'vuex'

import GoogleButton from '@/components/Login/GoogleButton'

export default {
  name: 'VbLogin',
  components: { 'google-button': GoogleButton },
  setup() {
    const store = useStore()

    const handleFinish = values => {
      store.dispatch('LOGIN', { payload: values })
    }
    const handleFinishFailed = errors => {
      console.errors(errors)
    }

    return {
      handleFinish,
      handleFinishFailed,
    }
  },
}
</script>
<style lang="scss" scoped>
@import './style.module.scss';
</style>
