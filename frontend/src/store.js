/* eslint-disable no-trailing-spaces */
import Vue from 'vue'
import Vuex from 'vuex'

import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        CCRCC: [],
        cimp: [],
        'CNV (baf)': {},
        'CNV (lr)': {},
        displayData: {
            series: '',
            sample: '',
            value: ''
        },
        '5q': [],
        '14q': [],
        genes: [],
        grade: [],
        loaded: false,
        loaded_excel: false,
        loading: false,
        'Methy': {},
        'Mut': {},
        'Phospho': {},
        'Protein': {},
        'mRNA': [],
        selectGeneData: {'data': [], 'params': {}},
        '7p': [],
        stage: [],
        '3p': [],
    },
    mutations: {
        'ADD_CCRCC' (state, ccrcc) {
            state['CCRCC'] = ccrcc;
        },
        'ADD_CIMP' (state, cimp) {
            state.cimp = cimp;
        },
        'ADD_CNV_BAF' (state, cnv_baf) {
            state['CNV (baf)'] = cnv_baf;
        },
        'ADD_CNV_LR' (state, cnv_lr) {
            state['CNV (lr)'] = cnv_lr;
        },
        'ADD_FIVE_Q' (state, fiveQ) {
            state['5q'] = fiveQ;
        },
        'ADD_FOURTEEN_Q' (state, fourteenQ) {
            state['14q'] = fourteenQ;
        },
        'ADD_GENE_LIST' (state, genes) {
            state.genes = genes
        },
        'ADD_GRADE' (state, grade) {
            state.grade = grade;
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
            state['7p'] = sevenP;
        },
        'ADD_STAGE' (state, stage) {
            state.stage = stage;
        },
        'ADD_THREE_P' (state, threeP) {
            state['3p'] = threeP;
        },
        'API_FAIL' (state, error) {
            console.error(error)
        },
        'FINISHED_LOADING' (state) {
            state.loading = false;
            state.loaded = true;
        },
        'FINISHED_LOADING_EXCEL' (state) {
            state.loaded_excel = true;
        },
        'START_LOADING' (state) {
            state.loading = true;
            state.loaded = false;
        },
        'START_LOADING_EXCEL' (state) {
            state.loaded_excel = false;
        },
        'SORT_BY_SERIES' (state, { series, type, ascending }) {
            // sort the sample data
            // const dataTypes = {
            //     '14q': 'fourteenQ',
            //     '7p': 'sevenP',
            //     '5q': 'fiveQ',
            //     '3p': 'threeP',
            //     'ccrcc': 'ccrcc'
            // };
            // const label = dataTypes[series];
            let gene = '';
            if (type === 'gene') {
                let dat = series.split(' ')
                gene = dat[0];
                series = dat.slice(1,).join(' ')
            }
            const dataTypesSamples = ['CCRCC', '3p', '5q', '7p', '14q'];
            const dataTypesGenes = ['Methy', 'Mut'];
            let seriesToSortBy = type === 'sample' ? state[series] : state[series][gene];
            // console.log(seriesToSortBy)
            //
            if (type === 'gene') {
                seriesToSortBy = normalizeGeneData(seriesToSortBy)
            }

            const sortedSeries = ascending ? seriesToSortBy.sort(compare_ascending) : seriesToSortBy.sort(compare_descending);
            const order = sortedSeries.map(el => { return el.x });
            // console.log(series, order)
            // console.log(series, sortedSeries)

            dataTypesSamples.forEach((dt) => {
                if (dt !== series) {
                    state[dt].sort(sortBySample(order));
                }
            });

            // sort gene data
            dataTypesGenes.forEach((dt) => {
                // if (dt !== series) {
                for (let gene in state[dt]) {
                    let sortable = normalizeGeneData(state[dt][gene]);
                    // const sorted = sortable.sort(sortBySampleGene(order));
                    // console.log(dt, gene)
                    // console.log(sorted)
                    state[dt][gene] = sorted;
                    // Vue.set(state[dt], gene, sorted );
                }
                    // state[dt].sort(sortBySample(order));
                // }
            });
        },
        'UPDATE_DISPLAY_DATA' (state, displayData) {
            state.displayData = displayData;
        }
    },
    actions: {
        displayData (store, displayData) {
            store.commit('UPDATE_DISPLAY_DATA', displayData)
        },
        downloadGeneData (store, geneInput) {
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
                        const res = JSON.parse(response.body['sample_data']);

                        const ccrcc = convertToArrayOfObjects(res['ccrcc']);
                        const threeP = convertToArrayOfObjects(res['3p']);

                        const fiveQ = convertToArrayOfObjects(res['5q']);
                        const sevenP = convertToArrayOfObjects(res['7p']);
                        const fourteenQ = convertToArrayOfObjects(res['14q']);

                        const grade = convertToArrayOfObjects(res['grade']);
                        const stage = convertToArrayOfObjects(res['stage']);
                        const cimp = convertToArrayOfObjects(res['cimp']);

                        store.commit('ADD_CCRCC', ccrcc);
                        store.commit('ADD_THREE_P', threeP);

                        store.commit('ADD_GRADE', grade);
                        store.commit('ADD_STAGE', stage);
                        store.commit('ADD_CIMP', cimp);

                        store.commit('ADD_FIVE_Q', fiveQ);
                        store.commit('ADD_SEVEN_P', sevenP);
                        store.commit('ADD_FOURTEEN_Q', fourteenQ);

                        const mutation = JSON.parse(response.body['mutation']);
                        store.commit('ADD_MUTATION', mutation);

                        const methylation = JSON.parse(response.body['methylation']);
                        store.commit('ADD_METHYLATION', methylation);

                        const cnv_lr = JSON.parse(response.body['cnv_lr']);
                        store.commit('ADD_CNV_LR', cnv_lr);

                        const cnv_baf = JSON.parse(response.body['cnv_baf']);
                        store.commit('ADD_CNV_BAF', cnv_baf);

                        const rna = JSON.parse(response.body['rna']);
                        store.commit('ADD_RNA', rna);

                        const protein = JSON.parse(response.body['protein']);
                        store.commit('ADD_PROTEIN', protein);

                        const phospho = JSON.parse(response.body['phospho']);
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

function convertToArrayOfObjects (obj) {
    let arrayOfObjects = [];
    Object.keys(obj).forEach((k) => {
        arrayOfObjects.push(
            {x: k, y: obj[k]}
        )
    });
    return arrayOfObjects;
}

// function removeElementsByClassName (className) {
//     document.querySelectorAll(className).forEach((a) => {
//         a.remove()
//     })
// }

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

function sortBySampleGene (sortOrder) {
    return function (a, b) {
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    }
}

function normalizeGeneData(obj) {
    let temp = [];
    for (let k in obj) {
        temp.push({x: k, y: obj[k]})
    }
    return temp
}

function revertGeneData (arr) {
    let temp = {};
    arr.forEach(el => {
        temp[el.x] = el.y
    })
    return temp;
}
export default store;
