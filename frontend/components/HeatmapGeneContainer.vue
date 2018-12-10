<template>
    <div class="heatmap-gene-container">
        <p class="heatmap-gene-title rotate">{{ gene }}</p>
        <heatmap-gene :gene="gene"/>
    </div>
</template>

<script>
    import HeatmapGene from "./HeatmapGene.vue";

    export default {
        name: "HeatmapGeneContainer",
        components: {HeatmapGene},
        data () {
            return {
                gene: 'KDM5C'
            }
        }
    }
</script>

<style scoped>
    .heatmap-gene-container {
        display: flex;
        flex-direction: row;
    }
.rotate {
  /* FF3.5+ */
  -moz-transform: rotate(-90.0deg);
  /* Opera 10.5 */
  -o-transform: rotate(-90.0deg);
  /* Saf3.1+, Chrome */
  -webkit-transform: rotate(-90.0deg);
  /* IE6,IE7 */
  filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=0.083);
  /* IE8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083)";
  /* Standard */
  transform: rotate(-90.0deg);
}

</style>
