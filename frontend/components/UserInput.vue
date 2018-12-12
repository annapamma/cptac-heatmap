<template>
    <div class="user-input">
        <textarea v-model="geneInput" id="gene-input" :placeholder="'Paste gene list'"></textarea>
        <button @click="submitGenes">Visualize</button>
        <button @click="downloadImage">Download Image</button>

        <download-excel
            class   = "btn btn-default"
            :data   = "selectGeneData"
            :param = "selectGeneSchema"
            name    = "CPTAC3-heatmap.xls"
        >
            <button :disabled="!loadedExcel">Download Excel</button>
        </download-excel>
        <div class="data-display-container" v-if="loadedExcel">
            <div class="data-display">
                <p>Data type: <b>{{ displayData['series'] }}</b></p>
                <p>Sample: <b>{{ displayData['sample'] }}</b></p>
                <p>Value: <b>{{ displayData['value'] }}</b></p>
                <!--<p>Gene: <b>{{ displayData['gene'] }}</b></p>-->
                <small><i>Click data point to display</i></small>
            </div>
            <button @click="sortBySeries" :disabled="!displayData['sample'].length">Sort by {{ displayData['series'] }}</button>
        </div>
        <p class="description">Enter up to 30 gene symbols.
            They can be separated by comma (‘,’), semicolon (';'), space (‘ ‘), tab, or newline.
            The dataset provides data for 22,867 genes. Not all data types will be available for every gene.</p>
        <p class="description">For more details, see publication …</p>
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    import domtoimage from 'dom-to-image';

    export default {
        name: 'user-input',
        data () {
            return {
                geneInput: '',
            }
        },
        computed: {
            displayData () {
                return this.$store.state.displayData;
            },
            genes () {
                const trimmedGeneList = this.geneInput.trim().toUpperCase();
                let geneListArr = [];

                if (trimmedGeneList.length === 0) {
                    return []
                }

                const combinations = [
                    ['\t', ' '],
                    ['\t', '\n'],
                    ['\t', ','],
                    ['\n', ' '],
                    ['\n', ','],
                    [' ', ','],
                    [';', ','],
                    [';', '\t'],
                    [';', '\n'],
                    [';', ' ']
                ];

                for (let i = 0; i < combinations.length; i++) {
                    let c = combinations[i];
                    if (trimmedGeneList.includes(c[0]) && trimmedGeneList.includes(c[1])) {
                        alert('Enter genes separated by a newline, tab, or space. ' +
                            'Your list seems to include multiple separators.')
                        return [];
                    }
                }

                if (trimmedGeneList.includes('\t')) {
                    geneListArr = trimmedGeneList.split('\t');
                } else if (trimmedGeneList.includes(' ')) {
                    geneListArr = trimmedGeneList.split(' ');
                } else if (trimmedGeneList.includes(';')) {
                    geneListArr = trimmedGeneList.split(';');
                } else if (trimmedGeneList.includes(',')) {
                    geneListArr = trimmedGeneList.split(',');
                } else {
                    geneListArr = trimmedGeneList.split('\n')
                }

                return [...new Set(geneListArr)];
            },
            loadedExcel () {
                return this.$store.state['loaded_excel']
            },
            selectGeneData () {
                return this.$store.state.selectGeneData['data'];
            },
            selectGeneSchema () {
                return this.$store.state.selectGeneData['params'];
            }
        },
        methods: {
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
            sortBySeries () {
                const series = this.displayData['series'];
                const sampleDataTypes = ['14q', '7p', '5q', '3p', 'ccrcc'];
                const type = sampleDataTypes.indexOf(series) > 0 ? 'sample' : 'gene'
                this.$store.dispatch('sortBySeries',
                    {
                        series,
                        type
                    })
            },
            submitGenes () {
                this.$store.dispatch(
                    'submitGenes',
                    {
                        genes: this.genes
                    }
                );
                this.$store.dispatch(
                    'downloadGeneData',
                    {
                        genes: this.genes
                    }
                );
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
    .user-input {
        display: flex;
        flex-direction: column;
        width: 30%;
        margin-left: 10px;
    }

    .user-input textarea {
        /*margin: 20px 5px auto;*/
        border: 1px solid;
        padding: 1%;
        height: 30vh;
        /*width: 100%;*/
    }

    .user-input button {
        margin: 10px;
        width: 100%;
    }

    .description {
        text-align: justify;
        font-weight: bold;
    }
</style>
