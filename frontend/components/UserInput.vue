<template>
    <div class="user-input">
        <textarea v-model="geneInput" id="gene-input" :placeholder="'Paste gene list'"></textarea>
        <button @click="submitGenes">Visualize</button>
        <button @click="downloadImage">Download Image</button>

        <button :disabled="!loadedExcel" @click="downloadExcelFile">Download Excel</button>

        <div class="responsive-data-displays" v-if="loadedExcel">
            <div class="data-display-container">
                <div class="data-display">
                    <p>Sample: <b @click="displaySampleHistologyLinks">{{ displayData['sample'] }}</b></p>
                    <div class="sample-description">
                        <img @click="displaySampleHistologyLinks"
                                 src="../assets/histology-icon.png"
                                 alt="links for histologic images"
                                 title="links for histologic images">
                        <img @click="displayClinicalData"
                                 src="../assets/clipboard.png"
                                 alt="links for clinical data"
                                 title="links for clinical data">
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
                </div>
            </modal>
            <modal :height="'auto'" :scrollable="true" :draggable="true" :name="clinicalDataModalName">
                <div class="modal-content">
                    <clinical-data-display :sample="displayData['sample']"/>
                </div>
            </modal>
            <div class="track-selector-container">
                <track-selector />
            </div>
        </div>

        <p class="description">Enter up to 30 gene symbols.
            They can be separated by comma (‘,’), semicolon (';'), space (‘ ‘), tab, or newline.
            The dataset provides data for 22,867 genes. Not all data types will be available for every gene.</p>
        <!--<p class="description">Click gene symbol to see more details. Click sample ID for links to histology images.</p>-->
        <!--<p class="description">For more details, see publication …</p>-->
    </div>
</template>

<script>
    /* eslint-disable camelcase */
    import { utils, writeFile } from 'xlsx'

    import html2canvas from 'html2canvas'

    import HistologyDisplay from './HistologyDisplay.vue';
    import ClinicalDataDisplay from './ClinicalDataDisplay.vue';
    import TrackSelector from './TrackSelector.vue';

    export default {
        components: {
            TrackSelector,
            HistologyDisplay,
            ClinicalDataDisplay,
        },
        name: 'user-input',
        data () {
            return {
                geneInput: [],
            }
        },
        computed: {
            clinicalDataModalName() {
                return this.$store.state.displayData + "_clinical"
            },
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
        },
        methods: {
            displaySampleHistologyLinks () {
                if (!this.displayData['sample']) {
                    return
                }
                this.$modal.show(this.displayData['sample']);
            },
            displayClinicalData () {
                if (!this.displayData['sample']) {
                    return
                }
                this.$modal.show(this.clinicalDataModalName);
            },
            downloadExcelFile: function () {
                let excelHeaders = ['Index', 'Data type', 'Gene symbol', ...this.$store.state.sortOrder];
                const ws = utils.json_to_sheet(this.selectGeneData, {header: excelHeaders});
                let wb = utils.book_new();
                utils.book_append_sheet(wb, ws);
                writeFile(wb, 'CPTAC-CCRCC.xls');
            },
            downloadImage () {
                html2canvas(document.querySelector('#the-heatmap-and-legend-container'),
                    {scale: 1}
                ).then(canvas => {
                    let a = document.createElement('a');
                    a.href = canvas.toDataURL("image/jpeg", 1).replace("image/jpeg", "image/octet-stream");
                    a.download = 'cptac_ccrcc.jpg';
                    a.click();
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
                if (this.genes.length > 30) {
                    alert("Please limit to 30 genes");
                    return;
                }
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
            const defaultGenes = [];
            // const defaultGenes = ['VHL', 'SETD2', 'PBRM1', 'BAP1', 'NDUFA4L2',
            //     'VIM', 'ANGPTL4', 'CA9', 'RHCG', 'FOXI1', 'VSTM2A'];
            const urlTrail = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
            let genes = urlTrail.length ? urlTrail.split("&") : defaultGenes;

            this.geneInput = genes.join("\n");
            this.$store.dispatch(
                'submitGenes',
                {
                    genes,
                }
            );
            this.$store.dispatch(
                'downloadGeneData',
                {
                    genes,
                }
            );

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
        border: solid 1px black;
        background-color: #edeff2;
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
        margin: 5px auto;
        padding: 10px;
        font-family: "Times New Roman", Times, serif;
    }

    .responsive-data-displays {
        /*display: inline;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 30%;
        width: 100%;
        /*flex-direction: row;*/
    }

    .data-display-container {
        width: 50%;
        margin: 5px;
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
        justify-content: flex-start;
    }

    .sample-description img {
        width:1em;
        height:1em;
        margin: 5px;
        padding: 2px;
        border: solid 1px black;
        cursor: pointer;
    }

    .modal-content {
        width: 100%;
    }

    .track-selector-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 40%;
        margin: 5px;
        padding: 10px;
        background: white;
    }
</style>
