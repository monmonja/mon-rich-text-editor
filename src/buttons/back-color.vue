<template>
    <li @click="showBackColorToolbar"  class="icon-button">
        <i class="material-icons icon">format_paint</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'BackColor'
    })
    export default class BackColor extends Vue {
        @Prop({ required: true }) readonly setActiveToolbar: Function

        public showBackColorToolbar () : void {
            this.setActiveToolbar('back-color')
        }

    }
</script>