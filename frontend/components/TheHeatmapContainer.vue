<template>
    <div class="the-heatmap-container">
        <heatmap-nominal :name="1"/>
        <heatmap-nominal :name="2"/>
        <heatmap-nominal :name="3"/>
    </div>
</template>

<script>
    import HeatmapOrdinal from './HeatmapOrdinal.vue';
    import HeatmapNominal from './HeatmapNominal.vue';

    export default {
        components: {
            HeatmapNominal,
            HeatmapOrdinal
        },
        name: 'the-heatmap-container'
    }
</script>

<style scoped>

</style>
