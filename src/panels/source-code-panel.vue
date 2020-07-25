<template>
    <textarea
              class="source-code"
              name="sourceFormName"
              @keyup="sourceCodeChanged"
              v-model="currentValue"
    ></textarea>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Prop, Component, Watch} from 'vue-property-decorator'

    @Component({
        name: 'SourceCodePanel'
    })
    export default class SourceCodePanel extends Vue {
        @Prop({ required: true }) readonly iframe:HTMLIFrameElement
        @Prop({ type: String }) readonly sourceFormName:string
        @Prop({ type: String, default: '' }) readonly value:string

        private currentValue:string = ''

        public sourceCodeChanged () : void {
            this.iframe.contentWindow.document.body.innerHTML = this.currentValue;
            this.$emit('input',  this.currentValue);
        }

        @Watch('value')
        nameChanged(newVal: string) {
            this.currentValue = newVal
        }

    }
</script>