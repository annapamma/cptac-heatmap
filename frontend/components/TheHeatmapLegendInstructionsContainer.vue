<template>
    <div class="the-heatmap-legend-instructions-container">
        <div class="instructions">Click gene symbol for description and sample ID for links to histology images. Click data point to display and enable sorting.</div>
        <the-heatmap-and-legend-container />
    </div>
</template>

<script>
    import TheHeatmapAndLegendContainer from "./TheHeatmapAndLegendContainer.vue";

    export default {
        components: {TheHeatmapAndLegendContainer},
        name: "the-heatmap-legend-instructions-container"
    }
</script>

<style scoped>
    .the-heatmap-legend-instructions-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .instructions {
        font-size: small;
        text-align: left;
        font-weight: bold;
        margin: 2px 10px;
    }
</style>
