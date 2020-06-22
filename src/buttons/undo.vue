<template>
    <li @click="undo"  class="icon-button">
        <i class="material-icons icon">undo</i>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'undo'
    })
    export default class Undo extends Vue {
        @Prop() readonly iframe:HTMLIFrameElement
        // // @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        // private undoActivated: boolean = false
        //
        // public undo () : void {
        //     this.iframe.contentWindow.document.body.focus();
        //     this.iframe.contentWindow.document.execCommand('undo');
        //     this.$emit('mon-iframe-changed');
        // }
        //
        // mounted () : void {
        //     this.$on('mon-iframe-changed',  () => {
        //         console.log('mon-iframe-changed undo',this.iframe, this.iframe.contentWindow.document.queryCommandEnabled('undo'))
        //         this.undoActivated = this.iframe.contentWindow.document.queryCommandEnabled('undo');
        //     });
        // }
    }
</script>