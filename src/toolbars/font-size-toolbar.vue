<template>
    <ul >
        <li>
            <input type="text" placeholder="16px" v-model="fontSize"/>
            <button type="button" class="btn btn-small btn-inline" @click="changeFontSize"  >Apply</button>
            <button type="button" class="btn btn-small btn-inline" @click="setActiveToolbar('main')"  >Cancel</button>
        </li>
    </ul>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component, Mixins  } from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'FontSizeToolbar',
        mixins: [SelectionMixin]
    })
    export default class FontSizeToolbar extends Mixins(SelectionMixin) {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private fontSize: string = ''

        public changeFontSize () : void {
            let selectedHtml = this.getSelectedHtml(this.iframe);
            let html = `<div style="font-size: ${this.fontSize};">${selectedHtml}</div>`
            this.iframe.contentWindow.document.execCommand('insertHTML', false, html);

            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    let currentNode = this.getCurrentNode(this.iframe);
                    this.fontSize = this.iframe.contentWindow.getComputedStyle(currentNode, null)['fontSize'];
                }
            });
        }


    }
</script>