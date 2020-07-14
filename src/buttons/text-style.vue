<template>
    <li @click="showTextToolbar" class="text-button " > <!-- v-html="formatBlockElement"> -->
        Text Style
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Mixins} from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'TextStyle',
        mixins: [SelectionMixin]
    })
    export default class TextStyle extends Mixins(SelectionMixin) {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private formatBlockElement: string = 'div'

        public showTextToolbar () : void {
            this.setActiveToolbar('text');
        }


        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    let currentNode = this.getCurrentNode(this.iframe);
                    if (currentNode) {
                        this.formatBlockElement = currentNode.parentElement.nodeName.toLowerCase();
                    }
                }
            });
        }
    }
</script>