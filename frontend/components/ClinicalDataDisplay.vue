<template>
    <div class="clinical-data-display">
        <h3>{{ sample }}</h3>
        <i>Clinical Data</i>
        <!--<div v-for="(data, slide) in histologyData">-->
            <!--<p><a :href="data['URL']" target="_blank" :title="slide">-->
                <!--{{ data['type']}} {{ data['site'].length ? `: ${data['site']}` : ''}}-->
            <!--</a></p>-->
        <!--</div>-->
        <!--<div id="all-cptac-images-link">-->
            <!--<a href="https://www.cancerimagingarchive.net/datascope/cptac/home/" target="_blank">All CPTAC Cancer Images</a>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "clinical-data-display",
        props: ['sample'],
        computed: {
            // histologyData () {
            //     return this.$store.state.histology[this.sample]
            // }
        }
    }
</script>

<style scoped>
    .clinical-data-display{
        width: 90%;
        margin: 5px;
        padding: 10px;
        background: white;
        font-family: "Times New Roman", Times, serif;
        height: 100%;
    }

    .clinical-data-display a {
        color: black;
    }

    .clinical-data-display a:hover {
        color: blue;
    }
</style>
