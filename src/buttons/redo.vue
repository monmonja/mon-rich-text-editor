<template>
    <li @click="activate" :class="{disabled: !this.buttonActivated}" class="icon-button">
        <i class="material-icons icon">redo</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'Redo'
    })
    export default class Redo extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        private buttonActivated: boolean = false

        public activate () : void {
            this.iframe.contentWindow.document.body.focus();
            this.iframe.contentWindow.document.execCommand('redo');
            this.$root.$emit('mon-iframe-changed');
        }

        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    this.buttonActivated = this.iframe.contentWindow.document.queryCommandEnabled('redo');
                }
            });
        }
    }
</script>