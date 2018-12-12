<template>
    <div class="heatmap-ccrcc-3p">
        <apexchart @click="handleClick" type=heatmap :height="100" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    // hack to deal with nested objects
    let that = {};

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
                            enabled: false,
                            easing: 'linear',
                            speed: 20,
                            animateGradually: {
                                enabled: false,
                            },
                            dynamicAnimation: {
                                enabled: false,
                                speed: 10
                            }
                        },
                        events: {
                            click: function (event, chartContext, config) {
                                // console.log(context)
                                // const data_types = ['fourteenQ', 'sevenP', 'fiveQ', '', 'threeP', 'ccrcc'];
                                // const labels = ['14q', '7p', '5q', '', '3p', 'ccrcc'];
                                const series_i = event.target.getAttribute('i');
                                const sample_i = event.target.getAttribute('j');
                                const series = that.series[series_i]['name'];
                                const sample = that.series[series_i]['data'][sample_i]['x'];
                                const values = that.$store.state['selectGeneData']['data'];
                                const found = values.find((obj) => {
                                    return obj['Index'] === series
                                });
                                const value = found[sample];
                                that.$store.dispatch('displayData', {
                                    series,
                                    sample,
                                    value
                                });
                                // const clicked = data_types[series_i];
                                // // const series = labels[series_i];
                                // const sample = that.$store.state[clicked][sample_i]['x'];
                                // const values = that.$store.state['selectGeneData']['data'];
                                // const found = values.find((obj) => {
                                //     return obj['Index'] === series
                                // });
                                // const value = found[sample];
                                // that.$store.dispatch('displayData', {
                                //     series,
                                //     sample,
                                //     value
                                // })
                              // ...
                            },
                            // dataPointSelection: function(chartContext, { xaxis, yaxis }) {
                            //     console.log('working??')
                            //     console.log(chartContext)
                            //   // ...
                            // }
                        },
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
                        enabled: false,
                    },
                    plotOptions: {
                        heatmap: {
                            enableShades: false,
                            // shadeIntensity: 0.5,
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
            // height () {
            //     return Math.round(this.series.length * 16.7)
            // },
            series () {
                const blankRow = {name: '', data: []};
                return [
                    {name: '14q', data: this.$store.state['14q']},
                    {name: '7p', data: this.$store.state['7p']}, // data: an array of {x: label, y: value}
                    {name: '5q', data: this.$store.state['5q']},
                    blankRow,
                    {name: '3p', data: this.$store.state['3p']},
                    {name: 'CCRCC', data: this.$store.state['CCRCC']},
                ]
            }
        },
        methods: {
            handleClick (evt) {
                console.log(evt)
            }
        },
        mounted () {
            that = this;
        }
    }

</script>

<style scoped>

</style>
