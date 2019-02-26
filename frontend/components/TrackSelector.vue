<template>
    <div class="track-selector">
        <div v-for="(val, dataType) in selected">
            <div class="track-selector-checkbox" >
                <input type="checkbox" :id="dataType" :value="dataType" v-model="selected[dataType]">
                <label :for="dataType"><span>{{ dataType }}</span></label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "track-selector",
        computed: {
            selected() {
                return this.$store.state.displayDataTypes;
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
