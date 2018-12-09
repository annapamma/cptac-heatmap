<template>
    <div class="heatmap-ccrcc-3p">
        <apexchart type=heatmap :height=110 :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    // For CCRCC & 3p
    export default {
        name: 'heatmap-ccrcc-3p',
        props: [],
        data () {
            return {
                chartOptions: {
                    legend: {
                        show: false
                    },
                    chart: {
                        toolbar: {
                            show: false
                        },
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            speed: 20,
                            animateGradually: {
                                enabled: false,
                            },
                            dynamicAnimation: {
                                enabled: false,
                                speed: 10
                            }
                        }
                    },
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
                    yaxis: {
                        labels: {
                            minWidth: 80
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
                                    100: 'Yes'
                                };
                                return valueDict[val];
                            }
                        }
                    },
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
            series () {
                const blankRow = {name: '', data: []};
                return [
                    {name: '14q', data: this.$store.state.fourteenQ},
                    {name: '7p', data: this.$store.state.sevenP}, // data: an array of {x: label, y: value}
                    {name: '5q', data: this.$store.state.fiveQ},
                    blankRow,
                    {name: '3p', data: this.$store.state.threeP},
                    {name: 'CCRCC', data: this.$store.state.ccrcc},
                ]
            }
        }
    }

</script>

<style scoped>

</style>
