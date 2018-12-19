<template>
    <div class="heatmap-stage-grade-gender">
        <apexchart type=heatmap :height="120" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    export default {
        name: 'heatmap-stage-grade-gender',
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
                            minWidth: 40
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
                                        color: '#1fc600'
                                    },
                                    {
                                        from: 2,
                                        to: 2,
                                        color: '#089000'
                                    },
                                    {
                                        from: 3,
                                        to: 3,
                                        color: '#0a5d00'
                                    },
                                    {
                                        from: 4,
                                        to: 4,
                                        color: '#063b00'
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
                const blankRow = {name: '', data: []};
                return [
                    {name: 'CIMP', data: this.$store.state['CIMP']},
                    {name: 'Stage', data: this.$store.state['Stage']},
                    {name: 'Grade', data: this.$store.state['Grade']},
                    {name: 'Gender', data: this.$store.state['Gender']},
                    {name: 'Genome Instability', data: this.$store.state['Genome Instability']},
                    {name: 'Chr 2 & 3 translocation', data: this.$store.state['Chromosome 2 and 3 translocation']},
                ]
            }
        },
    }

</script>

<style scoped>

</style>
