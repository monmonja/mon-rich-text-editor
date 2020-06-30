<template>
    <li @click="showForeColorToolbar"  class="icon-button">
        <i class="material-icons icon">text_format</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'ForeColor'
    })
    export default class ForeColor extends Vue {
        @Prop({ required: true }) readonly setActiveToolbar: Function

        public showForeColorToolbar () : void {
            this.setActiveToolbar('fore-color');
        }

    }
</script>