<template>
    <div class="legend-category">
        <label for="v-for-object">{{ category }}<p v-if="category === 'Z-Score'">Adjusted log ratio values</p></label>
        <ul id="v-for-object" class="legend-elements">
          <li v-for="element in elements">
            <legend-element-horizontal :value="element[0]" :color="element[1]"/>
          </li>
        </ul>
    </div>
</template>

<script>
    import LegendElementHorizontal from './LegendElementHorizontal.vue';

    export default {
        name: 'legend-category-horizontal',
        components: {LegendElementHorizontal},
        props: ['category', 'elements'],
        // data () {
        //     return {
        //         'category': 'TEST',
        //         'elements': {
        //             1: 'red',
        //             2: 'yellow',
        //             3: 'blue'
        //         }
        //     }
        // },
    }
</script>

<style scoped>
.legend-elements {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    /*border: solid 1px black;*/
    /*background-color: yellow;*/
}

.legend-elements li {
    margin: 5px -10px;
}
.legend-category label {
    font-size: small;
    font-weight: bold;
}

.legend-category label p {
    font-size: x-small;
    /*font-weight: bold;*/
    margin: 0;
}
</style>
