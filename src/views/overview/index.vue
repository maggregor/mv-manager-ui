<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-header"><vb-headers-heading :data="{ title: 'Payez svp' }" /></div>
          <div class="card-body text-white bg-success rounded"><vb-widgets-general-2v3 /></div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body"><vb-charts-chartistjs-1 /></div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body text-white bg-primary rounded"><vb-widgets-general-3v1 /></div>
          <div class="card-body"><vb-widgets-general-1 /></div>
        </div>
      </div>
    </div>
    <div class="row"><div class="col-lg-12"></div></div>
  </div>
</template>

<script>
import VbHeadersHeading from '@/@vb/widgets/Headers/Heading'
import VbWidgetsGeneral2v3 from '@/@vb/widgets/WidgetsGeneral/2v3'
import VbChartsChartistjs1 from '@/@vb/widgets/ChartsChartistjs/1'
import VbWidgetsGeneral3v1 from '@/@vb/widgets/WidgetsGeneral/3v1'
import VbWidgetsGeneral1 from '@/@vb/widgets/WidgetsGeneral/1'

export default {
  name: 'VbOverview',
  components: {
    VbHeadersHeading,
    VbWidgetsGeneral2v3,
    VbChartsChartistjs1,
    VbWidgetsGeneral3v1,
    VbWidgetsGeneral1,
  },
}
</script>
