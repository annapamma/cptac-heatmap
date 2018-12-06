<template>
    <div class="heatmap">
        <h3>hi this is where it goes: {{ geneList }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'heatmap',
        computed: {
            geneList () {
                return this.$store.state.geneList;
            }
        }
    }
</script>

<style scoped>

</style>
