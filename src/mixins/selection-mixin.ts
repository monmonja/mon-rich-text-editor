import { Vue, Component } from "vue-property-decorator";

@Component
export default class SelectionMixin extends Vue {

    public getSelectedHtml(iframe: HTMLIFrameElement): string {
        let windowIframe = iframe.contentWindow as Window;
        let sel = windowIframe.getSelection(); // Gets selection

        let selectedHtml = "";
        if (sel.rangeCount) {
            let container = iframe.contentWindow.document.createElement("div");
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            let children = container.getElementsByTagName("*") as any;
            for (let child of children) {
                if (child.style.fontSize) {
                    // child.style.fontSize = `${this.fontSize}`
                }
            }
            selectedHtml = container.innerHTML;
        }
        return selectedHtml;
    }

    public getCurrentNode (iframe: HTMLIFrameElement): HTMLElement {
        let windowIframe = iframe.contentWindow as Window;
        let currentNode = windowIframe.getSelection().focusNode as HTMLElement;
        if (currentNode && currentNode.nodeType === 3) {
            currentNode = currentNode.parentElement;
        }
        return currentNode;
    }
}
