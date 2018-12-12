<template>
    <div class="heatmap-ccrcc-3p">
        <apexchart type=heatmap :height="100" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    /* eslint-disable camelcase */

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
                        },
                        events: {
                            click: (event, chartContext, config) => {
                                const series_i = event.target.getAttribute('i');
                                const sample_i = event.target.getAttribute('j');
                                let series = this.series[series_i]['name'];

                                const sample = this.series[series_i]['data'][sample_i]['x'];
                                const values = this.$store.state['selectGeneData']['data'];
                                const found = values.find((obj) => {
                                    return obj['Index'] === series
                                });
                                const value = found[sample];

                                this.$store.dispatch('displayData', {
                                    series,
                                    sample,
                                    value
                                });
                            },
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
    }

</script>

<style scoped>

</style>
