<template>
    <div class="heatmap">
        <button @click="readData">Click me </button>
        <h3>hi this is where it goes: {{ geneList }}</h3>
        <apexchart type=heatmap height=200 :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    export default {
        name: 'heatmap',
        data () {
            return {
                chartOptions: {
                    plotOptions: {
                        heatmap: {
                            shadeIntensity: 0.5,

                            colorScale: {
                                ranges: [{
                                    from: -30,
                                    to: 5,
                                    name: 'low',
                                    color: '#00A100'
                                },
                                {
                                    from: 6,
                                    to: 20,
                                    name: 'medium',
                                    color: '#128FD9'
                                },
                                {
                                    from: 21,
                                    to: 45,
                                    name: 'high',
                                    color: '#FFB200'
                                },
                                {
                                    from: 46,
                                    to: 55,
                                    name: 'extreme',
                                    color: '#FF0000'
                                }]
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    // colors: ['#008FFB'],
                    title: {
                        text: 'HeatMap Chart (Single color)'
                    }
                },
                series: [{
                    name: 'MyData',
                    data: [
                        {x: 'a', y: 35},
                        {x: 'b', y: 3}
                    ]
                },
                {
                    name: 'MyData2',
                    data: [
                        {x: 'a', y: 12},
                        {x: 'b', y: 3}
                    ]
                }]
            }
        },
        computed: {
            geneList () {
                return this.$store.state.geneList;
            }
        },
        methods: {
            readData () {
                console.log(this.series)
                console.log('hi')
            }
        }
    }

    // data: an array of {x: label, y: value}

</script>

<style scoped>

</style>
