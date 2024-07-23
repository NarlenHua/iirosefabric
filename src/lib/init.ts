import { FabricAPI } from "./FabricAPI.d";
import { fabricSocket } from "./fabricSocket";
import { fabricStyle } from "./fabricStyle";
import { iiroseElements } from "./iiroseElements";
import { ingector } from "./ingector";
import { tools } from "./tools";
import { windowTools } from "./windowTools";

// @ts-ignore
import { config } from "../../config.js"
import { decoder } from "./decoder";
import { encoder } from "./encoder.js";
import { fabricSVG } from "./fabricSVG";
import { messageClass } from "./messageClass";
import { emitter } from "./emitter.js";
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
    // 覆写原来的发送函数
    // @ts-ignore
    socket.send = fabricSocket.send;
    // 接收
    // @ts-ignore
    fabricSocket.originalOnmessage = socket._onmessage;
    // 覆写接收函数
    // @ts-ignore
    socket._onmessage = fabricSocket.onmessage;
}

// 初始化元素
async function initIirsoeElements() {
    iiroseElements.movePanelHolder = document.querySelector('#movePanelHolder');
    iiroseElements.functionHolder = document.querySelector('#functionHolder');
    iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
}

// 初始化主窗口
async function initMainWindow() {
    console.log('初始化窗口');
    // 一级菜单二级菜单
    let menu = windowTools.createMenu('fabricMianMenu', 'Fabric');
    let menuItem1 = windowTools.createMenuItem('fabric设置');
    let menuItem2 = await ingector.creatIngectorWindow();
    // 工作区
    let workSpace: HTMLElement = windowTools.createItem('div', `fabricMainWindow-workspace`, fabricStyle.class["fabric-window-workspace"]);

    let openEruda = windowTools.createItem('button', undefined, undefined, '打开Eruda');
    openEruda.style.backgroundColor = '#ffffd2';
    // @ts-ignore
    openEruda.onclick = () => { if (window.eruda != undefined) { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); } else { _alert('Eruda没有安装') } };
    let closeEruda = windowTools.createItem('button', undefined, undefined, '关闭Eruda');
    closeEruda.style.backgroundColor = '#fcbad3';
    // @ts-ignore
    closeEruda.onclick = () => { if (window.eruda != undefined) { eruda.destroy(); } else { _alert('Eruda没有安装') } }
    let allowEruda = windowTools.createItem('button', undefined, undefined, '设置是否自动启动Eruda');
    allowEruda.style.backgroundColor = '#aa96da';
    allowEruda.onclick = () => {
        let allowTemp = localStorage.getItem('allowEruda');
        if (allowTemp == true.toString())
            localStorage.setItem('allowEruda', false.toString());
        else
            localStorage.setItem('allowEruda', true.toString());
        // @ts-ignore
        _alert(`allowEruda设置为${localStorage.getItem('allowEruda')}`);
    }
    let deleteCache = windowTools.createItem('button', undefined, undefined, '删除缓存');
    deleteCache.style.backgroundColor = '#61c0bf';
    // @ts-ignore
    deleteCache.onclick = async () => {
        await caches.delete('v');
        // @ts-ignore
        _alert('浏览器缓存已经删除');
    }
    let allowCache = windowTools.createItem('button', undefined, undefined, '是否允许fabric向缓存注入资源');
    allowCache.style.backgroundColor = '#ffd3b6';
    allowCache.onclick = async () => {
        let allowTemp = localStorage.getItem('allowCache');
        if (allowTemp == true.toString()) {
            // 转化为不允许并重新设置缓存
            localStorage.setItem('allowCache', false.toString());
            let message: string = (await (await fetch('https://iirose.com/messages.html?timestamp=new%20Date().getTime()')).text());
            // 打开花园的缓存,将缓存写入
            await (await caches.open('v')).put(
                '/messages.html',
                new Response(new Blob(
                    [message]),
                    { status: 200, statusText: "OK" }));
        }
        else {
            localStorage.setItem('allowCache', true.toString());
        }
        // @ts-ignore
        _alert(`allowCache设置为${localStorage.getItem('allowCache')}`);
    }
    let allowAutoReload = windowTools.createItem('button', undefined, undefined, '设置遇到错误是否自动重启');
    allowAutoReload.style.backgroundColor = '#fae3d9';
    // @ts-ignore
    allowAutoReload.onclick = () => {
        let allowTemp = localStorage.getItem('allowAutoReload');
        if (allowTemp == false.toString())
            localStorage.setItem('allowAutoReload', true.toString());
        else
            localStorage.setItem('allowAutoReload', false.toString());
        // @ts-ignore
        _alert(`allowAutoReload设置为${localStorage.getItem('allowAutoReload')}`);
    }
    let openPageSpy = windowTools.createItem('button', undefined, undefined, '打开PageSpy');
    openPageSpy.style.backgroundColor = '#a5dee5';
    // @ts-ignore
    openPageSpy.onclick = async () => {
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
    let ingectPageSpy = windowTools.createItem('button', undefined, undefined, '注入PageSpy');
    ingectPageSpy.style.backgroundColor = '#e0f9b5';
    // @ts-ignore
    ingectPageSpy.onclick = async () => {
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
    let setPageSpyURL = windowTools.createItem('button', undefined, undefined, '设置PageSpy服务器地址');
    setPageSpyURL.style.backgroundColor = '#fefdca';
    // @ts-ignore
    setPageSpyURL.onclick = () => {
        let urlTemp = prompt("不要轻易输入陌生人给的调试服务器地址，\n远程调试人员将看到你的所有数据！！！\n请输入PageSpy服务器地址:");
        if (urlTemp != null && urlTemp != "") {
            localStorage.setItem('pageSpyURL', urlTemp);
        }
    }


    let dis1 = windowTools.createItem('p', undefined, undefined, '设置Eruda');
    let dis2 = windowTools.createItem('p', undefined, undefined, '设置缓存影响注入在缓存里的脚本');
    let dis3 = windowTools.createItem('div', undefined, undefined, '设置远程调试服务器，运行"iirosesave()"将保存存档，运行"iiroserepair()"将尝试修复程序，修复后重载可能可以进入,运行"closeconsole()"将关闭调试工具。');
    let ps = document.createElement('a');
    ps.href = 'https://www.pagespy.org/';
    ps.innerHTML = 'PageSpy官网链接';
    ps.style.backgroundColor = '#ffcfdf';
    workSpace.append(dis1, openEruda, closeEruda, allowEruda);
    workSpace.append(dis2, deleteCache, allowCache, allowAutoReload);
    workSpace.append(dis3, openPageSpy, ingectPageSpy, setPageSpyURL, ps);
    let fabiricMianWindow = windowTools.createFabrcWindow('fabricMainWindow', 400, workSpace);
    // 关闭窗口
    windowTools.closeElement(fabiricMianWindow);
    console.log('窗口', fabiricMianWindow);
    menuItem1.onclick = () => { windowTools.turnDisplay(fabiricMianWindow); };
    iiroseElements.movePanelHolder?.appendChild(fabiricMianWindow);
    console.log('移动', iiroseElements.movePanelHolder);
    windowTools.insertMenu(menu, [menuItem1, menuItem2], 0, true);
}

let fabricAPI: FabricAPI = new FabricAPI();
// 初始化
async function initFabricAPI() {
    // 先等待网络连接好
    await initSocket();
    // 初始化一些静态的成员
    fabricAPI.version = config.version;
    fabricAPI.fabricSVG = fabricSVG;
    fabricAPI.fabricStyle = fabricStyle;
    fabricAPI.messageClass = messageClass;
    fabricAPI.encoder = encoder;
    fabricAPI.decoder = decoder;
    fabricAPI.emitter = emitter;
    fabricAPI.windowTools = windowTools;
    fabricAPI.tools = tools;
    fabricAPI.ingector = ingector;
    // 初始化动态的成员
    await initIirsoeElements();
    // 注入CSS
    await tools.addStyle('fabricStyle', fabricStyle.fabricCSS);
    await tools.addStyle('ingectorStyle', ingector.ingectorStyle.ingectorCSS);
    await initMainWindow();
    // 将接口注入到环境中
    // @ts-ignore
    window.fabricAPI = fabricAPI;
    // @ts-ignore
    window.top.fabricAPI = fabricAPI;
    // 运行外部脚本
    await fabricAPI.ingector.runEnd();
    // 将脚本注入到缓存
    await fabricAPI.ingector.replaceHTML();
    // @ts-ignore
    _alert("Fabric注入成功")
}
export const init = {
    fabricAPI,
    initSocket,
    initIirsoeElements,
    initMainWindow,
    initFabricAPI
}