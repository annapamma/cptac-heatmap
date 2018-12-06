<template>
    <div class="the-heatmap-container">
        <heatmap-nominal />
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
