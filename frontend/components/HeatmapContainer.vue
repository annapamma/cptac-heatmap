<template>
  <div class="heatmap-container">
    <div class="heatmap-and-legend">
        <div>
            <heatmap-clinical
                :series="topSeries"
                :options="options"
            />
            <heatmap
                v-for="(val, gene) in series"
                :options="options"
                :series="val"
                :gene="gene"
                :key="gene"
            />
            <heatmap-clinical
                :series="chromosomeSeries"
                :options="options"
            />
            <heatmap-clinical
                :series="bottomSeries"
                :options="options"
            />
        </div>
      <the-legend-container />
    </div>
  </div>
</template>

<script>
import TheLegendContainer from './TheLegendContainer.vue';
import Heatmap from './Heatmap.vue';
import HeatmapClinical from "./HeatmapClinical.vue";

import chartOptions from '../heatmap_specs/chartOptions.js';
import colorScale from '../heatmap_specs/colorScale.js';

export default {
    name: 'HeatmapContainer',
    components: {
        HeatmapClinical,
        Heatmap,
        TheLegendContainer,
    },
    data() {
        return {
            options: chartOptions(colorScale, this),
            isLoading: true,
            fullPage: false,
            // clinicalSeries: landingData['series'],
        };
    },
    computed: {
        series() {
            return this.$store.state.series;
        },
        topSeries() {
            return this.$store.state.topSeries;
        },
        chromosomeSeries() {
            return this.$store.state.chromosomeSeries;
        },
        bottomSeries() {
            return this.$store.state.bottomSeries;
        },
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


</style>
