<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header"><vb-headers-heading :data="{ title: 'Datasets' }" /></div>
        </div>
        <div class="card">
          <div class="card-header"><vb-headers-card-header :data="{ title: 'mydataset' }" /></div>
          <div class="card-body">
            <vb-controls-button :data="{ title: 'Activate', type: 'primary' }" />
          </div>
        </div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-12"></div>
      <div class="col-lg-4 col-md-12"></div>
    </div>
  </div>
</template>

<script>
import VbHeadersHeading from '@/@vb/widgets/Headers/Heading'
import VbHeadersCardHeader from '@/@vb/widgets/Headers/CardHeader'
import VbControlsButton from '@/@vb/widgets/Controls/Button'

export default {
  name: 'VbManage',
  components: {
    VbHeadersHeading,
    VbHeadersCardHeader,
    VbControlsButton,
  },
}
</script>
