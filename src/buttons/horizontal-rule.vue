<template>
    <li @click="activate"  class="icon-button">
        <i class="material-icons icon">horizontal_rule</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'HorizontalRule'
    })
    export default class HorizontalRule extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement

        public activate () : void {
            this.iframe.contentWindow.document.body.focus();
            this.iframe.contentWindow.document.execCommand('insertHorizontalRule');
            this.$root.$emit('mon-iframe-changed');
        }
    }
</script>