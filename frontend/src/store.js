import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const store = new Vuex.Store({
    state: {
        geneList: 'OOGIIIIIEEE',
        grade: []
    },
    mutations: {
        'ADD_GRADE' (state, grade) {
            state.grade = grade;
        },
        'API_FAIL' (state, error) {
            console.error(error)
        }
    },
    actions: {
        submitGenes () {
            api.post('submit_genes/', {'genes': ['boop', 'boop']})
                .then(
                    response => {
                        const res = JSON.parse(response.body);
                        const grade = convertToArrayOfObjects(res['grade']);
                        store.commit('ADD_GRADE', grade);
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
