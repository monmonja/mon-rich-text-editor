<template>
    <div class="mon-rich-text-editor">
        <div class="actions-bar" >
            <ul :class="{'hide': this.toolbarToShow !== 'main'}">
                <slot name="buttons-front" v-bind="{ toolbarToShow, changeToolbarToShow, iframe }"></slot>
                <undo :iframe="iframe"></undo>
                <redo :iframe="iframe"></redo>
                <li class="separator"></li>

                <li @click="showTextToolbar" class="text-button " > <!-- v-html="formatBlockElement"> -->
                    Text Style
                </li>
                <li @click="showFontSizeToolbar" class="text-button ">
                    Font Size : <span v-html="fontSize"></span>
                </li>
                <bold :iframe="iframe"></bold>
                <italic :iframe="iframe"></italic>
                <underline :iframe="iframe"></underline>
                <li @click="showForeColorToolbar"  class="icon-button">
                    <i class="material-icons icon">text_format</i>
                </li>
                <li @click="showBackColorToolbar" class="icon-button">
                    <i class="material-icons icon">format_paint</i>
                </li>
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
                <li @click="addHorizontalRule" class="icon-button">
                    <i class="material-icons icon">horizontal_rule</i>
                </li>

                <li class="separator"></li>

                <li @click="formatAlignLeft" :class="{active: this.formatJustifyLeftActivated}" class="icon-button">
                    <i class="material-icons icon">format_align_left</i>
                </li>
                <li @click="formatAlignCenter" :class="{active: this.formatJustifyCenterActivated}" class="icon-button">
                    <i class="material-icons icon">format_align_center</i>
                </li>
                <li @click="formatAlignRight" :class="{active: this.formatJustifyRightActivated}" class="icon-button">
                    <i class="material-icons icon">format_align_right</i>
                </li>
                <li @click="formatAlignJustify" :class="{active: this.formatJustifyJustifyActivated}" class="icon-button">
                    <i class="material-icons icon">format_align_justify</i>
                </li>
                <li class="separator"></li>

                <li @click="insertUnorderedList" :class="{active: this.insertUnorderedListActivated}" class="icon-button">
                    <i class="material-icons icon">format_list_bulleted</i>
                </li>
                <li @click="insertOrderedList" :class="{active: this.insertOrderedListActivated}" class="icon-button">
                    <i class="material-icons icon">format_list_numbered</i>
                </li>
                <li class="separator"></li>

                <li @click="viewSourceCode" class="icon-button">
                    <i class="material-icons icon">code</i>
                </li>
                <slot name="buttons" v-bind="{ changeToolbarToShow }"></slot>
            </ul>


            <ul :class="{'hide': this.toolbarToShow !== 'source-code'}">
                <li @click="viewSourceCode" class="text-button">
                    Show WYSIWYG
                </li>
            </ul>
            <ul :class="{'hide': this.toolbarToShow !== 'text'}">
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
                <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
            </ul>

            <ul :class="{'hide': this.toolbarToShow !== 'fore-color'}">
                <li>
                    <label>Text Color:</label>
                    <input type="text" placeholder="#123123" v-model="foreColor"/>
                    <button type="button" class="btn btn-small btn-inline" @click="changeForeColor"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
                </li>
            </ul>
            <ul :class="{'hide': this.toolbarToShow !== 'back-color'}">
                <li>
                    <label>Background Color:</label>
                    <input type="text" placeholder="#123123" v-model="backColor"/>
                    <button type="button" class="btn btn-small btn-inline" @click="changeBackColor"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
                </li>
            </ul>
            <ul :class="{'hide': this.toolbarToShow !== 'link'}">
                <li>
                    <label>Link:</label>
                    <input type="text" placeholder="url " />
                    <input type="text" placeholder="html" v-model="linkTitle"/>
                    <button type="button" class="btn btn-small btn-inline" @click="addLink"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
                </li>
            </ul>

            <ul :class="{'hide': this.toolbarToShow !== 'font-size'}">
                <li>
                    <input type="text" placeholder="16px" v-model="fontSize"/>
                    <button type="button" class="btn btn-small btn-inline" @click="changeFontSize"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
                </li>
            </ul>
            <ul :class="{'hide': this.toolbarToShow !== 'table'}">
                <li>
                    <label>Table (Row x Column):</label>

                    <input type="number" min="1" placeholder="row" v-model="tableRow"/> x
                    <input type="number" min="1" placeholder="column" v-model="tableColumn"/>
                    <button type="button" class="btn btn-small btn-inline" @click="insertTable"  >Apply</button>
                    <button type="button" class="btn btn-small btn-inline" @click="toolbarToShow = 'main'"  >Cancel</button>
                </li>
            </ul>
            <slot name="toolbar" v-bind="{ toolbarToShow, changeToolbarToShow, custom, iframe }"></slot>
        </div>
        <div class="main-component-wrapper" :class="{'view-source': this.viewSourceCodeActivated}">
            <iframe class="main-component"></iframe>
            <textarea class="source-code" :name="sourceFormName" @keyup="sourceCodeChanged" v-model="currentValue"></textarea>
            <slot name="overlay" v-bind="{ iframe }"></slot>
        </div>

    </div>
</template>

<style lang="scss">
    .mon-rich-text-editor {
        .full-screen {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .main-component-wrapper {
                height: calc(100% - 44px);
            }
        }

        .main-component-wrapper {
            border: 1px solid #CCC;
            margin-top: -1px;
            width: 100%;
            position: relative;
            z-index: 1;
            height: 400px;

            &.view-source {
                .source-code {
                    z-index: 3;
                }
            }

            .main-component, .source-code {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100% !important;
                background: white;
                border: none;
                outline: none;
            }

            .source-code {
                z-index: 1;
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
    declare var openFileManagerComponent;
    declare const jQuery;

    @Component({
        name: 'MonRichTextEditor',
        components: {Underline, Italic, Bold, Redo, Undo}
    })
    export default class MonRichTextEditor extends Vue {
        @Prop({ type: String, default: '' }) readonly value:string
        @Prop({ type: String }) readonly loadValueFromSibling:string
        @Prop({ type: String }) readonly sourceFormName:string

        private iframe: HTMLIFrameElement = null
        private iframeDocument: Document = null
        private formatUnderlineActivated: boolean = false
        private formatJustifyLeftActivated: boolean = false
        private formatJustifyCenterActivated: boolean = false
        private formatJustifyRightActivated: boolean = false
        private formatJustifyJustifyActivated: boolean = false
        private insertUnorderedListActivated: boolean = false
        private insertOrderedListActivated: boolean = false
        private linkActivated: boolean = false
        private viewSourceCodeActivated: boolean = false
        private currentValue: string = ''
        public toolbarToShow: string = 'main'
        private foreColor: string = ''
        private backColor: string = ''
        private fontSize: string = ''
        private linkUrl: string = ''
        private linkTitle: string = ''
        private formatBlockElement: string = 'div'
        private tableRow: number = 1
        private tableColumn: number = 1
        public custom: object = {}

        public changeToolbarToShow (value:string) : void {
            this.toolbarToShow = value;
        }



        public formatUnderline () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('underline');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public formatAlignLeft () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('justifyLeft');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public formatAlignCenter () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('justifyCenter');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public formatAlignRight () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('justifyRight');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public formatAlignJustify () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('justifyFull');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public insertUnorderedList () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('insertUnorderedList');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public insertOrderedList () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('insertOrderedList');
            this.checkButtonStates();
            this.iframeChanged();
        }


        public addHorizontalRule () : void {
            this.iframeDocument.body.focus();
            this.iframeDocument.execCommand('insertHorizontalRule');
            this.checkButtonStates();
            this.iframeChanged();
        }

        public showForeColorToolbar () : void {
            this.toolbarToShow = 'fore-color';
            this.foreColor = '';
        }
        public changeForeColor () : void {
            this.iframeDocument.execCommand('styleWithCSS', false, 'true');
            this.iframeDocument.execCommand('foreColor', false, this.foreColor);
            this.checkButtonStates();
            this.iframeChanged();
            this.toolbarToShow = 'main';
        }

        public showBackColorToolbar () : void {
            this.toolbarToShow = 'back-color';
            this.backColor = '';
        }
        public changeBackColor () : void {
            this.iframeDocument.execCommand('styleWithCSS', false, 'true');
            this.iframeDocument.execCommand('backColor', false, this.backColor);
            this.checkButtonStates();
            this.iframeChanged();
            this.toolbarToShow = 'main';
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
            this.toolbarToShow = 'main';
        }

        public addLink () : void {
            let selectedHtml = this.getSelectedHtml();
            if (selectedHtml === '') {
                selectedHtml = this.linkTitle;
            }
            let html = `<a href="${this.linkUrl};">${selectedHtml}</a>`
            this.iframeDocument.execCommand('insertHTML', false, html);
            this.linkUrl = '';
            this.linkTitle = '';
            this.checkButtonStates();
            this.iframeChanged();
            this.toolbarToShow = 'main';
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
            this.toolbarToShow = 'main';
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
            this.toolbarToShow = 'main';
        }

        public addPhoto (): void {
            openFileManagerComponent((imageId, imageSrc) => {
                let img = "<img src='" + imageSrc + "' >";
                this.iframeDocument.execCommand("insertHTML", false, img);
                this.iframeChanged();
            });
        }


        public showLinkToolbar () : void {
            this.toolbarToShow = 'link';
        }

        public showFontSizeToolbar () : void {
            this.toolbarToShow = 'font-size';
        }
        public showModulesToolbar () : void {
            this.toolbarToShow = 'modules';
        }

        public showTableToolbar () : void {
            this.toolbarToShow = 'table';
        }

        public showTextToolbar () : void {
            this.toolbarToShow = 'text';
        }

        public alterIframe (customFunc: Function) : void {
            customFunc(this.iframeDocument)
            //.head.getElementsByClassName(firstChildClassName)
        }

        public viewSourceCode () : void {
            this.viewSourceCodeActivated = !this.viewSourceCodeActivated;
            if (this.viewSourceCodeActivated) {
                this.toolbarToShow = 'source-code';
                let textArea = this.$el.getElementsByClassName('source-code')[0] as HTMLElement;
                textArea.focus();
            } else {
                this.toolbarToShow = 'main';
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
            this.formatUnderlineActivated = this.iframeDocument.queryCommandState('underline');

            this.formatJustifyLeftActivated = this.iframeDocument.queryCommandState('justifyLeft');
            this.formatJustifyCenterActivated = this.iframeDocument.queryCommandState('justifyCenter');
            this.formatJustifyRightActivated = this.iframeDocument.queryCommandState('justifyRight');
            this.formatJustifyJustifyActivated = this.iframeDocument.queryCommandState('justifyFull');

            this.insertUnorderedListActivated = this.iframeDocument.queryCommandState('insertUnorderedList');
            this.insertOrderedListActivated = this.iframeDocument.queryCommandState('insertOrderedList');


            let windowIframe = this.iframe.contentWindow as Window;
            let currentNode = windowIframe.getSelection().focusNode as HTMLElement;
            if (currentNode && currentNode.nodeType === 3) {
                currentNode = currentNode.parentElement;
            }

            if (this.toolbarToShow === 'link') {
                this.linkTitle = '';
                this.linkUrl = '';
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

