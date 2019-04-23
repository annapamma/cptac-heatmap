<template>
    <div id="app">
        <div class="logo-bar">
             <div class="cptac-logo">
                <img src="./assets/cptac-logo.png" align="left">
            </div>
            <div class="mssm-logo">
                <img src="./assets/MSSMLogo.png" align="right">
            </div>
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
        /*margin-top: 60px;*/
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
        /*height: 100%;*/
        overflow: auto;
        margin-top: 10px;
    }

    .user-input-main {
        /*background-color: lightgray;*/
        background: lightgray;
        /*height: 100%;*/
    }

    .logo-bar {
        height: 10%;
        flex-direction: row;
        /*background-color: pink;*/
        justify-content: right;
    }

    .cptac-logo {
        margin-left: 30px;
    }

    .mssm-logo {
       margin-right: 30px;
    }

</style>
