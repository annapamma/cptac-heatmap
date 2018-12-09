<template>
    <div class="the-heatmap-container" id="html-2-pdfwrapper">
        <div v-if="loaded">
            <heatmap-ccrcc-3p />
            <heatmap-gene v-for="gene in genes" :key="gene.id" :gene="gene"/>
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
            loaded () {
                return this.$store.state.loaded;
            },
            genes () {
                return this.$store.state.genes;
            }
        },
        beforeMount () {
            // removeElementsByTagName('svg')
            // removeElementsByClassName('.apexcharts-svg');
            // removeElementsByClassName('.apexcharts-legend-series');
            // removeElementsByClassName('.apexcharts-legend-point');
            // removeElementsByClassName('.apexcharts-legend-text');
        },
    }

    function removeElementsByClassName (className) {
        document.querySelectorAll(className).forEach((a) => {
            a.remove()
        })
    }

    // function removeElementsByTagName (tag) {
    //     document.getElementsByTagName(tag).forEach((a) => {
    //         a.parentNode.removeChild(a);
    //     })
    // }
</script>

<style scoped>
    .the-heatmap-container {
        width: 75%;
    }
</style>
