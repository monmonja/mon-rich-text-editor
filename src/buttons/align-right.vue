<template>
    <li @click="activate" :class="{active: this.buttonActivated}" class="icon-button">
        <i class="material-icons icon">format_align_right</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'AlignRight'
    })
    export default class AlignRight extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        private buttonActivated: boolean = false

        public activate () : void {
            this.iframe.contentWindow.document.body.focus();
            this.iframe.contentWindow.document.execCommand('justifyRight');
            this.$root.$emit('mon-iframe-changed');
        }

        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    this.buttonActivated = this.iframe.contentWindow.document.queryCommandState('justifyRight');
                }
            });
        }
    }
</script>