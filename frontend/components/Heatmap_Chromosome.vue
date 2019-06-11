<template>
    <div class="heatmap-chromosome">
        <apexchart type=heatmap :height="117" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    export default {
        name: 'heatmap-chromosome',
        props: [],
        data () {
            return {
                chartOptions: {
                    legend: {
                        show: false
                    },
                    grid: {
                        padding: {
                            top: -20,
                        }
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
                                    series = series === 'Immune Group Label' ? 'Immune Group' : series;
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
                            minWidth: 190
                        }
                    },
                    tooltip: {
                        enabled: false,
                    },
                    plotOptions: {
                        heatmap: {
                            enableShades: true,
                            colorScale: {
                                ranges: [
                                    {
                                        from: 0,
                                        to: 0.1,
                                        color: '#FFFFFF'
                                    },
                                    {
                                        from: 1,
                                        to: 1,
                                        color: '#87c0e2'
                                    },
                                    {
                                        from: 2,
                                        to: 2,
                                        color: '#128c24'
                                    },
                                    {
                                        from: 3,
                                        to: 3,
                                        color: '#fffe56'
                                    },
                                    {
                                        from: 4,
                                        to: 4,
                                        color: '#e73225'
                                    },
                                    {
                                        from: 10,
                                        to: 10,
                                        color: '#003366'
                                    },
                                    {
                                        from: 20,
                                        to: 20,
                                        color: '#ADD8E6'
                                    },
                                    {
                                        from: 30,
                                        to: 30,
                                        color: '#b4b4b4'
                                    },
                                    {
                                        from: 40,
                                        to: 40,
                                        color: '#cc0000'
                                    },
                                    {
                                        from: 100,
                                        to: 100,
                                        color: '#cc0000'
                                    },
                                    {
                                        from: -100,
                                        to: -100,
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
                // data: an array of {x: label, y: value}
                return [
                    {name: 'Genome instability', data: this.$store.state['Genome instability']},
                    {name: 'CIMP', data: this.$store.state['CIMP']},
                    {name: 't(3;5)', data: this.$store.state['t(3;5)']},
                    {name: 't(3;2)', data: this.$store.state['t(3;2)']},
                    {name: '14q-CNV', data: this.$store.state['14q-CNV']},
                    {name: '9p-CNV', data: this.$store.state['9p-CNV']},
                    {name: '7p-CNV', data: this.$store.state['7p-CNV']},
                    {name: '5q-CNV', data: this.$store.state['5q-CNV']},
                ]
            }
        },
    }

</script>

<style scoped>
.heatmap-chromosome {
    /*margin-top: -30px;*/
    /*background-color: pink;*/
}
</style>
