<template>
    <div class="legend-category">
        <label for="v-for-object">{{ category }}</label>
        <ul id="v-for-object" class="legend-elements">
          <li v-for="element in elements">
            <legend-element :value="element[0]" :color="element[1]"/>
          </li>
        </ul>
    </div>
</template>

<script>
    import LegendElement from './LegendElement.vue';

    export default {
        name: 'legend-category',
        components: {LegendElement},
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
    flex-direction: column;
    justify-content: left;
    margin-top: 10px;
    margin-bottom: 10px;
}

.legend-category label {
    font-size: small;
    font-weight: bold;
}
</style>
