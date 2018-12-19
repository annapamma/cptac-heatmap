<template>
    <div class="heatmap-ccrcc-3p">
        <apexchart type=heatmap :height="120" :options="chartOptions" :series="series" />
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
                // data: an array of {x: label, y: value}
                const blankRow = {name: '', data: []};
                return [
                    {name: '14q', data: this.$store.state['14q']},
                    {name: '7p', data: this.$store.state['7p']},
                    {name: '5q', data: this.$store.state['5q']},
                    blankRow,
                    {name: 'Immune Group', data: this.$store.state['immuneGroup']},
                    blankRow,
                    {name: '3p', data: this.$store.state['3p']},
                    {name: 'CCRCC', data: this.$store.state['CCRCC']},
                ]
            }
        },
        mounted () {
            // applyColors()
        }
    }

    // function applyColors () {
    //     const rects = document.getElementsByTagName('rect');
    //     for (let i = 0; i < rects.length; i++) {
    //         // console.log(rects[i].getAttribute('val'))
    //         console.log(rects[i].getAttribute('color'))
    //         rects[i].setAttribute('color', '#ff37eb')
    //         // element[index].parentNode.removeChild(element[index]);
    //     }
    // }
</script>

<style scoped>

</style>
