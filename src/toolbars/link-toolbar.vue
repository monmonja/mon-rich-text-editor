<template>
    <ul >
        <li>
            <label>Link:</label>
            <input type="text" placeholder="url " v-model="linkUrl"/>
            <input type="text" placeholder="html" v-model="linkTitle"/>
            <input type="text" placeholder="target" v-model="target"/>
            <button type="button" class="btn btn-small btn-inline" @click="addLink"  >Apply</button>
            <button v-if="isLink" type="button" class="btn btn-small btn-inline" @click="removeLink"  >Remove Link</button>
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
        private target: string = ''
        private isLink: boolean = false

        public addLink () : void {
            let selectedHtml = this.getSelectedHtml(this.iframe);
            if (selectedHtml === '') {
                selectedHtml = this.linkTitle;
            }
            let target = '';
            if (this.target !== '') {
                target = `target="${this.target}"`;
            }

            let html = `<a href="${this.linkUrl}" ${target}>${selectedHtml}</a>`
            this.iframe.contentWindow.document.execCommand('insertHTML', false, html);
            this.$root.$emit('mon-iframe-changed');

            this.linkUrl = '';
            this.linkTitle = '';
            this.target = '';
            this.isLink = false;
            this.setActiveToolbar('main');
        }

        public removeLink () : void {
            let windowIframe = this.iframe.contentWindow as Window;
            let sel = windowIframe.getSelection();
            let r = sel.getRangeAt(0);
            let el = r.startContainer.parentElement;
            el.parentNode.removeChild(el)

            this.iframe.contentWindow.document.execCommand('insertHTML', false, el.innerHTML);
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
                            this.target = currentNode.getAttribute('target');
                            this.isLink = this.linkUrl !== null;
                        }
                    }
                }
            });
        }

    }
</script>