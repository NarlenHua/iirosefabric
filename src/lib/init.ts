import { TinyEmitter } from "tiny-emitter";

// @ts-ignore
import { config } from '../../config';
import { decoder } from './decoder';
import { fabricSocket } from './fabricSocket';
import { tools } from './tools';

import { fabricAPI } from "./fabricAPI";

import { encoder } from './encoder';
import { fabricSVG } from "./fabricSVG";
import { fabricStyle } from "./fabricStyle";
import { messageClass } from "./messageClass";
import { windowTools } from "./windowTools";
import { ingector } from "./ingector";

// 初始化fabricSocket
async function initSocket() {
    console.log('代理网络');
    for (let index = 0; index < 10; index++) {
        try {
            console.log('网络代理', index);
            // @ts-ignore
            if (window["socket"].__onmessage != undefined || window["socket"]._onmessage == undefined || window["socket"]._send == undefined) {
                console.log('界面还没加载')
                // 等待一下
                await tools.sleep(500);
                continue;
            }
            else break;
        } catch (error) {
            console.error(error);
        }
    }
    // @ts-ignore
    if (window["socket"].__onmessage != undefined || window["socket"]._onmessage == undefined || window["socket"]._send == undefined) {
        console.log('界面加载失败')
        return;
    }
    // 发送
    // @ts-ignore
    fabricSocket.originalSend = window.socket.send;
    fabricSocket.beforeSend = (param: string) => {
        console.debug(`发送消息"${param}"`);
        return param;
    }
    fabricSocket.afterSend = (param: string) => {
        console.debug(`成功发送"${param}"`);
    }
    fabricSocket.send = (param: any) => {
        let temp: string | null = fabricSocket.beforeSend(param);
        if (temp != null) {
            fabricSocket.originalSend!(temp);
            fabricSocket.afterSend!(temp);
        }
    }
    // 覆写原来的发送函数
    // @ts-ignore
    socket.send = fabricSocket.send;
    // 接收
    // @ts-ignore
    fabricSocket.originalOnmessage = socket._onmessage
    fabricSocket.beforOnmessage = (param: any) => {
        console.debug(`收到消息 "${param}"`);
        return param;
    }
    fabricSocket.afterOnmessage = (param: any) => {
        let tempMessageList = decoder.decodeMessage(param as string)
        console.debug(`收到消息 "${param}"`);
        for (let message of tempMessageList) {
            console.debug('准备触发事件', message.messageClass, message);
            fabricAPI.emitter.emit(message.messageClass, message)
        };
    }
    fabricSocket.onmessage = (param: string) => {
        let temp: string | null = fabricSocket.beforOnmessage(param);
        if (temp != null) {
            fabricSocket.originalOnmessage(temp);
            fabricSocket.afterOnmessage(temp);
        }
    }
    // 覆写接收函数
    // @ts-ignore
    socket._onmessage = fabricAPI.fabricSocket.onmessage;
}

// 初始化元素
async function initIirsoeElements() {
    fabricAPI.iiroseElements.movePanelHolder = document.querySelector('#movePanelHolder');
    fabricAPI.iiroseElements.functionHolder = document.querySelector('#functionHolder');
    fabricAPI.iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
}

// 初始化主窗口
async function initMainWindow() {
    console.log('初始化窗口');
    // 一级菜单二级菜单
    let menu = fabricAPI.windowTools.createMenu('fabricMianMenu', 'Fabric');
    let menuItem1 = fabricAPI.windowTools.createMenuItem('fabric设置');
    let menuItem2 = await fabricAPI.ingector.creatIngectorWindow();
    // 工作区
    let workSpace: HTMLElement = fabricAPI.windowTools.createItem('div', `fabricMainWindow-workspace`, fabricAPI.fabricStyle.class["fabric-window-workspace"]);

    let button0 = fabricAPI.windowTools.createItem('button', undefined, undefined, '打开Eruda');
    button0.style.backgroundColor = 'green';
    // @ts-ignore
    button0.onclick = () => { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); };
    let button1 = fabricAPI.windowTools.createItem('button', undefined, undefined, '关闭Eruda');
    button1.style.backgroundColor = 'yellow';
    // @ts-ignore
    button1.onclick = () => { eruda.destroy(); }
    let button2 = fabricAPI.windowTools.createItem('button', undefined, undefined, '设置是否自动启动Eruda');
    button2.style.backgroundColor = 'green';
    button2.onclick = () => {
        let allowTemp = localStorage.getItem('allowEruda');
        if (allowTemp == true.toString())
            localStorage.setItem('allowEruda', false.toString());
        else
            localStorage.setItem('allowEruda', true.toString());
        // @ts-ignore
        _alert(`allowEruda设置为${localStorage.getItem('allowEruda')}`);
    }
    let button3 = fabricAPI.windowTools.createItem('button', undefined, undefined, '设置遇到错误是否自动重启');
    button3.style.backgroundColor = 'yellow';
    // @ts-ignore
    button3.onclick = () => {
        let allowTemp = localStorage.getItem('allowAutoReload');
        if (allowTemp == false.toString())
            localStorage.setItem('allowAutoReload', true.toString());
        else
            localStorage.setItem('allowAutoReload', false.toString());
        // @ts-ignore
        _alert(`allowAutoReload设置为${localStorage.getItem('allowAutoReload')}`);
    }
    let button4 = fabricAPI.windowTools.createItem('button', undefined, undefined, '打开PageSpy');
    button4.style.backgroundColor = 'yellow';
    // @ts-ignore
    button4.onclick = async () => {
        async function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        for (let i = 0; i < 10; i++) {
            // @ts-ignore
            if (window.DataHarborPlugin != undefined && window.RRWebPlugin != undefined && window.PageSpy != undefined) {
                // @ts-ignore
                window.$harbor = new DataHarborPlugin(); window.$rrweb = new RRWebPlugin();[window.$harbor, window.$rrweb].forEach(p => { PageSpy.registerPlugin(p) }), window.$pageSpy = new PageSpy()
                break;
            }
            await sleep(100);
        }
        // @ts-ignore
        if (window.DataHarborPlugin != undefined && window.RRWebPlugin != undefined && window.PageSpy != undefined) {
            console.log('PageSpy初始化成功');
            // @ts-ignore
            _alert('PageSpy初始化成功');
        }
        else {
            console.error('PageSpy初始化失败');
            // @ts-ignore
            _alert('PageSpy初始化失败');
        }

    }
    let button5 = fabricAPI.windowTools.createItem('button', undefined, undefined, '注入PageSpy');
    button5.style.backgroundColor = 'green';
    // @ts-ignore
    button5.onclick = async () => {
        let pageSpyURL = localStorage.getItem('pageSpyURL');
        if (pageSpyURL == null || pageSpyURL == '') {
            localStorage.setItem('pageSpyURL', '');
            // @ts-ignore
            _alert('请先设置PageSpy调试服务器地址');
            console.error('请先设置PageSpy调试服务器地址');
            return;
        } else {
            let ps1 = document.createElement('script');
            ps1.setAttribute('crossorigin', 'anonymous');
            ps1.src = `${pageSpyURL}/page-spy/index.min.js`;
            let ps2 = document.createElement('script');
            ps2.setAttribute('crossorigin', 'anonymous');
            ps2.src = `${pageSpyURL}/plugin/data-harbor/index.min.js`;
            let ps3 = document.createElement('script');
            ps3.setAttribute('crossorigin', 'anonymous');
            ps3.src = `${pageSpyURL}/plugin/rrweb/index.min.js`;
            document.body.append(ps1, ps2, ps3);
            // @ts-ignore
            _alert('PageSpy已注入');
        }
    }
    let button6 = fabricAPI.windowTools.createItem('button', undefined, undefined, '设置PageSpy服务器地址');
    button6.style.backgroundColor = 'yellow';
    // @ts-ignore
    button6.onclick = () => {
        let urlTemp = prompt("不要轻易输入陌生人给的调试服务器地址，远程调试人员将看到你的所有数据！！！\n请输入PageSpy服务器地址:");
        if (urlTemp != null && urlTemp != "") {
            localStorage.setItem('pageSpyURL', urlTemp);
        }
    }
    let button7 = fabricAPI.windowTools.createItem('button', undefined, undefined, '删除缓存');
    button7.style.backgroundColor = 'green';
    // @ts-ignore
    button7.onclick = async () => {
        await caches.delete('v');
        // @ts-ignore
        _alert('浏览器缓存已经删除');
    }

    let dis1 = fabricAPI.windowTools.createItem('p', undefined, undefined, '实验性：');
    let dis2 = fabricAPI.windowTools.createItem('div', undefined, undefined, '<a href="https://www.pagespy.org/">PageSpy远程调试工具官网</a>  具备调试修复功能，当因为网络等原因无法进入时，可以点击在右下角打开调试工具，运行"iirosesave()"将保存存档，运行"iiroserepair()"将尝试修复程序，修复后重载可能可以进入,运行"closeconsole()"将关闭调试工具。');
    workSpace.append(button0, button1, button2, button3, button7, dis1, button4, button5, button6, dis2);
    let fabiricMianWindow = fabricAPI.windowTools.createFabrcWindow('fabricMainWindow', 400, workSpace);
    // 关闭窗口
    fabricAPI.windowTools.closeElement(fabiricMianWindow);
    console.log('窗口', fabiricMianWindow);
    menuItem1.onclick = () => { fabricAPI.windowTools.turnDisplay(fabiricMianWindow); };
    fabricAPI.iiroseElements.movePanelHolder?.appendChild(fabiricMianWindow);
    console.log('移动', fabricAPI.iiroseElements.movePanelHolder);
    fabricAPI.windowTools.insertMenu(menu, [menuItem1, menuItem2], 0, true);
}

// 初始化
async function initFabricAPI() {
    // // 初始化一些静态的成员
    fabricAPI.version = config.version;
    fabricAPI.fabricSVG = fabricSVG;
    fabricAPI.fabricStyle = fabricStyle;
    fabricAPI.encoder = encoder;
    fabricAPI.decoder = decoder;
    fabricAPI.messageClass = messageClass;
    fabricAPI.emitter = new TinyEmitter();
    fabricAPI.windowTools = windowTools;
    fabricAPI.tools = tools;
    fabricAPI.ingector = ingector;
    // 初始化动态的成员
    await initSocket();
    await initIirsoeElements();
    // 注入CSS
    await fabricAPI.tools.addStyle('fabricStyle', fabricAPI.fabricStyle.fabricCSS);
    await fabricAPI.tools.addStyle('ingectorStyle', fabricAPI.ingector.ingectorStyle.ingectorCSS);
    await initMainWindow();
    // 将接口注入到环境中
    // @ts-ignore
    window.fabricAPI = fabricAPI;
    // @ts-ignore
    window.top.fabricAPI = fabricAPI;
    // 运行外部脚本
    await fabricAPI.ingector.runEnd();
    // 替换缓存里的
    await fabricAPI.ingector.replaceHTML();
    // @ts-ignore
    _alert("Fabric注入成功")
}
export const init = {
    initSocket,
    initIirsoeElements,
    initMainWindow,
    initFabricAPI
}