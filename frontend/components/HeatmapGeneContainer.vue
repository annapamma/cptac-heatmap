<template>
    <div class="heatmap-gene-container">
        <!--<div id="loader-container" v-if="!loaded">-->
            <!--&lt;!&ndash;<spinner></spinner>&ndash;&gt;-->
            <!--<h3> LOADING </h3>-->
        <!--</div>-->
        <p class="heatmap-gene-title rotate">{{ gene }}</p>
        <div class="heatmap-genes">
            <heatmap-gene :gene="gene"/>
        </div>
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
        },
        computed () {
            return this.$store.state.loaded;
        }
    }
</script>

<style scoped>
    .heatmap-gene-container {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*height: 100%;*/
        width: 100%;
        min-height: 100%;
        overflow-y: scroll;
        background: green;
        border: solid 1px black;
    }

    .heatmap-genes {
        width: 100%;
        overflow: auto;
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
