<template>
    <div class="track-selector">
        <div v-for="(val, dataType) in displayDataTypes">
            <div class="track-selector-checkbox" >
                <input type="checkbox" :id="dataType" :value="dataType" v-model="displayDataTypes[dataType]">
                <label :for="dataType"><span>{{ dataType }}</span></label>
            </div>
        </div>
        <button @click="redraw">Redraw</button>
    </div>
</template>

<script>
    export default {
        name: "track-selector",
        data() {
            return {
                displayDataTypes: {
                    'Phospho': true,
                    'Protein': true,
                    'mRNA': true,
                    'CNV (baf)': true,
                    'CNV (lr)': true,
                    'Methy': true,
                    'Mut': true
                }
            }
        },
        methods: {
            redraw() {
                this.$store.dispatch('updateDisplayDataTypes', this.displayDataTypes)
            }
        }
    }
</script>

<style scoped>
    .track-selector-checkbox {
        display: flex;
        flex-direction: row;
        font-family: "Times New Roman", Times, serif;
        width: 100%;
    }
</style>
