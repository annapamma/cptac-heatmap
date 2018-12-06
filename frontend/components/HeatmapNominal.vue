<template>
    <div class="heatmap">
        <div v-if="grade.length">
            <button @lick="viewSeries">View Series</button>
            <apexchart type=heatmap height=110 :options="chartOptions" :series="series" />
        </div>
    </div>
</template>

<script>
    // For CCRCC & 3p
    export default {
        name: 'heatmap',
        props: ['name'],
        data () {
            return {
                chartOptions: {
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        }
                    },
                    // na = 0
                    // loss = -2
                    // neutral LOH = -1
                    // neutral = 1
                    // amplification = 2
                    // no = -100
                    // yes = 100
                    plotOptions: {
                        heatmap: {
                            shadeIntensity: 0.5,
                            colorScale: {
                                ranges: [
                                    {
                                        from: 0,
                                        to: 0.1,
                                        // name: 'na',
                                        color: '#FFFFFF'
                                    },
                                    {
                                        from: 50,
                                        to: 50,
                                        // name: 'loss',
                                        color: '#000000'
                                    },
                                    // {
                                    //     from: -1,
                                    //     to: -1,
                                    //     // name: 'neutral LOH',
                                    //     color: '#ADD8E6'
                                    // },
                                    // {
                                    //     from: 1,
                                    //     to: 1,
                                    //     // name: 'neutral',
                                    //     color: '#b4b4b4'
                                    // },
                                    // {
                                    //     from: 2,
                                    //     to: 2,
                                    //     // name: 'amplification',
                                    //     color: '#cc0000'
                                    // },
                                    // {
                                    //     from: 100,
                                    //     to: 100,
                                    //     // name: 'CCRCC yes',
                                    //     color: '#cc59bc'
                                    // },
                                    // {
                                    //     from: -100,
                                    //     to: -100,
                                    //     // name: 'CCRCC no',
                                    //     color: '#b4b4b4'
                                    // }
                                ]
                            }
                        }
                    },
                }
            }
        },
        computed: {
            geneList () {
                return this.$store.state.geneList;
            },
            grade () {
                return this.$store.state.grade;
            },
            series () {
                return [
                    // {name: 'Grade', data: this.$store.state.grade}, // data: an array of {x: label, y: value}
                    // {name: 'Stage', data: this.$store.state.stage},
                    // {name: 'CIMP', data: this.$store.state.cimp},
                    {name: '3p', data: this.$store.state.threeP},
                    {name: 'CCRCC', data: this.$store.state.ccrcc}
                ]
            }
        },
        methods: {
            viewSeries () {
                console.log(this.series)
            }
        },
        updated () {
            removeElementsByClassName('.apexcharts-toolbar');
            removeElementsByClassName('.apexcharts-legend-series');
            removeElementsByClassName('.apexcharts-legend-point');
            removeElementsByClassName('.apexcharts-legend-text');
        }
    }

    function removeElementsByClassName (className) {
        document.querySelectorAll(className).forEach((a) => {
            a.remove()
        })
    }
</script>

<style scoped>

</style>
