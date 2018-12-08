<template>
    <div class="heatmap-gene">
        <apexchart type=heatmap height=150 :options="chartOptions" :series="series" />
    </div>
</template>

<script>
    export default {
        name: 'heatmap-gene',
        props: ['gene'],
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
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    title: {
                        text: '',
                        align: 'center',
                        margin: -18,
                    },
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: (val) => {
                                return ''
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
            series () {
                return [
                    {name: 'Phospho', data: convertToArrayOfObjects(this.$store.state.phospho[this.gene])},
                    {name: 'Pro', data: convertToArrayOfObjects(this.$store.state.protein[this.gene])},
                    {name: 'mRNA', data: convertToArrayOfObjects(this.$store.state.rna[this.gene])},
                    {name: 'CNV (lr)', data: convertToArrayOfObjects(this.$store.state.cnv_lr[this.gene])},
                    {name: 'CNV (baf)', data: convertToArrayOfObjects(this.$store.state.cnv_baf[this.gene])},
                    {name: 'Methy', data: convertToArrayOfObjects(this.$store.state.methylation[this.gene])},
                    {name: 'Mut', data: convertToArrayOfObjects(this.$store.state.mutation[this.gene])}
                ]
            }
        },
        mounted () {
            updateGraphTitle('.apexcharts-title-text', this.gene)
        }
    }

    function convertToArrayOfObjects (obj) {
        let arrayOfObjects = [];
        Object.keys(obj).forEach((k) => {
            arrayOfObjects.push(
                {x: k, y: obj[k]}
            )
        });
        return arrayOfObjects;
    }

    function updateGraphTitle (className, geneName) {
        document.querySelectorAll(className).forEach((a) => {
            a.innerHTML = geneName
        })
    }
</script>

<style scoped>

</style>
