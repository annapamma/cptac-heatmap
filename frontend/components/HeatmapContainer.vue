<template>
  <div class="heatmap-container">
    <div class="heatmap-and-legend">
      <apexchart
        class="apex-container"
        type=heatmap
        :height="height"
        :options="chartOptionsClinical"
        :series="clinicalSeries"
      />
      <the-legend-container />
    </div>
  </div>
</template>

<script>
import TheLegendContainer from './TheLegendContainer.vue';

import chartOptions from '../heatmap_specs/chartOptions.js';
import colorScale from '../heatmap_specs/colorScale.js';

export default {
  name: 'HeatmapContainer',
  components: {
    TheLegendContainer,
  },
  data() {
    return {
      chartOptionsClinical: chartOptions(colorScale, this),
      isLoading: true,
      fullPage: false,
      // clinicalSeries: landingData['series'],
    };
  },
  computed: {
    clinicalSeries() {
      return this.$store.state.series;
    },
    height() {
      return this.clinicalSeries.length * 16;
    }
  },
};
</script>

<style scoped>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 100%;
    margin: 10px auto;
    min-width: 800px;
  }

  .heatmap-container button {
    margin: 2px;
    width: 13.5%;
    border: 1px;
    opacity: .8;
    font-weight: bold;
  }

  .heatmap-container p {
    margin: 2px;
  }

  .heatmap-and-legend {
    display: flex;
  }

  .apex-container {
    width: 1200px;
  }

  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

  .disease-all {
    background-color: white;
    width: 85%;
    height: 100vh;
  }

  .apexcharts-heatmap-rect {
    stroke-width: 0 !important;
  }

  .apexcharts-heatmap-rect:hover {
      outline: black 1px solid !important;
      cursor: pointer;
      z-index: 100;
  }

  .apexcharts-yaxis {
    border: solid 1px black;
  }

</style>
