<template>
    <div class="user-input">
        <textarea v-model="geneInput" id="gene-input"></textarea>
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
                return this.geneInput.toUpperCase().split(' ')
            }
        },
        methods: {
            submitGenes () {
                this.$store.dispatch(
                    'submitGenes',
                    {
                        genes: [ ...new Set(this.genes) ]
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
            },
        },
        mounted () {
            enableTabsInTextarea()
        }
    }

    function enableTabsInTextarea () {
        document.getElementById('gene-input')
            .addEventListener('keydown', function (event) {
                if (event.key === 'Tab') {
                    // Set up some variables. We need to know the current position of the cursor or selection.
                    let selectionStartPos = this.selectionStart;
                    let selectionEndPos = this.selectionEnd;
                    let oldContent = this.value;

                    // Set the new content.
                    this.value = oldContent.substring(0, selectionStartPos) + '\t' + oldContent.substring(selectionEndPos);

                    // Set the new cursor position (current position + 1 to account for the new tab character).
                    this.selectionStart = this.selectionEnd = selectionStartPos + 1;

                    // Prevent the default action (tabbing to the next field or control).
                    event.preventDefault();
                }
            })
    }
</script>

<style scoped>
.gene-input {
    width: 100%;
}
</style>
