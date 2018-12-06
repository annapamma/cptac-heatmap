<template>
    <div class="heatmap">
        <button @click="readData">Click me</button>
        <h3>hi this is where it goes: {{ geneList }}</h3>
        <div v-if="grade.length">
            <apexchart type=heatmap height=200 :options="chartOptions" :series="series" />
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
                    // animations: {
                    //     enabled: false,
                    // },
                    colors: ['#008FFB'],
                    title: {
                        text: this.name
                    },
                    xaxis: {
                        labels: {show: false}
                    }
                },
                // series: [{
                //     name: 'Grade',
                //     data: this.grade
                // }]
            }
        },
        computed: {
            geneList () {
                return this.$store.state.geneList;
            },
            grade () {
                // console.log(this.$store.state.grade);
                return this.$store.state.grade;
            },
            series () {
                return [
                    {name: 'Grade', data: this.$store.state.grade},
                ]
            }
        },
        methods: {
            readData () {
                console.log(this.series)
                console.log('hi')
            }
        }
    }

    // data: an array of {x: label, y: value}

</script>

<style scoped>

</style>
