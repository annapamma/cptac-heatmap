<template>
    <div class="the-heatmap-container">
        <heatmap/>
        <heatmap/>
        <heatmap/>
    </div>
</template>

<script>
    import Heatmap from './Heatmap.vue';

    export default {
        components: {
            Heatmap
        },
        name: 'the-heatmap-container'
    }
</script>

<style scoped>

</style>
