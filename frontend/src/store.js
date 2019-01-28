/* eslint-disable no-trailing-spaces,camelcase */
import Vue from 'vue'
import Vuex from 'vuex'

import api from './api.js'
import initialStore from './initialStore.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        'CCRCC': [],
        'CIMP': [],
        'CNV (baf)': {},
        'CNV (lr)': {},
        'CNV subtype': [],
        displayData: {
            series: '',
            sample: '',
            value: ''
        },
        '3p-CNV': [],
        '5q-CNV': [],
        '7p-CNV': [],
        '14q-CNV': [],
        'Gender': [],
        geneData: {},
        geneDetails: {},
        genes: [],
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
        'Stage': [],
        't(3;2)': [],
        't(3;5)': [],
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
        'ADD_CNV_SUBTYPE' (state, cnv_subtype) {
            state['CNV subtype'] = cnv_subtype
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
        'ADD_TRANSLOCATION_3_2' (state, translocation_3_2) {
            state['t(3;2)'] = translocation_3_2
        },
        'ADD_TRANSLOCATION_3_5' (state, translocation_3_5) {
            state['t(3;5)'] = translocation_3_5
        },
        'API_FAIL' (state, error) {
            console.error(error)
        },
        'ASSIGN_INITIAL_STORE' (state, error) {
            Object.assign(state, initialStore);

            console.log(initialStore)
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
            const dataTypesSamples = ['CCRCC', '3p-CNV', '5q-CNV', '7p-CNV', '14q-CNV', 'Immune Group', 'Grade', 'Stage', 'Gender', 'CIMP', 'CNV subtype', 't(3;2)', 't(3;5)'];
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
            const cimp = orderData(order, state['sampleData']['CIMP']);
            const immune_group = orderData(order, state['sampleData']['Immune Group']);
            const gender = orderData(order, state['sampleData']['Gender']);
            const translocation_3_2 = orderData(order, state['sampleData']['t(3;2)']);
            const translocation_3_5 = orderData(order, state['sampleData']['t(3;5)']);
            const cnv_subtype = orderData(order, state['sampleData']['CNV subtype']);

            store.commit('ADD_CCRCC', ccrcc);
            store.commit('ADD_THREE_P', threeP);

            store.commit('ADD_GRADE', grade);
            store.commit('ADD_STAGE', stage);
            store.commit('ADD_GENDER', gender);
            store.commit('ADD_CIMP', cimp);
            store.commit('ADD_IMMUNE_GROUP', immune_group);
            store.commit('ADD_TRANSLOCATION_3_2', translocation_3_2);
            store.commit('ADD_TRANSLOCATION_3_5', translocation_3_5);
            store.commit('ADD_CNV_SUBTYPE', cnv_subtype);

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
        assignInitialStore (store) {
            store.commit('ASSIGN_INITIAL_STORE');
        },
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
                            ['C3N-00242', 'C3L-00079', 'C3N-00852', 'C3N-00310', 'C3N-00244', 'C3L-00583', 'C3L-00610', 'C3N-00494', 'C3L-01281', 'C3N-00320', 'C3N-00154', 'C3L-00791', 'C3L-00814', 'C3N-01261', 'C3L-00418', 'C3L-00606', 'C3N-00312', 'C3L-00799', 'C3L-00907', 'C3L-01557', 'C3N-00168', 'C3L-00910', 'C3N-01649', 'C3N-01179', 'C3L-01836', 'C3N-00148', 'C3L-00004', 'C3L-01861', 'C3L-01885', 'C3N-00733', 'C3N-00305', 'C3N-00380', 'C3L-01607', 'C3N-00491', 'C3N-01213', 'C3L-00790', 'C3L-00011', 'C3L-01313', 'C3L-00792', 'C3L-00581', 'C3N-01200', 'C3L-00813', 'C3N-00317', 'C3N-00953', 'C3L-01287', 'C3N-01214', 'C3L-00369', 'C3N-00246', 'C3N-01524', 'C3L-00447', 'C3L-00026', 'C3N-00834', 'C3L-00448', 'C3L-00097', 'C3L-01560', 'C3L-00103', 'C3N-01176', 'C3N-01178', 'C3L-00561', 'C3N-00495', 'C3L-01603', 'C3L-00096', 'C3N-00194', 'C3N-00573', 'C3N-00390', 'C3L-00902', 'C3L-00088', 'C3L-00800', 'C3L-00010', 'C3L-00812', 'C3N-01651', 'C3L-00917', 'C3L-00817', 'C3L-00360', 'C3N-00177', 'C3N-00315', 'C3L-00908', 'C3L-01302', 'C3N-01522', 'C3L-00183', 'C3N-00314', 'C3L-00796', 'C3N-00646', 'C3N-01646', 'C3L-01283', 'C3N-00150', 'C3L-00766', 'C3N-00831', 'C3L-01352', 'C3N-01808', 'C3L-00607', 'C3L-00765', 'C3N-01220', 'C3L-01882', 'C3L-00416', 'C3N-00149', 'C3N-00437', 'C3L-01288', 'C3L-01553', 'C3N-01361', 'C3L-01286', 'C3N-00577', 'C3N-01648', 'C3N-00435', 'C3N-00832', 'C3N-01175', 'C3L-00359', 'C3N-00492', 'C3N-01180', 'C3N-00313']

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
                        const cimp = orderData(originalOrder, sampleData['CIMP']);
                        const immune_group = orderData(originalOrder, sampleData['Immune Group']);
                        const gender = orderData(originalOrder, sampleData['Gender']);
                        const translocation_3_2 = orderData(originalOrder, sampleData['t(3;2)']);
                        const translocation_3_5 = orderData(originalOrder, sampleData['t(3;5)']);
                        const cnv_subtype = orderData(originalOrder, sampleData['CNV subtype']);

                        store.commit('ADD_CCRCC', ccrcc);
                        store.commit('ADD_THREE_P', threeP);

                        store.commit('ADD_GRADE', grade);
                        store.commit('ADD_STAGE', stage);
                        store.commit('ADD_GENDER', gender);
                        store.commit('ADD_CIMP', cimp);
                        store.commit('ADD_IMMUNE_GROUP', immune_group);
                        store.commit('ADD_TRANSLOCATION_3_2', translocation_3_2);
                        store.commit('ADD_TRANSLOCATION_3_5', translocation_3_5);
                        store.commit('ADD_CNV_SUBTYPE', cnv_subtype);

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
