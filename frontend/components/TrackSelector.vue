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
        computed: {
            displayDataTypes() {
                return this.$store.state.displayDataTypes
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
        width: 100%;
    }
</style>
