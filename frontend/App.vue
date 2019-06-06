<template>
    <div id="app">
        <div id="logo-bar">
             <div class="cptac-logo">
                <img src="./assets/cptac-logo.png">
            </div>
            <div class="mssm-logo">
                <img src="./assets/MSSMLogo.png">
            </div>
        </div>
        <div class="cptac-description">
            NCI supported Clinical Proteomic Tumor Analysis Consortium (CPTAC),
                is a comprehensive and coordinated effort to accelerate the understanding of the molecular
                basis of cancer through the application of large-scale proteome (proteins) and genome (DNA and RNA)
                analysis technologies to different cancer types. CPTAC is composed of expertise in proteomics, genomics,
                cancer biology, oncology, and clinical chemistry, while creating open community resources that
                are widely used by the cancer community.
        </div>
        <div id="content">
            <user-input class="user-input-main"/>
            <!--<the-heatmap-container />-->
            <!--<the-legend-container />-->
            <the-heatmap-and-legend-container />
        </div>
    </div>
</template>

<script>
// import TheHeatmapContainer from '././components/TheHeatmapContainer.vue';
import UserInput from '././components/UserInput.vue'
// import TheLegendContainer from './components/TheLegendContainer.vue';
import TheHeatmapAndLegendContainer from './components/TheHeatmapAndLegendContainer.vue';

export default {
    components: {
        // TheLegendContainer,
        UserInput,
        // TheHeatmapContainer,
        TheHeatmapAndLegendContainer,
    },
    name: 'app',
    data () {
        return {
        }
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #content {
        display: flex;
        flex-direction: row;
        overflow: auto;
        margin-top: 10px;
    }

    .user-input-main {
        background: lightgray;
    }

    #logo-bar {
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cptac-logo {
        margin-left: 15px;
    }

    .mssm-logo {
       margin-left: 30px;
    }

    .cptac-description {
        font-size: small;
        text-align: left;
        font-family: "Times New Roman", Times, serif;
        font-weight: bold;
        margin: 15px;
    }

</style>
