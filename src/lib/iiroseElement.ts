

export class IirsoeElements {
    movePanelHolder!: HTMLElement | null;
    functionHolder!: HTMLElement | null;
    functionButtonGroupList!: Element[] | null;
    async initElements() {
        this.movePanelHolder = document.querySelector('#movePanelHolder');
        this.functionHolder = document.querySelector('#functionHolder');
        this.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
    }
}


