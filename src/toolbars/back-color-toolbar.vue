<template>
    <ul >
        <li>
            <label>Background Color:</label>
            <input type="text" placeholder="#123123" v-model="backColor"/>
            <button type="button" class="btn btn-small btn-inline" @click="changeBackColor"  >Apply</button>
            <button type="button" class="btn btn-small btn-inline" @click="setActiveToolbar('main')"  >Cancel</button>
        </li>
    </ul>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'BackColorToolbar'
    })
    export default class BackColorToolbar extends Vue {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private backColor: string = ''

        public changeBackColor () : void {
            this.iframe.contentWindow.document.execCommand('styleWithCSS', false, 'true');
            this.iframe.contentWindow.document.execCommand('backColor', false, this.backColor);
            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

    }
</script>