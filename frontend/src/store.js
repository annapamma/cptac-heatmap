import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        ccrcc: [],
        cimp: [],
        geneList: '',
        grade: [],
        stage: [],
        threeP: []
    },
    mutations: {
        'ADD_CCRCC' (state, ccrcc) {
            state.ccrcc = ccrcc;
        },
        'ADD_CIMP' (state, cimp) {
            state.cimp = cimp;
        },
        'ADD_GRADE' (state, grade) {
            state.grade = grade;
        },
        'ADD_STAGE' (state, stage) {
            state.stage = stage;
        },
        'ADD_THREE_P' (state, threeP) {
            state.threeP = threeP;
        },
        'API_FAIL' (state, error) {
            console.error(error)
        }
    },
    actions: {
        submitGenes () {
            api.post('submit_genes/', {'genes': []})
                .then(
                    response => {
                        const res = JSON.parse(response.body);
                        console.log(res)
                        const grade = convertToArrayOfObjects(res['grade']);
                        const stage = convertToArrayOfObjects(res['stage']);
                        const ccrcc = convertToArrayOfObjects(res['ccrcc']);
                        const cimp = convertToArrayOfObjects(res['cimp']);
                        const threeP = convertToArrayOfObjects(res['3p']);
                        store.commit('ADD_GRADE', grade);
                        store.commit('ADD_STAGE', stage);
                        store.commit('ADD_CCRCC', ccrcc);
                        store.commit('ADD_CIMP', cimp);
                        store.commit('ADD_THREE_P', threeP);
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

export default store;
