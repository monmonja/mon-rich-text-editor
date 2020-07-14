<template>
    <ul >
        <li>
            <label>Table (Row x Column):</label>
            <input type="number" min="1" placeholder="row" v-model="tableRow"/> x
            <input type="number" min="1" placeholder="column" v-model="tableColumn"/>
            <button type="button" class="btn btn-small btn-inline" @click="insertTable"  >Apply</button>
            <button type="button" class="btn btn-small btn-inline" @click="setActiveToolbar('main')"  >Cancel</button>
        </li>
    </ul>
</template>

<style scoped>
    input[type=number] {
        width: 50px;
    }
</style>

<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'

    @Component({
        name: 'TableToolbar'
    })
    export default class TableToolbar extends Vue {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ required: true }) readonly setActiveToolbar: Function

        private tableRow: number = 1
        private tableColumn: number = 1

        public insertTable () : void {
            let html = `<table>`;
            for (let i = 0; i < this.tableRow; i += 1) {
                html += '<tr>';
                for (let j = 0; j < this.tableColumn; j += 1) {
                    html += '<td> </td>';
                }
                html += '</tr>';
            }

            this.iframe.contentWindow.document.execCommand('insertHTML', false, html);
            this.$root.$emit('mon-iframe-changed');
            this.setActiveToolbar('main');
        }

    }
</script>