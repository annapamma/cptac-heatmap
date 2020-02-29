<template>
    <div id="app">
        <div id="logo-bar">
            <div class="protrack" style="font-size: 3em; font-weight: bold; margin-left: 10px; margin-top: 12px">
                ProTrack
            </div>
            <div class="mssm-logo">
                <img src="./assets/logo_combined.png" height="72" style="margin-left:auto; margin-right:0;">
            </div>
        </div>
        <div class="cptac-description">
            NCI supported <a href="https://proteomics.cancer.gov/programs/cptac">Clinical Proteomic Tumor Analysis Consortium (CPTAC)</a>,
                is a comprehensive and coordinated effort to accelerate the understanding of the molecular
                basis of cancer through the application of large-scale proteome (proteins) and genome (DNA and RNA)
                analysis technologies to different cancer types. CPTAC is composed of expertise in proteomics, genomics,
                cancer biology, oncology, and clinical chemistry, while creating open community resources that
                are widely used by the cancer community.
            <p>This page provide data visualization for proteogenomic data from CPTAC-CCRCC discovery project. To view the data as a co-expression network, visit the <a href="http://ccrcc.cptac-network-view.org/"> CPTAC Interactive Network Portal</a>.</p>
            <p>For more information, please see the publication <a href="https://www.ncbi.nlm.nih.gov/pubmed/31675502">Fenyo et al. Cell. 2019</a>.</p>
        </div>
        <!--<div class="instructions" align="left">Click gene symbol to see more details. Click sample ID for links to histology images.</div>-->
        <div id="content">
            <user-input class="user-input-main"/>
            <!--<the-heatmap-container />-->
            <!--<the-legend-container />-->
            <the-heatmap-legend-instructions-container />
            <!--<the-heatmap-and-legend-container />-->
        </div>
    </div>
</template>

<script>
// import TheHeatmapContainer from '././components/TheHeatmapContainer.vue';
import UserInput from '././components/UserInput.vue'
// import TheLegendContainer from './components/TheLegendContainer.vue';
import TheHeatmapAndLegendContainer from './components/TheHeatmapAndLegendContainer.vue';
import TheHeatmapLegendInstructionsContainer from "./components/TheHeatmapLegendInstructionsContainer.vue";

export default {
    components: {
        // TheLegendContainer,
        TheHeatmapLegendInstructionsContainer,
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
        margin-top: 5px;
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
        font-weight: bold;
        margin: 15px;
    }

    .cptac-description p {
        margin-top: 2px;
        margin-bottom: 0;
    }

</style>
