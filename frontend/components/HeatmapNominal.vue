<template>
    <div class="heatmap">
        <div v-if="grade.length">
            <button @lick="viewSeries">View Series</button>
            <apexchart type=heatmap height=93 :options="chartOptions" :series="series" />
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
                tooltip: {
                    enabled: false,
                },
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
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: (val) => {
                                if (val === -100) {
                                    return 'No';
                                }

                                const valueDict = {
                                    0: 'NA',
                                    1: 'Loss',
                                    2: 'Neutral LOH',
                                    3: 'Neutral',
                                    4: 'Amplification',
                                    100: 'Yes',
                                };
                                return valueDict[val];
                            }
                        }
                    },
                    // na = 0
                    // loss = 1
                    // neutral LOH = 2
                    // neutral = 3
                    // amplification = 4
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
                                        from: 1,
                                        to: 1,
                                        // name: 'loss',
                                        color: '#003366'
                                    },
                                    {
                                        from: 2,
                                        to: 2,
                                        // name: 'neutral LOH',
                                        color: '#ADD8E6'
                                    },
                                    {
                                        from: 3,
                                        to: 3,
                                        // name: 'neutral',
                                        color: '#b4b4b4'
                                    },
                                    {
                                        from: 4,
                                        to: 4,
                                        // name: 'amplification',
                                        color: '#cc0000'
                                    },
                                    {
                                        from: 100,
                                        to: 100,
                                        // name: 'CCRCC yes',
                                        color: '#003366'
                                    },
                                    {
                                        from: -100,
                                        to: -100,
                                        // name: 'CCRCC no',
                                        color: '#b4b4b4'
                                    }
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
