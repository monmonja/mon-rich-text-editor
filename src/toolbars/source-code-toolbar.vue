<template>
    <ul >
        <li @click="showMainContent" class="text-button">
            Show WYSIWYG
        </li>
    </ul>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'SourceCodeToolbar'
    })
    export default class SourceCodeToolbar extends Vue {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function
        @Prop({ required: true }) readonly setActivePanel: Function


        public showMainContent () : void {
            this.setActivePanel('main');
            this.setActiveToolbar('main');
        }

    }
</script>