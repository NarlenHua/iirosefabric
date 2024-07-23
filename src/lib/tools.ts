import { FabricAPI } from "./fabricAPI";

let api: any;
export const tools = {
    api,
    /**
 * 异步延时函数
 * @param {时间毫秒} ms
 */
    async sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    /**
     * 添加样式
     * @param id style元素id
     * @param css 样式文件
     * @returns 添加成功返回true否则返回false
     */
    async addStyle(id: string, css: string): Promise<boolean> {
        try {
            console.log('添加样式', id);
            let st = document.createElement('style');
            st.id = id;
            st.innerHTML = css;
            document.head.appendChild(st);
            return true;
        } catch (error) {
            return false;
        }
    },
    // 刷新记录fabric记录的一些元素
    async refreshElements() {
        api as FabricAPI
        api.iiroseElements.movePanelHolder = document.querySelector('#movePanelHolder');
        api.iiroseElements.functionHolder = document.querySelector('#functionHolder');
        api.iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
    },
    async addAPI(tempAPI: any) {
        api = tempAPI;
    }
}