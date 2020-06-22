import _Vue from 'vue';
import MonRichTextEditor from './mon-rich-text-editor';
import Undo from './buttons/undo';

export default {
    install: (Vue: typeof _Vue, options?: any) => {
        Vue.component('mon-rich-text-editor', MonRichTextEditor)
        Vue.component('mon-undo', Undo)
    }
}