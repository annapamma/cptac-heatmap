/* eslint-disable no-trailing-spaces */
import Vue from 'vue'
import Vuex from 'vuex'

import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        ccrcc: [],
        cimp: [],
        cnv_baf: {},
        cnv_lr: {},
        fiveQ: [],
        fourteenQ: [],
        genes: [],
        grade: [],
        loaded: false,
        loading: false,
        methylation: {},
        mutation: {},
        phospho: {},
        rna: [],
        selectGeneData: {'data': [], 'params': {}},
        sevenP: [],
        stage: [],
        threeP: [],
        test_json_to_excel:[
            {"VHL mRNA":0.6463432581,
                "VHL Phospho":null,"VHL Methy":-0.3959340441,"VHL Protein":null,"VHL CNV (baf)":0.1152,"VHL Mut":1.0,"VHL CNV (lr)":-0.584305}]
    },
    mutations: {
        'ADD_CCRCC' (state, ccrcc) {
            state.ccrcc = ccrcc;
        },
        'ADD_CIMP' (state, cimp) {
            state.cimp = cimp;
        },
        'ADD_CNV_BAF' (state, cnv_baf) {
            state.cnv_baf = cnv_baf;
        },
        'ADD_CNV_LR' (state, cnv_lr) {
            state.cnv_lr = cnv_lr;
        },
        'ADD_FIVE_Q' (state, fiveQ) {
            state.fiveQ = fiveQ;
        },
        'ADD_FOURTEEN_Q' (state, fourteenQ) {
            state.fourteenQ = fourteenQ;
        },
        'ADD_GENE_LIST' (state, genes) {
            state.genes = genes
        },
        'ADD_GRADE' (state, grade) {
            state.grade = grade;
        },
        'ADD_METHYLATION' (state, methylation) {
            state.methylation = methylation;
        },
        'ADD_MUTATION' (state, mutation) {
            state.mutation = mutation;
        },
        'ADD_PHOSPHO' (state, phospho) {
            state.phospho = phospho;
        },
        'ADD_PROTEIN' (state, protein) {
            state.protein = protein;
        },
        'ADD_RNA' (state, rna) {
            state.rna = rna;
        },
        'ADD_SELECT_GENE_DATA' (state, selectGeneData) {
            state.selectGeneData = selectGeneData;
        },
        'ADD_SEVEN_P' (state, sevenP) {
            state.sevenP = sevenP;
        },
        'ADD_STAGE' (state, stage) {
            state.stage = stage;
        },
        'ADD_THREE_P' (state, threeP) {
            state.threeP = threeP;
        },
        'API_FAIL' (state, error) {
            console.error(error)
        },
        'FINISHED_LOADING' (state) {
            state.loading = false;
            state.loaded = true;
        },
        'START_LOADING' (state) {
            state.loading = true;
            state.loaded = false;
        }
    },
    actions: {
        downloadGeneData (store, geneInput) {
            const { genes } = geneInput;

            api.post('download_gene_data/', { genes })
                .then(
                    response => {
                        console.log(response);
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
                )
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

function removeElementsByClassName (className) {
    document.querySelectorAll(className).forEach((a) => {
        a.remove()
    })
}

export default store;
