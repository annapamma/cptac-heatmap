<template>
    <div class="heatmap">
        <div v-if="grade.length">
            <apexchart type=heatmap height=250 :options="chartOptions" :series="series" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'heatmap',
        props: ['name'],
        data () {
            return {
                chartOptions: {
                    dataLabels: {
                        enabled: false,
                    },
                    colors:
                        ['#58883c', // grade
                        '#2d2bea', // stage
                        '#ea1c3a', // cimp
                        '#d534ea', // cimp
                        '#6a6a6a', // ccrcc
                        ],
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show: false,
                        }
                    },
                },
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
                    {name: 'Grade', data: this.$store.state.grade},
                    {name: 'Stage', data: this.$store.state.stage},
                    {name: 'CIMP', data: this.$store.state.cimp},
                    {name: '3p', data: this.$store.state.threeP},
                    {name: 'CCRCC', data: this.$store.state.ccrcc},
                ]
            }
        },
        methods: {
            readData () {
                console.log(this.series)
            }
        }
    }

    // data: an array of {x: label, y: value}

</script>

<style scoped>

</style>
