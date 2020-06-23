<template>
    <li @click="undo" :class="{disabled: !this.undoActivated}" class="icon-button">
        <i class="material-icons icon">undo</i>
    </li>
</template>

<style lang="scss" scoped>
    ul li {
        &.disabled i.material-icons{
            color: #dadada !important;
        }
    }
</style>
<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'undo'
    })
    export default class Undo extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        private undoActivated: boolean = false

        public undo () : void {
            this.iframe.contentWindow.document.body.focus();
            this.iframe.contentWindow.document.execCommand('undo');
            this.$root.$emit('mon-iframe-changed');
        }

        mounted () : void {
            console.log('this.$root.', this.$root)
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    console.log('mon-iframe-changed', this.iframe)
                    this.undoActivated = this.iframe.contentWindow.document.queryCommandEnabled('undo');
                }
            });
        }
    }
</script>