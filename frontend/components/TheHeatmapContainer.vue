<template>
    <div class="the-heatmap-container">
        <div v-if="grade.length">
            <heatmap-ccrcc-3p />
            <heatmap-gene :gene="'KDM5C'"/>
        </div>
    </div>
</template>

<script>
    import HeatmapCcrcc3p from './Heatmap_CCRCC_ThreeP.vue';
    import HeatmapGene from './HeatmapGene.vue';

    export default {
        components: {
            // HeatmapGeneCnvLr,
            HeatmapGene,
            HeatmapCcrcc3p
        },
        name: 'the-heatmap-container',
        computed: {
            grade () {
                return this.$store.state.grade;
            }
        },
        updated () {
            removeElementsByClassName('.apexcharts-toolbar');
            removeElementsByClassName('.apexcharts-legend-series');
            removeElementsByClassName('.apexcharts-legend-point');
            removeElementsByClassName('.apexcharts-legend-text');
        },
    }

    function removeElementsByClassName (className) {
        document.querySelectorAll(className).forEach((a) => {
            a.remove()
        })
    }

</script>

<style scoped>

</style>
