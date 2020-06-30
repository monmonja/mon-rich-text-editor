<template>
    <ul >
        <li>
            <label>Text Color:</label>
            <input type="text" placeholder="#123123" v-model="foreColor"/>
            <button type="button" class="btn btn-small btn-inline" @click="changeForeColor"  >Apply</button>
            <button type="button" class="btn btn-small btn-inline" @click="setActiveToolbar('main')"  >Cancel</button>
        </li>
    </ul>
</template>


<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'ForeColorToolbar'
    })
    export default class ForeColorToolbar extends Vue {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private foreColor: string = ''

        public changeForeColor () : void {
            this.iframe.contentWindow.document.execCommand('styleWithCSS', false, 'true');
            this.iframe.contentWindow.document.execCommand('foreColor', false, this.foreColor);
            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

    }
</script>