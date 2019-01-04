/* eslint-disable no-trailing-spaces,camelcase */
import Vue from 'vue'
import Vuex from 'vuex'

import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        'CCRCC': [],
        'Chr 2 and 3 translocation': [],
        'CIMP': [],
        'CNV (baf)': {},
        'CNV (lr)': {},
        displayData: {
            series: '',
            sample: '',
            value: ''
        },
        '5q-CNV': [],
        '14q-CNV': [],
        'Gender': [],
        geneData: {},
        geneDetails: {},
        genes: [],
        'Genome Instability': [],
        'Grade': [],
        histology: {},
        histologyDisplay: {},
        emptyForShade: [],
        'Immune Group': [],
        loaded: false,
        loaded_excel: false,
        loading: false,
        'Methy': {},
        'Mut': {},
        'Phospho': {},
        'Protein': {},
        'mRNA': {},
        selectGeneData: {
            'data': [],
            'params': {}
        },
        '7p-CNV': [],
        'Stage': [],
        '3p-CNV': [],
    },
    mutations: {
        'ADD_CCRCC' (state, ccrcc) {
            state['CCRCC'] = ccrcc;
        },
        'ADD_CIMP' (state, cimp) {
            state['CIMP'] = cimp;
        },
        'ADD_CNV_BAF' (state, cnv_baf) {
            state['CNV (baf)'] = cnv_baf;
        },
        'ADD_CNV_LR' (state, cnv_lr) {
            state['CNV (lr)'] = cnv_lr;
        },
        'ADD_FIVE_Q' (state, fiveQ) {
            state['5q-CNV'] = fiveQ;
        },
        'ADD_FOURTEEN_Q' (state, fourteenQ) {
            state['14q-CNV'] = fourteenQ;
        },
        'ADD_GENDER' (state, gender) {
            state['Gender'] = gender;
        },
        'ADD_GENE_DETAILS' (state, geneDetails) {
            state.geneDetails = geneDetails
        },
        'ADD_GENE_LIST' (state, genes) {
            state.genes = genes
        },
        'ADD_GENOMIC_INSTABILITY' (state, genomicInstability) {
            state['Genome Instability'] = genomicInstability
        },
        'ADD_GRADE' (state, grade) {
            state['Grade'] = grade;
        },
        'ADD_HISTOLOGY_DATA' (state, histology) {
            state.histology = histology;
        },
        'ADD_IMMUNE_GROUP' (state, immuneGroup) {
            state['Immune Group'] = immuneGroup;
        },
        'ADD_METHYLATION' (state, methylation) {
            state['Methy'] = methylation;
        },
        'ADD_MUTATION' (state, mutation) {
            state['Mut'] = mutation;
        },
        'ADD_PHOSPHO' (state, phospho) {
            state['Phospho'] = phospho;
        },
        'ADD_PROTEIN' (state, protein) {
            state['Protein'] = protein;
        },
        'ADD_RNA' (state, rna) {
            state['mRNA'] = rna;
        },
        'ADD_SELECT_GENE_DATA' (state, selectGeneData) {
            state.selectGeneData = selectGeneData;
        },
        'ADD_SEVEN_P' (state, sevenP) {
            state['7p-CNV'] = sevenP;
        },
        'ADD_STAGE' (state, stage) {
            state['Stage'] = stage;
        },
        'ADD_THREE_P' (state, threeP) {
            state['3p-CNV'] = threeP;
        },
        'ADD_TRANSLOCATION' (state, translocation) {
            state['Chr 2 and 3 translocation'] = translocation
        },
        'API_FAIL' (state, error) {
            console.error(error)
        },
        'EMPTY_FOR_SHADE' (state) {
            let meaningless_arr = [];
            for (let i = 1; i <= 55; i++) {
                meaningless_arr.push({'x': 'a', 'y': 100});
                meaningless_arr.push({'x': 'b', 'y': -100})
            }
            state.emptyForShade = meaningless_arr;
        },
        'FINISHED_LOADING' (state) {
            state.loading = false;
            state.loaded = true;
        },
        'FINISHED_LOADING_EXCEL' (state) {
            state.loaded_excel = true;
        },
        'MAINTAIN_GENE_OBJECT' (state, geneData) {
            state.geneData = geneData;
        },
        'MAINTAIN_SAMPLE_OBJECT' (state, sampleData) {
            state.sampleData = sampleData;
        },
        'START_LOADING' (state) {
            state.loading = true;
            state.loaded = false;
        },
        'START_LOADING_EXCEL' (state) {
            state.loaded_excel = false;
        },
        'SORT_BY_SERIES' (state, { series, ascending }) {
            const dataTypesSamples = ['CCRCC', '3p-CNV', '5q-CNV', '7p-CNV', '14q-CNV', 'Immune Group', 'Grade', 'Stage', 'Gender', 'CIMP', 'Genome Instability', 'Chr 2 and 3 translocation'];
            const dataTypesGenes = ['Methy', 'Mut', 'CNV (lr)', 'CNV (baf)', 'mRNA', 'Protein', 'Phospho'];
            const type = dataTypesSamples.indexOf(series) > -1 ? 'sample' : 'gene';
            // pull gene from series name (eg VHL Mut)
            let gene = '';

            if (type === 'gene') {
                let dat = series.split(' ');
                gene = dat[0];
                series = dat.slice(1,).join(' ');
            }

            // pull series data
            let seriesToSortBy = type === 'sample' ? state[series].slice() : state[series][gene].slice();

            const sortedSeries = ascending ? seriesToSortBy.sort(compare_ascending) : seriesToSortBy.sort(compare_descending);
            const order = sortedSeries.map(el => { return el.x });
             // add sample data
            const ccrcc = orderData(order, state['sampleData']['CCRCC']);
            const threeP = orderData(order, state['sampleData']['3p-CNV']);
            const fiveQ = orderData(order, state['sampleData']['5q-CNV']);
            const sevenP = orderData(order, state['sampleData']['7p-CNV']);
            const fourteenQ = orderData(order, state['sampleData']['14q-CNV']);
            const stage = orderData(order, state['sampleData']['Stage']);
            const grade = orderData(order, state['sampleData']['Grade']);
            const genomic_instability = orderData(order, state['sampleData']['Genome Instability']);
            const cimp = orderData(order, state['sampleData']['CIMP']);
            const immune_group = orderData(order, state['sampleData']['Immune Group']);
            const gender = orderData(order, state['sampleData']['Gender']);
            const translocation = orderData(order, state['sampleData']['Chr 2 and 3 translocation']);

            store.commit('ADD_CCRCC', ccrcc);
            store.commit('ADD_THREE_P', threeP);

            store.commit('ADD_GRADE', grade);
            store.commit('ADD_STAGE', stage);
            store.commit('ADD_GENDER', gender);
            store.commit('ADD_CIMP', cimp);
            store.commit('ADD_GENOMIC_INSTABILITY', genomic_instability);
            store.commit('ADD_IMMUNE_GROUP', immune_group);
            store.commit('ADD_TRANSLOCATION', translocation);

            store.commit('ADD_FIVE_Q', fiveQ);
            store.commit('ADD_SEVEN_P', sevenP);
            store.commit('ADD_FOURTEEN_Q', fourteenQ);

            const mutation = orderData(order, state['geneData']['mutation'], true);
            store.commit('ADD_MUTATION', mutation);

            const methylation = orderData(order, state['geneData']['methylation'], true);
            store.commit('ADD_METHYLATION', methylation);

            const cnv_lr = orderData(order, state['geneData']['cnv_lr'], true);
            store.commit('ADD_CNV_LR', cnv_lr);

            const cnv_baf = orderData(order, state['geneData']['cnv_baf'], true);
            store.commit('ADD_CNV_BAF', cnv_baf);

            const rna = orderData(order, state['geneData']['rna'], true);
            store.commit('ADD_RNA', rna);

            const protein = orderData(order, state['geneData']['protein'], true);
            store.commit('ADD_PROTEIN', protein);

            const phospho = orderData(order, state['geneData']['phospho'], true);
            store.commit('ADD_PHOSPHO', phospho);
            // dataTypesSamples.forEach((dt) => {
            //     let sampleSortedData = state[dt].slice().sort(sortBySample(order));
            //     Vue.set(state, dt, sampleSortedData);
            // });
            //
            // // sort gene data
            // dataTypesGenes.forEach((dt) => {
            //     for (let gene in state[dt]) {
            //         let geneSortedData = state[dt][gene].slice().sort(sortBySample(order));
            //         Vue.set(state[dt], gene, geneSortedData);
            //     }
            // });
        },
        'UPDATE_DISPLAY_DATA' (state, displayData) {
            state.displayData = displayData;
        },
        'UPDATE_HISTOLOGY_LINKS' (state, sample) {
            state.histologyDisplay = state.histology[sample]
        },
    },
    actions: {
        displayData (store, displayData) {
            if (displayData.value === null) {
                displayData.value = 'NaN'
            }
            const sample = displayData.sample;

            store.commit('UPDATE_DISPLAY_DATA', displayData);
            store.commit('UPDATE_HISTOLOGY_LINKS', sample);

        },
        downloadGeneData (store, geneInput) { // actual data for display and excel download
            store.commit('START_LOADING_EXCEL');
            const { genes } = geneInput;

            api.post('download_gene_data/', { genes })
                .then(
                    response => {
                        const selectGeneData = response.body;
                        store.commit(
                            'ADD_SELECT_GENE_DATA',
                            {
                                'params': selectGeneData['params'],
                                'data': selectGeneData['data']
                            }
                        );
                    }
                )
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                );

            store.commit('FINISHED_LOADING_EXCEL');
        },
        loadFirstData (store) {
            store.commit('EMPTY_FOR_SHADE');

            api.get('load_first_data/')
                .then(response => {
                    store.commit('ADD_HISTOLOGY_DATA', JSON.parse(response.body['histology']))
                })
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                )
        },
        sortBySeries (store, sortData) {
            store.commit('SORT_BY_SERIES', sortData)
        },
        submitGenes (store, geneInput) {
            store.commit('START_LOADING');

            const { genes } = geneInput;
            store.commit('ADD_GENE_LIST', genes);

            api.post('submit_genes/', { genes })
                .then(
                    response => {
                        const res = JSON.parse(response.bodyText);
                        let parsed_res = {};
                        for (let dataType in res) {
                            parsed_res[dataType] = JSON.parse(res[dataType])
                        }

                        const originalOrder =
                            ['CPT0014450004', 'CPT0024670003', 'CPT0009000003', 'CPT0014370004', 'CPT0019130003', 'CPT0025110003', 'CPT0012900004', 'CPT0079480003', 'CPT0012370003', 'CPT0026410003', 'CPT0065810003', 'CPT0077490003', 'CPT0006630003', 'CPT0079270003', 'CPT0009060003', 'CPT0025230003', 'CPT0064370003', 'CPT0085670003', 'CPT0019990003', 'CPT0007860003', 'CPT0088630003', 'CPT0088900003', 'CPT0086870003', 'CPT0081600003', 'CPT0001540009', 'CPT0092290003', 'CPT0092790003', 'CPT0025880003', 'CPT0011240003', 'CPT0021240003', 'CPT0092160003', 'CPT0012670003', 'CPT0075720003', 'CPT0065690003', 'CPT0001340003', 'CPT0086820003', 'CPT0015730003', 'CPT0007320003', 'CPT0075130003', 'CPT0015810003', 'CPT0012280003', 'CPT0065430003', 'CPT0079410003', 'CPT0075560003', 'CPT0006440003', 'CPT0025580004', 'CPT0077310003', 'CPT0006900003', 'CPT0001500009', 'CPT0078830003', 'CPT0010160003', 'CPT0000780007', 'CPT0086030003', 'CPT0000640003', 'CPT0078930003', 'CPT0078990003', 'CPT0078510003', 'CPT0087040003', 'CPT0001180009', 'CPT0014160003', 'CPT0069000003', 'CPT0017410003', 'CPT0063320003', 'CPT0000870016', 'CPT0025290003', 'CPT0001220008', 'CPT0025350003', 'CPT0088690003', 'CPT0023690003', 'CPT0065870003', 'CPT0002350011', 'CPT0020120003', 'CPT0012180003', 'CPT0086360003', 'CPT0063630003', 'CPT0077110003', 'CPT0066470004', 'CPT0012080003', 'CPT0065750003', 'CPT0081990003', 'CPT0088480003', 'CPT0079380003', 'CPT0066480003', 'CPT0025170003', 'CPT0089020003', 'CPT0071150004', 'CPT0089460004', 'CPT0025050003', 'CPT0015910003', 'CPT0076330003', 'CPT0092730003', 'CPT0010110003', 'CPT0001260009', 'CPT0081880003', 'CPT0084560003', 'CPT0012550003', 'CPT0079230003', 'CPT0065930003', 'CPT0088760003', 'CPT0023350003', 'CPT0086950003', 'CPT0069160003', 'CPT0088550004', 'CPT0017850003', 'CPT0078800003', 'CPT0078660003', 'CPT0002270011', 'CPT0079180003', 'CPT0088970003', 'CPT0011410003']

                        const geneDetails = parsed_res['gene_details'];
                        store.commit('ADD_GENE_DETAILS', geneDetails);
                        const sampleData = parsed_res['sample_data'];
                        // add sample data
                        const ccrcc = orderData(originalOrder, sampleData['CCRCC']);
                        const threeP = orderData(originalOrder, sampleData['3p-CNV']);
                        const fiveQ = orderData(originalOrder, sampleData['5q-CNV']);
                        const sevenP = orderData(originalOrder, sampleData['7p-CNV']);
                        const fourteenQ = orderData(originalOrder, sampleData['14q-CNV']);
                        const stage = orderData(originalOrder, sampleData['Stage']);
                        const grade = orderData(originalOrder, sampleData['Grade']);
                        const genomic_instability = orderData(originalOrder, sampleData['Genome Instability']);
                        const cimp = orderData(originalOrder, sampleData['CIMP']);
                        const immune_group = orderData(originalOrder, sampleData['Immune Group']);
                        const gender = orderData(originalOrder, sampleData['Gender']);
                        const translocation = orderData(originalOrder, sampleData['Chr 2 and 3 translocation']);

                        store.commit('ADD_CCRCC', ccrcc);
                        store.commit('ADD_THREE_P', threeP);

                        store.commit('ADD_GRADE', grade);
                        store.commit('ADD_STAGE', stage);
                        store.commit('ADD_GENDER', gender);
                        store.commit('ADD_CIMP', cimp);
                        store.commit('ADD_GENOMIC_INSTABILITY', genomic_instability);
                        store.commit('ADD_IMMUNE_GROUP', immune_group);
                        store.commit('ADD_TRANSLOCATION', translocation);

                        store.commit('ADD_FIVE_Q', fiveQ);
                        store.commit('ADD_SEVEN_P', sevenP);
                        store.commit('ADD_FOURTEEN_Q', fourteenQ);

                        store.commit('MAINTAIN_SAMPLE_OBJECT', sampleData);
                        store.commit('MAINTAIN_GENE_OBJECT', parsed_res);

                        // add gene data
                        const mutation = orderData(originalOrder, parsed_res['mutation'], true);
                        store.commit('ADD_MUTATION', mutation);

                        const methylation = orderData(originalOrder, parsed_res['methylation'], true);
                        store.commit('ADD_METHYLATION', methylation);

                        const cnv_lr = orderData(originalOrder, parsed_res['cnv_lr'], true);
                        store.commit('ADD_CNV_LR', cnv_lr);

                        const cnv_baf = orderData(originalOrder, parsed_res['cnv_baf'], true);
                        store.commit('ADD_CNV_BAF', cnv_baf);

                        const rna = orderData(originalOrder, parsed_res['rna'], true);
                        store.commit('ADD_RNA', rna);

                        const protein = orderData(originalOrder, parsed_res['protein'], true);
                        store.commit('ADD_PROTEIN', protein);

                        const phospho = orderData(originalOrder, parsed_res['phospho'], true);
                        store.commit('ADD_PHOSPHO', phospho);

                        store.commit('FINISHED_LOADING');
                    }
                )
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                )
        }
    }
});

function compare_ascending (a,b) {
  if (a.y < b.y)
    return -1;
  if (a.y > b.y)
    return 1;
  return 0;
}

function compare_descending (a,b) {
  if (a.y > b.y)
    return -1;
  if (a.y < b.y)
    return 1;
  return 0;
}

function sortBySample (sortOrder) {
    return function (a, b) {
        return sortOrder.indexOf(a.x) - sortOrder.indexOf(b.x);
    }
}

function orderData (order, obj, gene_type = false) {
    if (gene_type) {
        let gene_data = {};
        for (let gene in obj) {
            gene_data[gene] = order.map((sample) => {
                return {x: sample, y: obj[gene][sample]}
            });
        }
        return gene_data
    }

    return order.map((sample) => {
        return {x: sample, y: obj[sample]}
    });
}

export default store;
