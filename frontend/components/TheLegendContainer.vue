<template>
    <div class="the-legend-container">
      <ul id="legend-categories" class="legend-categories">
        <li v-for="(elements, category) in categories">
          <legend-category :category="category" :elements="elements"/>
        </li>
      </ul>
      <ul id="legend-categories-horizontal" class="legend-categories">
        <li v-for="(elements, category) in categoriesHorizontal">
          <legend-category-horizontal :category="category" :elements="elements"/>
        </li>
      </ul>
    </div>
</template>

<script>
import LegendCategory from './LegendCategory.vue';
import LegendCategoryHorizontal from './LegendCategoryHorizontal.vue';

export default {
  name: 'the-legend-container',
  components: {
    LegendCategory,
    LegendCategoryHorizontal,
  },
  data() {
    return {
      categoriesHorizontal: {
        'Proteo/Phospho/RNA/Methyl Z-Score': [
          ['0.0', '#00004d'],
          ['0.1', '#004c99'],
          ['0.2', '#0080ff'],
          ['0.3', '#66b2ff'],
          ['0.4', '#99ccff'],
          ['0.5', '#ffffff'],
          ['0.6', '#ffcccc'],
          ['0.7', '#ff6666'],
          ['0.8', '#ff3333'],
          ['0.9', '#ff0000'],
          ['1.0', '#990000'],
        ],
        Missing: [
          ['', '#ffffff'],
        ],
      },
      categories: {
        'Mutation': [
          ['Wild type', '#d3d3d3'],
          ['Mutant', '#0c08c9'],
        ],
        'Gender': [
          ['Male', '#363ab0'],
          ['Female', '#f26522'],
        ],
        'Smoking history': [['Lifelong non-smoker: Less than 100 cigarettes smoked in lifetime', '#7FC97F'], ['Current reformed smoker within past 15 years', '#d4d417'], ['Current reformed smoker, more than 15 years', '#F0027F'], ['Current reformed smoker, years unknown', '#b09021'], ['Current smoker: Includes daily and non-daily smokers', '#4cb6ff'], ['Smoking history not available', '#800080']],
        'Tumor location': [['Lip', '#FF89B0'], ['epiglottis', '#7CA4E8'], ['Tonsil', '#DBCBF1'], ['Floor of mouth', '#FFD9BB'], ['Hypopharynx', '#FA8F61'], ['Pyrifrom sinus', '#FFFFC3'], ['Oropharynx', '#9CE59C'], ['Larynx', '#A0A0A0'], ['Tongue', '#468189'], ['Alveolar ridge', '#8EF9F3'], ['Oral cavity', '#BF1A2F'], ['Buccal mucosa', '#755B69'], ['Base of tongue', '#379634']],
        'HPV inference': [['NO', '#d3d3d3'], ['YES', '#0c08c9']]
      },
    };
  },
  computed: {
    // loaded () {
    //     return this.$store.state.loaded;
    // },
    // loading () {
    //     return this.$store.state.loading;
    // },
  },
};
</script>

<style scoped>
  .the-legend-container {
      width: 20%;
      height: 100%;
  }

  ul {
    margin: 0;
    padding: 10px;
    list-style: none;
  }
</style>
