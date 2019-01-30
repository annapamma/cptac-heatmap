<template>
    <div class="track-selector-checkbox">
        <input type="checkbox" id="dataType" value="dataType" v-model="selected">
        <label for="dataType"><span>{{ dataType }}</span></label>
    </div>
</template>

<script>
    export default {
        name: "track-selector-checkbox",
        props: ['dataType'],
        data() {
            return {
                selected: true,
                removed: [],
            }
        },
        watch: {
            selected () {
                // order tracks
                let tracks = document.getElementsByClassName(`apexcharts-heatmap-series`);

                for (let track of tracks) {
                    let classes = track.className
                    console.log(classes)
                    let dataTypeClass = classes.indexOf(this.dataType);
                    if (dataTypeClass) {
                        console.log(track);
                        let removedTrack = classes.splice(dataTypeClass, 1);
                        this.removed.push(removedTrack);
                    }
                }

                console.log(this.removed);
                // let relevantLabels = document.getElementsByClassName(`apexcharts-yaxis-label`);
                //
                // for (let track of relevantTracks) {
                //     track.style.display = "none"
                // }
                //
                // for (let label of relevantLabels) {
                //     if (label.textContent === this.dataType) {
                //         // const visibility = label.getAttribute("visibility");
                //         // const updatedVisibility = !visibility || visibility === "visible" ? "hidden" : "visible";
                //         let updatedVisibility = "none";
                //         label.setAttribute("display", updatedVisibility);
                //     }
                // }
            }
        }
    }
</script>

<style scoped>

</style>
