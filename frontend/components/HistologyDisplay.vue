<template>
    <div class="histology-display">
        <h3>{{ sample }}</h3>
        <p>Histologic Images</p>
        <div v-for="(data, slide) in histologyData">
            <p><a :href="data['URL']" target="_blank">
                {{ data['type']}} {{ data['site'].length ? `: ${data['site']}` : ''}}
            </a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "histology-display",
        props: ['sample'],
        computed: {
            histologyData () {
                return this.$store.state.histology[this.sample]
            }
        }
    }
</script>

<style scoped>
    .histology-display {
        width: 50%;
        margin: 5px;
        padding: 10px;
        background: white;
        font-family: "Times New Roman", Times, serif;
        height: 100%;
    }

    .histology-display a {
        color: black;
    }

    .histology-display a:hover {
        color: blue;
    }
</style>
