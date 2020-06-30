<template>
    <div class="mon-rich-text-editor">
        <div class="actions-bar" >
            <ul :class="{'hide': this.activeToolbar !== 'main'}">
                <slot name="buttons-front" v-bind="{ activeToolbar, setActiveToolbar, iframe, setActivePanel }"></slot>
                <undo :iframe="iframe" />
                <redo :iframe="iframe" />
                <li class="separator"></li>

                <li @click="showTextToolbar" class="text-button " > <!-- v-html="formatBlockElement"> -->
                    Text Style
                </li>
                <li @click="showFontSizeToolbar" class="text-button ">
                    Font Size : <span v-html="fontSize"></span>
                </li>

                <bold :iframe="iframe" />
                <italic :iframe="iframe" />
                <underline :iframe="iframe" />
                <fore-color :set-active-toolbar="setActiveToolbar" />
                <back-color :set-active-toolbar="setActiveToolbar" />
                <li class="separator"></li>

                <li @click="showLinkToolbar" :class="{active: this.linkActivated}" class="icon-button">
                    <i class="material-icons icon">insert_link</i>
                </li>
                <li @click="addPhoto" class="icon-button">
                    <i class="material-icons icon">add_photo_alternate</i>
                </li>
                <li @click="showTableToolbar" class="icon-button">
                    <i class="material-icons icon">table_view</i>
                </li>
                <horizontal-rule :iframe="iframe" />

                <li class="separator"></li>
                <align-left :iframe="iframe" />
                <align-center :iframe="iframe" />
                <align-right :iframe="iframe" />
                <align-justify :iframe="iframe" />
                <li class="separator"></li>

                <unordered-list :iframe="iframe" />
                <ordered-list :iframe="iframe" />
                <li class="separator"></li>

                <li @click="viewSourceCode" class="icon-button">
                    <i class="material-icons icon">code</i>
                </li>
                <slot name="buttons" v-bind="{ setActiveToolbar, setActivePanel }"></slot>
            </ul>


            <ul :class="{'hide': this.activeToolbar !== 'source-code'}">
                <li @click="viewSourceCode" class="text-button">
                    Show WYSIWYG
                </li>
            </ul>
            <ul :class="{'hide': this.activeToolbar !== 'text'}">
                <li @click="formatBlock('div')" class="text-button">
                    div
                </li>
                <li @click="formatBlock('p')" class="text-button">
                    p
                </li>
                <li @click="formatBlock('h1')" class="text-button">
                    h1
                </li>
                <li @click="formatBlock('h2')" class="text-button">
                    h2
                </li>
                <li @click="formatBlock('h3')" class="text-button">
                    h3
                </li>
                <li @click="formatBlock('h4')" class="text-button">
                    h4
                </li>
                <li @click="formatBlock('Blockquote')" class="text-button">
                    blockquote
                </li>
                <li @click="formatBlock('em')" class="text-button">
                    em (selection required)
                </li>
                <button type="button" class="btn btn-small btn-inline" @click="activeToolbar = 'main'"  >Cancel</button>
            </ul>

            <fore-color-toolbar
                    :iframe="iframe"
                    :set-active-toolbar="setActiveToolbar"
                    :class="{'hide': this.activeToolbar !== 'fore-color'}"
             />
            <back-color-toolbar
                    :iframe="iframe"
                    :set-active-toolbar="setActiveToolbar"
                    :class="{'hide': this.activeToolbar !== 'back-color'}"
             />

            <ul :class="{'hide': this.activeToolbar !== 'link'}">
                <li>
                    <label>Link:</label>
                    <input type="text" placeholder="url " v-model="linkUrl"/>
                    <input type="text" placeholder="html" v-model="linkTitle"/>
                    <button type="button" class="btn btn-small btn-inline" @click="addLink"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="activeToolbar = 'main'"  >Cancel</button>
                </li>
            </ul>

            <ul :class="{'hide': this.activeToolbar !== 'font-size'}">
                <li>
                    <input type="text" placeholder="16px" v-model="fontSize"/>
                    <button type="button" class="btn btn-small btn-inline" @click="changeFontSize"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="activeToolbar = 'main'"  >Cancel</button>
                </li>
            </ul>
            <ul :class="{'hide': this.activeToolbar !== 'table'}">
                <li>
                    <label>Table (Row x Column):</label>

                    <input type="number" min="1" placeholder="row" v-model="tableRow"/> x
                    <input type="number" min="1" placeholder="column" v-model="tableColumn"/>
                    <button type="button" class="btn btn-small btn-inline" @click="insertTable"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="activeToolbar = 'main'"  >Cancel</button>
                </li>
            </ul>
            <slot name="toolbar" v-bind="{ activeToolbar, setActiveToolbar, iframe, setActivePanel }"></slot>
        </div>
        <div class="panel" >
            <iframe :class="{'active': this.activePanel === 'main'}" class="main-component"></iframe>
            <textarea :class="{'active': this.activePanel === 'source-code'}" class="source-code" :name="sourceFormName" @keyup="sourceCodeChanged" v-model="currentValue"></textarea>
            <slot name="panel" v-bind="{ iframe, activePanel, setActivePanel }"></slot>
        </div>

    </div>
</template>

<style lang="scss">
    .mon-rich-text-editor {
        &.full-screen {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .panel {
                height: calc(100% - 44px);
            }
        }

        .panel {
            border: 1px solid #CCC;
            margin-top: -1px;
            width: 100%;
            position: relative;
            z-index: 1;
            height: 400px;


            > * {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100% !important;
                background: white;
                border: none;
                outline: none;
                overflow: auto;
                &.active {
                    z-index: 3;
                }
            }

            .source-code {
                background: #f1f1f1;
                color: #333;
                padding: 12px;
            }
        }

        .actions-bar {
            padding: 4px;
            border: 1px solid #CCC;
            box-shadow: 0 3px 3px -2px #333;
            background: #fafafa;
            z-index: 2;
            position: relative;

            ul.hide {
                display: none;
            }

            label, input[type=text] {
                width: auto !important;
                display: inline-block !important;
            }

            input[type=text] {
                margin: 0 4px;
                border: 1px solid #CCC !important;
                padding: 10px 6px !important;
            }

        }

        ul {
            &:after {
                display: table;
                content: ' ';
                clear: both;
            }

            li {
                /*float: left;*/
                display: inline-block;
                cursor: pointer;
                height: 36px;
                line-height: 36px;
                padding: 0 2px;
                vertical-align: middle;

                &.active {
                    background: #eaeaea;
                }

                &.disabled i.material-icons {
                    color: #dadada !important;
                }

                &.icon-button {
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    margin: 2px 1px;
                }

                &.text-button {
                    font-size: 0.8rem;
                    border: 1px solid #CCC;
                    padding: 0 8px;
                    margin-right: 8px;
                }

                &.not-done {
                    background: rgba(255, 0, 0, 0.1);
                }

                &.separator {
                    border-right: 1px solid #CCC;
                    margin: 0 4px;
                }

                > i {
                    margin-top: 7px;
                    display: inline-block;
                    font-size: 20px;
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
</style>

<script lang="ts">
    import Vue from 'vue'
    import { Prop, Component } from 'vue-property-decorator'
    import Undo from "./buttons/undo.vue";
    import Redo from "./buttons/redo.vue";
    import Bold from "./buttons/bold.vue";
    import Italic from "./buttons/italic.vue";
    import Underline from "./buttons/underline.vue";
    import AlignLeft from "./buttons/align-left.vue";
    import AlignCenter from "./buttons/align-center.vue";
    import AlignRight from "./buttons/align-right.vue";
    import AlignJustify from "./buttons/align-justify.vue";
    import UnorderedList from "./buttons/unordered-list.vue";
    import OrderedList from "./buttons/ordered-list.vue";
    import ForeColor from "./buttons/fore-color.vue";
    import ForeColorToolbar from "./toolbars/fore-color-toolbar.vue";
    import BackColor from "./buttons/back-color.vue";
    import BackColorToolbar from "./toolbars/back-color-toolbar.vue";
    import HorizontalRule from "./buttons/horizontal-rule.vue";
    declare var openFileManagerComponent;
    declare const jQuery;

    @Component({
        name: 'MonRichTextEditor',
        components: {
            HorizontalRule,
            BackColorToolbar,
            BackColor,
            ForeColorToolbar,
            ForeColor, OrderedList, UnorderedList, AlignJustify, AlignRight, AlignCenter, AlignLeft, Underline, Italic, Bold, Redo, Undo}
    })
    export default class MonRichTextEditor extends Vue {
        @Prop({ type: String, default: '' }) readonly value:string
        @Prop({ type: String }) readonly loadValueFromSibling:string
        @Prop({ type: String }) readonly sourceFormName:string

        private iframe: HTMLIFrameElement = null
        private iframeDocument: Document = null
        private linkActivated: boolean = false
        private viewSourceCodeActivated: boolean = false
        private currentValue: string = ''
        public activeToolbar: string = 'main'
        public activePanel: string = 'main'

        private fontSize: string = ''
        private linkUrl: string = ''
        private linkTitle: string = ''
        private formatBlockElement: string = 'div'
        private tableRow: number = 1
        private tableColumn: number = 1

        public setActiveToolbar (value:string) : void {
            this.activeToolbar = value;
        }

        public setActivePanel (value:string) : void {
            this.activePanel = value;
        }



        public formatBlock (tagName) : void {
            tagName = tagName.toLowerCase();
            let selectedHtml = this.getSelectedHtml();
            if (selectedHtml === '') {
                this.iframeDocument.execCommand('formatBlock', false, tagName);
            } else {
                let html = `<${tagName}>${selectedHtml}</${tagName}>`
                this.iframeDocument.execCommand('insertHTML', false, html);
            }
            this.checkButtonStates();
            this.iframeChanged();
            this.activeToolbar = 'main';
        }

        public addLink () : void {
            let selectedHtml = this.getSelectedHtml();
            if (selectedHtml === '') {
                selectedHtml = this.linkTitle;
            }
            let html = `<a href="${this.linkUrl};">${selectedHtml}</a>`
            this.iframeDocument.execCommand('insertHTML', false, html);
            this.iframeChanged();
            this.activeToolbar = 'main';
        }


        private getSelectedHtml () : string {
            let windowIframe = this.iframe.contentWindow as Window;
            let sel = windowIframe.getSelection(); // Gets selection

            let selectedHtml = "";
            if (sel.rangeCount) {
                let container = this.iframeDocument.createElement("div");
                for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                let children = container.getElementsByTagName("*") as any;
                for(let child of children) {
                    if(child.style.fontSize) {
                        child.style.fontSize = `${this.fontSize}`
                    }
                }
                selectedHtml = container.innerHTML;
            }
            return selectedHtml;
        }

        public changeFontSize () : void {
            let selectedHtml = this.getSelectedHtml();
            let html = `<div style="font-size: ${this.fontSize};">${selectedHtml}</div>`
            this.iframeDocument.execCommand('insertHTML', false, html);

            this.checkButtonStates();
            this.iframeChanged();
            this.activeToolbar = 'main';
        }

        public insertTable () : void {
            let html = `<table>`;
            for (let i = 0; i < this.tableRow; i += 1) {
                html += '<tr>';
                for (let j = 0; j < this.tableColumn; j += 1) {
                    html += '<td> </td>';
                }
                html += '</tr>';
            }
            // html = '<iframe src="/" width="100%" frameborder="0"></iframe>'
            this.iframeDocument.execCommand('insertHTML', false, html);

            this.checkButtonStates();
            this.iframeChanged();
            this.activeToolbar = 'main';
        }

        public addPhoto (): void {
            openFileManagerComponent((imageId, imageSrc) => {
                let img = "<img src='" + imageSrc + "' >";
                this.iframeDocument.execCommand("insertHTML", false, img);
                this.iframeChanged();
            });
        }


        public showLinkToolbar () : void {
            this.activeToolbar = 'link';
        }

        public showFontSizeToolbar () : void {
            this.activeToolbar = 'font-size';
        }

        public showTableToolbar () : void {
            this.activeToolbar = 'table';
        }

        public showTextToolbar () : void {
            this.activeToolbar = 'text';
        }

        public viewSourceCode () : void {
            this.viewSourceCodeActivated = !this.viewSourceCodeActivated;
            if (this.viewSourceCodeActivated) {
                this.activeToolbar = 'source-code';
                this.activePanel = 'source-code';
                let textArea = this.$el.getElementsByClassName('source-code')[0] as HTMLElement;
                textArea.focus();
            } else {
                this.activeToolbar = 'main';
                this.activePanel = 'main';
                this.iframeDocument.body.focus();
            }
            this.checkButtonStates();
        }

        public sourceCodeChanged () : void {
            this.iframeDocument.body.innerHTML = this.currentValue;
            this.$emit('input',  this.currentValue);
        }

        public iframeChanged () : void {
            this.currentValue = this.iframeDocument.body.innerHTML.trim();
            this.$emit('input',  this.currentValue);
        }

        private initButtonStates () {
            if (this.activeToolbar === 'main') {
                let windowIframe = this.iframe.contentWindow as Window;
                let currentNode = windowIframe.getSelection().focusNode as HTMLElement;
                if (currentNode && currentNode.nodeType === 3) {
                    currentNode = currentNode.parentElement;
                }

                if (currentNode) {
                    this.linkActivated = currentNode.nodeName.toLowerCase() === 'a';
                    if (this.linkActivated) {
                        this.linkTitle = currentNode.innerHTML;
                        this.linkUrl = currentNode.getAttribute('href');
                    }
                    this.formatBlockElement = currentNode.parentElement.nodeName.toLowerCase();
                    this.fontSize = windowIframe.getComputedStyle(currentNode, null)['fontSize'];
                }
            }
        }

        private checkButtonStates () {
            this.initButtonStates();
            this.$root.$emit('mon-iframe-changed');
        }

        private initIframe () : void {
            this.iframe = this.$el.getElementsByClassName('main-component')[0] as HTMLIFrameElement ;
            this.iframeDocument = this.iframe.contentWindow.document;
            this.iframeDocument.open();
            this.iframeDocument.writeln(`<!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                table { border-spacing: 0; padding: 4px; width: 100%; table-layout: fixed}
                table td { border:1px solid #CCC}
                img { max-width: 100% }
            </style>
        </head>
        <body contenteditable="true">${this.currentValue}</body></html>
        `);
            this.iframeDocument.close();

            this.iframeDocument.body.addEventListener('click',  () => {
                this.checkButtonStates();
            });
            this.iframeDocument.body.addEventListener('keyup',  () => {
                this.iframeChanged();
            });
            this.iframeDocument.body.focus();
            this.checkButtonStates();
            this.iframeDocument.body.blur();

            const observer = new MutationObserver(() => {
                this.iframeChanged();
            });
            observer.observe(this.iframeDocument.body, { attributes: true, childList: true, subtree: true });

            /*
            element.addEventListener('keypress', e(ev){
          if(ev.keyCode == '13')
              document.execCommand('formatBlock', false, 'p');
      }, false);
             */
        }

        mounted () : void {
            this.currentValue = this.value;
            if (typeof this.loadValueFromSibling !== 'undefined') {
                this.currentValue = jQuery(this.$el).siblings(this.loadValueFromSibling).val();
            }
            this.initIframe();
            this.$root.$on('mon-iframe-changed', () => {
                this.initButtonStates();
            });

        }
        updated () : void {
            this.$root.$emit('mon-iframe-changed');
        }
    }
</script>

