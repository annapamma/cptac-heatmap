<template>
    <div class="legend-element">
        <div class="box" v-bind:style="{ 'backgroundColor': color }" id="colorbox"></div>
        <label for="colorbox">{{ value }}</label>
    </div>
</template>

<script>
    export default {
        name: 'legend-element-horizontal',
        props: ['value', 'color']
    }
</script>

<style scoped>
    .legend-element {
        display: flex;
        flex-direction: column;
        justify-content: left;
        /*margin-left: -10px;*/
        /*margin-right: -10px;*/
        /*border: solid 1px black;*/
        /*background-color: pink;*/
    }

    .legend-element label {
        font-size: 9px;
        font-weight: bold;
        margin-left: 1px;
    }

    .box{
        width:9px;
        height:9px;
        border-radius: 1px;
        /*padding-bottom: -1px;*/

    }
</style>
