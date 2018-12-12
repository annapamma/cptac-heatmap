<template>
    <div class="heatmap-gene" v-if="series.length">
        <div class="heatmap-gene-title"><a @click="displayGeneDetails">{{ gene }}</a></div>
        <apexchart type=heatmap :height="height" :options="chartOptions" :series="series" />
        <modal :height="'auto'" :scrollable="true" :draggable="true" :name="gene">
            <h3 class="modal-header"> {{ gene }}</h3>
            <div class="summary-text">{{ geneDetails['summary'] }}</div>
            <div class="additional-links"><a :href="geneDetails['url']" target="_blank">More at NCBI</a></div>
        </modal>
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    export default {
        name: 'heatmap-gene',
        props: ['gene'],
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

                                if (!series_i || !sample_i) {
                                    return
                                }
                                const label = this.series[series_i]['name'];
                                const sample = this.series[series_i]['data'][sample_i]['x'];
                                const series = this['gene'] + " " + label;

                                const values = this.$store.state['selectGeneData']['data'];
                                const found = values.find((obj) => {
                                    return obj['Index'] === series
                                });
                                const value = found[sample];
                                this.$store.dispatch('displayData', {
                                    series,
                                    sample,
                                    value
                                })
                            }
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                        axisTicks: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            minWidth: 80,
                        },
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
                                        color: '#00004d'
                                    },
                                    {
                                        from: 2,
                                        to: 2,
                                        color: '#000066'
                                    },
                                    {
                                        from: 3,
                                        to: 3,
                                        color: '#000080'
                                    },
                                    {
                                        from: 4,
                                        to: 4,
                                        color: '#4d88ff'
                                    },
                                    {
                                        from: 5,
                                        to: 5,
                                        color: '#80aaff'
                                    },
                                    {
                                        from: 6,
                                        to: 6,
                                        color: '#b3ccff'
                                    },
                                    {
                                        from: 7,
                                        to: 7,
                                        color: '#ccccff'
                                    },
                                    {
                                        from: 8,
                                        to: 8,
                                        color: '#E8E8E8'
                                    },
                                    {
                                        from: 9,
                                        to: 9,
                                        color: '#ffb3b3'
                                    },
                                    {
                                        from: 10,
                                        to: 10,
                                        color: '#ff8080'
                                    },
                                    {
                                        from: 11,
                                        to: 11,
                                        color: '#ff6666'
                                    },
                                    {
                                        from: 12,
                                        to: 12,
                                        color: '#ff4d4d'
                                    },
                                    {
                                        from: 13,
                                        to: 13,
                                        color: '#e60000'
                                    },
                                    {
                                        from: 14,
                                        to: 14,
                                        color: '#990000'
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
            geneDetails () {
                return this.$store.state.geneDetails[this.gene]
            },
            height () {
                const series = this.series.length;
                const calcHeights = {
                    7: 110,
                    6: 100,
                    5: 90,
                    4: 80,
                    3: 72,
                    2: 62,
                    1: 54
                };
                return calcHeights[series]
            },
            series () {
                const dataTypes = ['Phospho', 'Protein', 'mRNA', 'CNV (baf)', 'CNV (lr)', 'Methy', 'Mut'];
                let allData = [];
                dataTypes.forEach((dataType) => {
                    let data = this.$store.state[dataType][this.gene];
                    if (data) {
                        allData.push(
                            {
                                name: dataType,
                                data: data
                            }
                        )
                    }
                });
                return allData;
            }
        },
        methods: {
            displayGeneDetails () {
                this.$modal.show(this.gene);
            },
            hide () {
                this.$modal.hide(this.gene);
            }
        },
    }

</script>

<style scoped>
    .heatmap-gene {
        position: relative;
        min-height: 80px;
    }

    .heatmap-gene-title {
        padding: 0;
        margin-bottom: -30px;
        margin-top: -20px;
        font-weight: bold;
        font-size: small;
        position: relative;
        z-index: 99;
        cursor: pointer;
    }

    /*.modal {*/
        /*!*height: 50%*!*/
        /*background-color: pink;*/
        /*display: flex;*/
  /*flex-direction: column;*/
  /*min-height: 100vh;*/
    /*}*/

    .modal-header {
        /*margin: 0 auto;*/
        text-align: center;
        padding-top: 2px;
    }

    .summary-text {
        padding: 15px;
    }

    .additional-links {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 15px;
    }
</style>
