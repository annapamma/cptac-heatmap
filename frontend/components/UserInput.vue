<template>
    <div class="user-input">
        <textarea v-model="geneInput" id="gene-input" :placeholder="'Paste gene list'"></textarea>
        <button @click="submitGenes">Visualize</button>
        <button @click="downloadImage">Download Image</button>

        <download-excel
            class   = "btn btn-default"
            :data   = "selectGeneData"
            :param = "selectGeneSchema"
            name    = "CPTAC3-CCRCC-heatmap.xls"
        >
            <button :disabled="!loadedExcel">Download Excel</button>
        </download-excel>

        <div class="responsive-data-displays" v-if="loadedExcel">
            <div class="data-display-container">
                <div class="data-display">
                    <div class="sample-description">
                        <p>Sample: <b @click="displaySampleHistologyLinks">{{ displayData['sample'] }}</b></p>
                        <img @click="displaySampleHistologyLinks"
                             src="../assets/histology-icon.png"
                             alt="links for histologic images"
                             title="links for histologic images"
                        >
                    </div>
                    <p>Data type: <b>{{ displayData['series'] }}</b></p>
                    <p>Value: <b>{{ displayData['value'] }}</b></p>
                    <small><i>Click data point to display and enable sorting</i></small>
                </div>
                <button @click="sortBySeries(ascending=1)" :disabled="!displayData['sample'].length">Sort by {{ displayData['series'] }}: Ascending</button>
                <button @click="sortBySeries(ascending=0)" :disabled="!displayData['sample'].length">Sort by {{ displayData['series'] }}: Descending</button>
            </div>
            <modal :height="'auto'" :scrollable="true" :draggable="true" :name="displayData['sample']">
                <div class="modal-content">
                    <histology-display :sample="displayData['sample']"/>
                    <!--<h3 class="modal-header">{{ gene }}</h3>-->
                    <!--<div class="summary-text">{{ geneDetails['summary'] }}</div>-->
                    <!--<div class="additional-links"><a :href="geneDetails['url']" target="_blank">More at NCBI</a></div>-->
                </div>
            </modal>
        </div>

        <p class="description">Enter up to 30 gene symbols.
            They can be separated by comma (‘,’), semicolon (';'), space (‘ ‘), tab, or newline.
            The dataset provides data for 22,867 genes. Not all data types will be available for every gene.</p>
        <p class="description">Click gene symbol to see more details. Click sample ID for links to histology images.</p>
        <p class="description">For more details, see publication …</p>
    </div>
</template>

<script>
    /* eslint-disable camelcase */

    import domtoimage from 'dom-to-image';
    import HistologyDisplay from './HistologyDisplay.vue';

    export default {
        components: {HistologyDisplay},
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
                            'Your list seems to include multiple separators.');
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
            displaySampleHistologyLinks () {
                this.$modal.show(this.displayData['sample']);
            },
            hideSampleHistologyLinks () {
                this.$modal.hide(this.displayData['sample']);
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
            sortBySeries (ascending) {
                const series = this.displayData['series'];
                this.$store.dispatch('sortBySeries',
                    {
                        series,
                        ascending
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
            this.$store.dispatch('loadFirstData');
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
        padding: 0;
        height: 100%;
        min-height: 1000px;
        /*background-color: lightgray;*/
    }

    .user-input textarea {
        border: 1px solid;
        padding: 1%;
        height: 300px;
        min-height: 30px;
        width: 80%;
        margin: 20px auto;
    }

    .user-input button {
        margin: 10px auto;
        width: 80%;
    }

    .description {
        text-align: justify;
        font-weight: bold;
        margin: 10px auto;
        padding: 20px;
        font-family: "Times New Roman", Times, serif;
    }

    .responsive-data-displays {
        /*display: inline;*/
        display: flex;
        height: 30%;
        width: 100%;
        /*flex-direction: row;*/
    }

    .data-display-container {
        width: 60%;
        margin: 5px auto;
        padding: 10px;
        background: white;
        height: 100%;
    }

    .data-display {
        text-align: justify;
        font-weight: bold;
        margin: 0 auto;
        padding: 0px;
        font-family: "Times New Roman", Times, serif;
    }


    .sample-description {
        display: flex;
        flex-direction: row;
        /*justify-content: space-evenly;*/
    }

    .sample-description img {
        width:1em;
        height:1em;
        margin: auto;
        padding: 2px;
        border: solid 1px black;
        cursor: pointer;
    }

    .modal-content {
        width: 100%;
    }
</style>
