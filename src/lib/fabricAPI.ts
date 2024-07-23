import { TinyEmitter } from "tiny-emitter";
// @ts-ignore
import { config } from '../../config';
import { decoder } from './decoder';
import { encoder } from './encoder';
import { fabricSVG } from "./fabricSVG";
import { fabricStyle } from "./fabricStyle";
import { messageClass } from "./messageClass";
import { windowTools } from "./windowTools";
import { tools } from './tools';
import { ingector } from "./ingector";
import { fabricSocket } from './fabricSocket';
import { iirsoeElements } from "./iiroseElement";
// import { init } from "./init";

export class FabricAPI {
  version: string = config.version;
  fabricSVG: {
    fabric: string;
    max: string;
    med: string;
    min: string;
    close: string;
    more: string;
    delate: string;
    start: string;
  } = fabricSVG;
  fabricStyle: {
    fabricCSS: string;
    class: {
      'fabric-window': string;
      'fabric-window-menubar': string;
      'fabric-window-menubartitle': string;
      'fabric-window-menubarbutton': string;
      'fabric-window-workspace': string;
    };
  } = fabricStyle;
  messageClass = messageClass;
  encoder = encoder;
  decoder: { decodeMessage(_message: any): any } = decoder;
  emitter = new TinyEmitter();
  iiroseElements: {
    movePanelHolder: HTMLElement | null,
    functionHolder: HTMLElement | null,
    functionButtonGroupList: Element[] | null
  } = iirsoeElements;
  tools: {
    api: any;
    sleep(_ms: number): any,
    addStyle(id: string, css: string): Promise<boolean>,
    refreshElements(): any,
  } = tools;
  windowTools: {
    /**
 * 创建标签
 * @param tag 标签类型
 * @param id id
 * @param className 要添加的类型
 * @param textContent 文本内容
 * @returns 创建好的标签
 */
    createItem(tag?: string, id?: string, className?: string, textContent?: string): HTMLElement,
    /**
     * @param id 窗口id
     * @param width 窗口宽
     * @param workSpace 工作区元素
     * @param title 标题
     * @param height 窗口高
     * @returns
     */
    createFabrcWindow(id: string, width: number, workSpace?: HTMLElement, title?: string, height?: number): HTMLElement,
    /**
     * 创建一个一级菜单
     * @param id 菜单id
     * @param name 菜单名字
     * @returns 菜单元素
     */
    createMenu(id: string, name: string): HTMLElement,
    /**
     * 创建一个二级菜单元素
     * @returns 菜单元素
     */
    createMenuItem(name: string): HTMLElement,
    /**
     * 关闭元素显示
     * @param ele 要关闭的元素
     */
    closeElement(ele: HTMLElement): void,
    /**
     * 打开元素显示
     * @param ele 要打开的元素
     */
    openElement(ele: HTMLElement): void,
    /**
     * 翻转元素是否显示
     * @param ele 要控制显示的元素
     */
    turnDisplay(ele: HTMLElement): void,
    /**
     * 添加菜单
     * @param Menu 一级菜单元素
     * @param items 二级菜单元素列表
     * @param num 要添加到哪个子元素（下标）之前，null表示添加到父元素的子元素列表最后
     * @param isbefore 是否添加到前面
     */
    insertMenu(Menu: HTMLElement, items: HTMLElement[], num: number, isbefore: boolean): void,

  } = windowTools;
  ingector: {
    ingectorStyle: {
      ingectorCSS: string;
      class: {
        'ingector-text': string;
        'ingector-table': string;
        'ingector-linkname': string;
        'ingector-link': string;
        'ingector-choice': string;
      };
    };
    iirosesave(): void,
    iiroserepair(): void,
    iiroseremovecaches(): void,
    openconsole(): void,
    closeconsole(): void,
    runBegain(): void,
    runEnd(): Promise<void>,
    replaceHTML(): Promise<void>,
    createTabletr(name: HTMLElement, link: HTMLElement, choice: HTMLElement): HTMLElement,
    createTable(tableType: number, writeButton: HTMLElement, readButton: HTMLElement, addButton: HTMLElement): Promise<HTMLElement>,
    /**
     * 生成管理注入js文件列表的窗口,并返回控制它开关的二级菜单
     */
    creatIngectorWindow(): Promise<HTMLElement>,
  } = ingector;
  fabricSocket: {
    beforeSend(_param: string): string | null;
    originalSend(_param: string): string;
    afterSend(_param: string): void;
    send(_param: any): any;
    beforOnmessage(_param: string): string | null;
    originalOnmessage(_param: string): string;
    afterOnmessage(_param: string): void;
    onmessage(_param: any): any;
  } = fabricSocket;
  // constructor() {
  //   init.initFabricAPI();
  // }
}
export const fabricAPI: FabricAPI = new FabricAPI();