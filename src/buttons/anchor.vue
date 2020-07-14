<template>
    <li @click="showLinkToolbar" :class="{active: this.linkActivated}" class="icon-button">
        <i class="material-icons icon">insert_link</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Mixins} from 'vue-property-decorator'
    import SelectionMixin from "../mixins/selection-mixin";

    @Component({
        name: 'Anchor',
        mixins: [SelectionMixin]
    })
    export default class Anchor extends Mixins(SelectionMixin) {
        @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private linkActivated: boolean = false

        public showLinkToolbar () : void {
            this.setActiveToolbar('link');
        }


        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    let currentNode = this.getCurrentNode(this.iframe);
                    if (currentNode) {
                        this.linkActivated = currentNode.nodeName.toLowerCase() === 'a';
                    }
                }
            });
        }
    }
</script>