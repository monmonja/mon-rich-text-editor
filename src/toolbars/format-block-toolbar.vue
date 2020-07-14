<template>
    <ul >
        <li @click="formatBlock('div')" class="text-button">
            div
        </li>
        <li @click="formatBlock('p')" class="text-button">
            p
        </li>
        <li @click="formatBlock('h1')" class="text-button">
            h1
        </li>
        <li @click="formatBlock('h2')" class="text-button">
            h2
        </li>
        <li @click="formatBlock('h3')" class="text-button">
            h3
        </li>
        <li @click="formatBlock('h4')" class="text-button">
            h4
        </li>
        <li @click="formatBlock('Blockquote')" class="text-button">
            blockquote
        </li>
        <li @click="formatBlock('em')" class="text-button">
            em (selection required)
        </li>
        <button type="button" class="btn btn-small btn-inline" @click="activeToolbar = 'main'"  >Cancel</button>
    </ul>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Mixins} from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'FormatBlockToolbar',
        mixins: [SelectionMixin]
    })
    export default class FormatBlockToolbar extends Mixins(SelectionMixin) {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private backColor: string = ''

        public formatBlock (tagName) : void {
            tagName = tagName.toLowerCase();
            let selectedHtml = this.getSelectedHtml(this.iframe);
            if (selectedHtml === '') {
                this.iframe.contentWindow.document.execCommand('formatBlock', false, tagName);
            } else {
                let html = `<${tagName}>${selectedHtml}</${tagName}>`
                this.iframe.contentWindow.document.execCommand('insertHTML', false, html);
            }
            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

    }
</script>