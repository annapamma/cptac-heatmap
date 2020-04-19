<template>
    <div class="the-legend-container">
      <ul id="legend-categories-horizontal" class="legend-categories">
        <li v-for="(elements, category) in categoriesHorizontal">
          <legend-category-horizontal :category="category" :elements="elements"/>
        </li>
      </ul>
      <ul id="legend-categories" class="legend-categories">
        <li v-for="(elements, category) in categories">
          <legend-category :category="category" :elements="elements"/>
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
          ['-3', '#00004d'],
          ['-2', '#0066cc'],
          ['-1', '#82b6ff'],
          ['0', '#E8E8E8'],
          ['1', '#ff7777'],
          ['2', '#ff1111'],
          ['3', '#990000'],
        ],
          'CNV (lr)': [
          ['(-inf, -0.5]', '#00004d'],
          ['(-0.5, -0.2]', '#82b6ff'],
          ['(-0.2, 0.2]', '#E8E8E8'],
          ['(0.2, 0.5]', '#ff7777'],
          ['(0.5, +inf)', '#990000'],
        ],
        Missing: [
          ['', '#ffffff'],
        ],
      },
      categories: {
        'Stage/Grade': [
          ['I', '#1fc600'],
          ['II', '#089000'],
          ['III', '#0a5d00'],
          ['IV', '#063b00'],
        ],
        'Mutation': [
          ['No', '#E8E8E8'],
          ['Yes', '#003366'],
        ],
       'CCRCC': [
          ['No', '#E8E8E8'],
          ['Yes', '#003366'],
        ],
      'Immune Group': [
          ['Metabolic immune-desert', '#98f367'],
          ['VEGF immune-desert', '#ffa500'],
          ['CD8- inflamed', '#9ecae3'],
          ['CD8+ inflamed', '#cc0000'],
        ],
      'Gender': [
          ['Male', '#57d440'],
          ['Female', '#446c40'],
        ],
      't(3;2)/t(3;5)/Genome instability/CIMP': [
          ['Negative', '#ececec'],
          ['Positive', '#cc0000'],
        ],
      '3p/5q/7p/9p/14q-CNV': [
          ['Loss', '#003366'],
          ['LR neutral LOH', '#c2e2ec'],
          ['LR neutral', '#E8E8E8'],
          ['LR amplification', '#d94040'],
        ],

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
