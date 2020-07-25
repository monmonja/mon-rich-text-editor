<template>
    <li @click="addPhoto" class="icon-button">
        <i class="material-icons icon">add_photo_alternate</i>
    </li>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'
    declare var openFileManagerComponent;

    @Component({
        name: 'Photo'
    })
    export default class Photo extends Vue {
        // @Prop() readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        private buttonActivated: boolean = false

        public addPhoto (): void {
            openFileManagerComponent((imageId, imageSrc) => {
                imageSrc = imageSrc.replace('-h250', '')
                let img = "<img src='" + imageSrc + "' >"
                this.iframe.contentWindow.document.execCommand("insertHTML", false, img)
                this.$root.$emit('mon-iframe-changed')
            });
        }

        mounted () : void {
            this.$root.$on('mon-iframe-changed',  () => {
                if (this.iframe) {
                    this.buttonActivated = this.iframe.contentWindow.document.queryCommandState('italic');
                }
            });
        }
    }
</script>