<template>
    <div class="heatmap-ccrcc-3p">
        <apexchart type=heatmap :height="72" :options="chartOptions" :series="series" />
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
                    grid: {
                        padding: {
                            top: -20,
                        }
                    },
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
                                // const sample = this.series[series_i]['data'][sample_i]['x'];
                                const sample = this.series[series_i]['data'][sample_i]['x'];

                                if (sample === 'separator') {
                                    return
                                }

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
                            minWidth: 500
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
                                        color: '#003366'
                                    },
                                    {
                                        from: 2,
                                        to: 2,
                                        color: '#ADD8E6'
                                    },
                                    {
                                        from: 3,
                                        to: 3,
                                        color: '#b4b4b4'
                                    },
                                    {
                                        from: 4,
                                        to: 4,
                                        color: '#cc0000'
                                    },
                                                                        {
                                        from: 1001,
                                        to: 1001,
                                        color: '#fff871'
                                    },
                                    {
                                        from: 1002,
                                        to: 1002,
                                        color: '#98f367'
                                    },
                                    {
                                        from: 1003,
                                        to: 1003,
                                        color: '#9ecae3'
                                    },
                                    {
                                        from: 1004,
                                        to: 1004,
                                        color: '#cc0000'
                                    },
                                    {
                                        from: 100,
                                        to: 100,
                                        color: '#003366'
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
                // this.chartOptions.plotOptions.heatmap.enableShades = false;
                const blankRow = {name: '', data: []};
                return [
                    {name: 'Immune Group', data: this.$store.state['Immune Group']},
                    blankRow,
                    {name: '3p-CNV', data: this.$store.state['3p-CNV']},
                    {name: 'CCRCC', data: this.$store.state['CCRCC']},
                ]
            }
        },
    }
</script>

<style scoped>
    /*.heatmap-chromosome {*/
        /*padding-bottom: -10px;*/
    /*}*/
</style>
