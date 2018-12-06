<template>
    <div class="user-input">
        <input />
        <button @click="submitGenes">Visualize</button>
    </div>
</template>

<script>
    export default {
        name: 'user-input',
        methods: {
            submitGenes () {
                this.$store.dispatch('submitGenes')
            }
        }
    }
</script>

<style scoped>

</style>
