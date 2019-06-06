<template>
    <div id="the-heatmap-and-legend-container">
        <the-heatmap-container />
        <the-legend-container />
    </div>
</template>

<script>
    import TheHeatmapContainer from './TheHeatmapContainer.vue';
    import TheLegendContainer from './TheLegendContainer.vue';

    export default {
        name: "the-heatmap-and-legend-container",
        components: {
            TheLegendContainer,
            TheHeatmapContainer
        },
    }
</script>

<style>
    #the-heatmap-and-legend-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: auto;
        margin-top: 0px;
        margin-left: -30px;
    }
</style>
