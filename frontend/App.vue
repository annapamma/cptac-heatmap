<template>
    <div id="app">
        <user-input />
        <the-heatmap-container />
    </div>
</template>

<script>
import TheHeatmapContainer from '././components/TheHeatmapContainer.vue';
import UserInput from '././components/UserInput.vue'

export default {
    components: {
        UserInput,
        TheHeatmapContainer},
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
    margin-top: 60px;
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

#app {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    overflow: auto;
}
</style>
