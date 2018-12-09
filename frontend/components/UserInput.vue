<template>
    <div class="user-input">
        <input v-model="geneInput">
        <button @click="submitGenes">Visualize</button>
        <button @click="downloadImage">Download Image</button>
    </div>
</template>

<script>
    import domtoimage from 'dom-to-image';

    export default {
        name: 'user-input',
        data () {
            return {
                geneInput: ''
            }
        },
        computed: {
            genes () {
                return this.geneInput.toUpperCase().split('\t')
            }
        },
        methods: {
            submitGenes () {
                this.$store.dispatch(
                    'submitGenes',
                    {
                        genes: this.genes
                    }
                )
            },
            downloadImage () {
                let node = document.querySelectorAll('.the-heatmap-container')[0];
                domtoimage.toPng(node, { quality: 0.95, bgcolor: '#FFFFFF' })
                    .then(function (dataUrl) {
                        let link = document.createElement('a');
                        link.download = 'CPTAC-heatmap.png';
                        link.href = dataUrl;
                        link.click();
                    });
            }
        }
    }

</script>

<style scoped>

</style>
