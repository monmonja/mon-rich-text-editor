<template>
    <ul >
        <li>
            <label>Link:</label>
            <input type="text" placeholder="url " v-model="linkUrl"/>
            <input type="text" placeholder="html" v-model="linkTitle"/>
            <button type="button" class="btn btn-small btn-inline" @click="addLink"  >Apply</button>
            <button type="button" class="btn btn-small btn-inline" @click="setActiveToolbar('main')"  >Cancel</button>
        </li>
    </ul>
</template>

<style scoped>
    input[type=number] {
        width: 50px;
    }
</style>

<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Mixins} from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'LinkToolbar',
        mixins: [SelectionMixin]
    })
    export default class LinkToolbar extends Mixins(SelectionMixin) {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private linkUrl: string = ''
        private linkTitle: string = ''

        public addLink () : void {
            let selectedHtml = this.getSelectedHtml(this.iframe);
            if (selectedHtml === '') {
                selectedHtml = this.linkTitle;
            }
            let html = `<a href="${this.linkUrl}">${selectedHtml}</a>`
            this.iframe.contentWindow.document.execCommand('insertHTML', false, html);
            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    let currentNode = this.getCurrentNode(this.iframe);
                    if (currentNode) {
                        if (currentNode.nodeName.toLowerCase() === 'a') {
                            this.linkTitle = currentNode.innerHTML;
                            this.linkUrl = currentNode.getAttribute('href');
                        }
                    }
                }
            });
        }

    }
</script>