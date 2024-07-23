import { TinyEmitter } from "tiny-emitter";

export class FabricAPI {
  version!: string;
  fabricSVG!: {
    fabric: string;
    max: string;
    med: string;
    min: string;
    close: string;
    more: string;
    delate: string;
    start: string;
  };
  fabricStyle!: {
    fabricCSS: string;
    class: {
      'fabric-window': string;
      'fabric-window-menubar': string;
      'fabric-window-menubartitle': string;
      'fabric-window-menubarbutton': string;
      'fabric-window-workspace': string;
    };
  };
  messageClass!: {
    PublicMessage: {
      new(message_list: string[]): {
        timeStamp: string;
        headPortrait: string;
        name: string;
        message: string;
        color: string;
        gender: string;
        uid: string;
        title: string;
        messageUid: string;
        messageClass: string;
      };
    };
    PrivateMessage: {
      new(message_list: string[]): {
        timeStamp: string;
        headPortrait: string;
        name: string;
        message: string;
        color: string;
        gender: string;
        uid: string;
        messageUid: string;
        messageClass: string;
      };
    };
    HiddenMessage: {
      new(message: string): {
        messageName: string;
        uid: string;
        data: string;
        messageClass: string;
      };
    };
    UnkonwMessage: {
      new(message: string): {
        message: string;
        messageClass: string;
      };
    };
  };
  encoder!: {
    encodePublicMessage: (message: string, color: string) => string;
    encodePrivateMessage: (uid: string, message: string, color: string) => string;
    encoderHidenMessage: (messageNmae: string, uid: string, data: string) => string;
  };
  decoder!: {
    decodeMessage(_message: any): any;
  };
  emitter!: TinyEmitter;
  windowTools!: {
    /**
     * 创建标签
     * @param tag 标签类型
     * @param id id
     * @param className 要添加的类型
     * @param textContent 文本内容
     * @returns 创建好的标签
     */
    createItem(tag?: string, id?: string, className?: string, textContent?: string): HTMLElement;
    /**
     * @param id 窗口id
     * @param width 窗口宽
     * @param workSpace 工作区元素
     * @param title 标题
     * @param height 窗口高
     * @returns
     */
    createFabrcWindow(id: string, width: number, workSpace?: HTMLElement, title?: string, height?: number): HTMLElement;
    /**
     * 创建一个一级菜单
     * @param id 菜单id
     * @param name 菜单名字
     * @returns 菜单元素
     */
    createMenu(id: string, name: string): HTMLElement;
    /**
     * 创建一个二级菜单元素
     * @returns 菜单元素
     */
    createMenuItem(name: string): HTMLElement;
    /**
     * 关闭元素显示
     * @param ele 要关闭的元素
     */
    closeElement(ele: HTMLElement): void;
    /**
     * 打开元素显示
     * @param ele 要打开的元素
     */
    openElement(ele: HTMLElement): void;
    /**
     * 翻转元素是否显示
     * @param ele 要控制显示的元素
     */
    turnDisplay(ele: HTMLElement): void;
    /**
     * 添加菜单
     * @param Menu 一级菜单元素
     * @param items 二级菜单元素列表
     * @param num 要添加到哪个子元素（下标）之前，null表示添加到父元素的子元素列表最后
     * @param isbefore 是否添加到前面
     */
    insertMenu(Menu: HTMLElement, items: HTMLElement[], num: number, isbefore: boolean): void;
  };
  tools!: {
    /**
     * 异步延时函数
     * @param _ms 毫秒
     */
    sleep(_ms: number): any;
    /**
     * 添加一个样式，向页面添加style元素
     * @param id 元素的id
     * @param css 样式字符串
     */
    addStyle(id: string, css: string): Promise<boolean>;
    refreshElements(): any;
  };
  ingector!: {
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
    /**
     * 保存存档
     */
    iirosesave(): void;
    /** 尝试修复并重启 */
    iiroserepair(): void;

    /** 删除浏览器缓存 */
    iiroseremovecaches(): void;

    /** 打开Eruda */
    openconsole(): void;
    /** 关闭Eruda */
    closeconsole(): void;
    /** 注入缓存前要调用的函数Eruda */
    runBegain(): void;
    /** 启动后注入资源 */
    runEnd(): Promise<void>;
    /** 将设置的脚本注入缓存 */
    replaceHTML(): Promise<void>;
    /**
     * 创建一行
     * @param name 脚本名元素
     * @param link 连接元素
     * @param choice 选项按钮
     */
    createTabletr(name: HTMLElement, link: HTMLElement, choice: HTMLElement): HTMLElement;
    /**
     * 创建一个表格
     * @param tableType 表格类型
     * @param writeButton 写功能按钮
     * @param readButton 读功能按钮
     * @param addButton 添加功能按钮
     */
    createTable(tableType: number, writeButton: HTMLElement, readButton: HTMLElement, addButton: HTMLElement): Promise<HTMLElement>;
    /** 创建注入资源的窗口 */
    creatIngectorWindow(): Promise<HTMLElement>;
  };
  fabricSocket!: {
    beforeSend(_param: string): string | null;
    originalSend(_param: string): string;
    afterSend(_param: string): void;
    send(_param: any): any;
    beforOnmessage(_param: string): string | null;
    originalOnmessage(_param: string): string;
    afterOnmessage(_param: string): void;
    onmessage(_param: any): any;
  };
  iiroseElements!: {
    movePanelHolder: HTMLElement | null;
    functionHolder: HTMLElement | null;
    functionButtonGroupList: Element[] | null;
  };
}

