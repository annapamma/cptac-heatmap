<template>
    <div class="the-heatmap-container">
        <div v-if="loaded">
            <heatmap-ccrcc-3p />
            <heatmap-gene v-for="gene in genes" :key="gene.id" :gene="gene"/>
            <heatmap-chromosome />
            <heatmap-stage-grade-gender />
        </div>
        <div v-if="!loaded && loading">
            <spinner />
        </div>

    </div>
</template>

<script>
    import HeatmapCcrcc3p from './Heatmap_CCRCC_ThreeP.vue';
    import HeatmapGene from './HeatmapGene.vue';
    import HeatmapStageGradeGender from './Heatmap_Stage_Grade_Gender.vue';
    import HeatmapChromosome from './Heatmap_Chromosome.vue';
    import TheLegendContainer from './TheLegendContainer.vue';

    export default {
        components: {
            TheLegendContainer,
            HeatmapChromosome,
            HeatmapStageGradeGender,
            HeatmapGene,
            HeatmapCcrcc3p
        },
        name: 'the-heatmap-container',
        computed: {
            loaded () {
                return this.$store.state.loaded;
            },
            loading () {
                return this.$store.state.loading;
            },
            genes () {
                return this.$store.state.genes;
            }
        }
    }

</script>

<style scoped>
    .the-heatmap-container {
        width: 95%;
        min-height: 100vh;
        overflow: auto;
        /*display: flex;*/
    }
</style>
