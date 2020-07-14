<template>
    <li @click="showFontSizeToolbar" class="text-button ">
        Font Size : <span v-html="fontSize"></span>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Mixins} from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'FontSize',
        mixins: [SelectionMixin]
    })
    export default class FontSize extends Mixins(SelectionMixin) {
        @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private fontSize: string = ''

        public showFontSizeToolbar () : void {
            this.setActiveToolbar('font-size');
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