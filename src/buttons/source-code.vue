<template>
    <li @click="viewSourceCode" class="icon-button">
        <i class="material-icons icon">code</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'
    declare var openFileManagerComponent;

    @Component({
        name: 'SourceCode'
    })
    export default class SourceCode extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly componentEl:HTMLElement
        @Prop({ required: true }) readonly setActivePanel:Function
        @Prop({ required: true }) readonly setActiveToolbar:Function

        public viewSourceCode () : void {
            this.setActiveToolbar('source-code');
            this.setActivePanel('source-code');
            let textArea = this.componentEl.getElementsByClassName('source-code')[0] as HTMLElement;
            textArea.focus();
        }
    }
</script>