import { fabricAPI } from "./fabricAPI";
import { decoder } from "./decoder";
import { fabricStyle } from "./fabricStyle";
// import { erudatool } from "./eruadtool";
import { ingector } from "./ingector";
import { windowElementer } from "./windowElementer";

/**
   * 异步延时函数
   * @param {时间毫秒} ms
   */
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 初始化网络代理
 * @returns 返回初始化是否成功
 */
async function initSocket() {
  console.log('代理网络');
  // 等待一下
  await sleep(500);
  // 发送
  // @ts-ignore
  fabricAPI.socket.originalSend = socket.send;
  fabricAPI.socket.beforeSend = (param: string) => {
    console.debug(`发送消息"${param}"`);
    return param;
  }
  fabricAPI.socket.afterSend = (param: string) => {
    console.debug(`成功发送"${param}"`);
    return param;
  }
  fabricAPI.socket.send = (param: any) => {
    let temp: string = fabricAPI.socket.beforeSend!(param as string);
    fabricAPI.socket.originalSend!(temp);
    fabricAPI.socket.afterSend!(temp as string);
  }
  // 覆写原来的发送函数
  // @ts-ignore
  socket.send = fabricAPI.socket.send;
  // 接收
  // @ts-ignore
  fabricAPI.socket.originalOnmessage = socket._onmessage
  fabricAPI.socket.beforOnmessage = (param: any) => {
    console.debug('收到消息' + param);
  }
  fabricAPI.socket.afterOnmessage = (param: any) => {
    let tempMessageList = decoder.decodeMessage(param as string)
    for (let message of tempMessageList) {
      console.debug('准备触发事件' + message.messageClass)
      fabricAPI.emitter.emit(message.messageClass, message)
    };
  }
  fabricAPI.socket.onmessage = (param: string) => {
    if (fabricAPI.socket.beforOnmessage && fabricAPI.socket.originalOnmessage && fabricAPI.socket.afterOnmessage) {
      fabricAPI.socket.beforOnmessage(param);
      fabricAPI.socket.originalOnmessage(param);
      fabricAPI.socket.afterOnmessage(param);
    }
  }
  // 覆写接收函数
  // @ts-ignore
  socket._onmessage = fabricAPI.socket.onmessage;
  // @ts-ignore
  if (socket) {
    console.log('网络代理成功！');
    return true;
  } else {
    console.error("socket不存在！");
    return false;
  }
}

/**
 * 查找一些必要的节点
 */
async function initELement() {
  fabricAPI.someElements.movePanelHolder = document.querySelector('#movePanelHolder');
  fabricAPI.someElements.functionHolder = document.querySelector('#functionHolder');
  fabricAPI.someElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
}

// 初始化主窗口
async function initMainWindow() {
  console.log('初始化窗口');
  // 一级菜单二级菜单
  let menu = windowElementer.createMenu('fabricMianMenu', 'Fabric');
  let menuItem1 = windowElementer.createMenuItem('fabric设置');
  let menuItem2 = await ingector.creatIngectorWindow();
  // 工作区
  let workSpace: HTMLElement = windowElementer.createItem('div', `fabricMainWindow-workspace`, fabricStyle.class["fabric-window-workspace"]);

  let button0 = windowElementer.createItem('button', undefined, undefined, '打开Eruda');
  button0.style.backgroundColor = 'green';
  // @ts-ignore
  button0.onclick = () => { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); };
  let button1 = windowElementer.createItem('button', undefined, undefined, '关闭Eruda');
  button1.style.backgroundColor = 'yellow';
  // @ts-ignore
  button1.onclick = () => { eruda.destroy(); }
  let button2 = windowElementer.createItem('button', undefined, undefined, '设置是否自动启动Eruda');
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
  let button3 = windowElementer.createItem('button', undefined, undefined, '设置遇到错误是否自动重启');
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
  let button4 = windowElementer.createItem('button', undefined, undefined, '打开PageSpy');
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
  let button5 = windowElementer.createItem('button', undefined, undefined, '注入PageSpy');
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
  let button6 = windowElementer.createItem('button', undefined, undefined, '设置PageSpy服务器地址');
  button6.style.backgroundColor = 'yellow';
  // @ts-ignore
  button6.onclick = () => {
    let urlTemp = prompt("不要轻易输入陌生人给的调试服务器地址，远程调试人员将看到你的所有数据！！！\n请输入PageSpy服务器地址:");
    if (urlTemp != null && urlTemp != "") {
      localStorage.setItem('pageSpyURL', urlTemp);
    }
  }
  let button7 = windowElementer.createItem('button', undefined, undefined, '删除缓存');
  button7.style.backgroundColor = 'green';
  // @ts-ignore
  button7.onclick = async () => {
    await caches.delete('v');
    // @ts-ignore
    _alert('浏览器缓存已经删除');
  }

  let dis1 = windowElementer.createItem('p', undefined, undefined, '实验性：');
  let dis2 = windowElementer.createItem('div', undefined, undefined, '<a href="https://www.pagespy.org/">PageSpy远程调试工具官网</a>  具备调试修复功能，当因为网络等原因无法进入时，可以点击在右下角打开调试工具，运行"iirosesave()"将保存存档，运行"iiroserepair()"将尝试修复程序，修复后重载可能可以进入,运行"closeconsole()"将关闭调试工具。');
  workSpace.append(button0, button1, button2, button3, button7, dis1, button4, button5, button6, dis2);
  let fabiricMianWindow = windowElementer.createFabrcWindow('fabricMainWindow', 400, workSpace);
  // 关闭窗口
  windowElementer.closeElement(fabiricMianWindow);
  console.log('窗口', fabiricMianWindow);
  menuItem1.onclick = () => { windowElementer.turnDisplay(fabiricMianWindow); };
  fabricAPI.someElements.movePanelHolder?.appendChild(fabiricMianWindow);
  console.log('移动', fabricAPI.someElements.movePanelHolder);
  windowElementer.insertMenu(menu, [menuItem1, menuItem2], 0, true);
}


/**
 * Fabric初始化
 */
async function initFabricAPI() {
  // 注入之前的运行脚本
  // await ingector.replacejQuery();
  await ingector.replaceHTML();
  // alert("注入成功");
  await initSocket();
  // 注入样式
  fabricStyle.addStyle('fabricStyle', fabricStyle.fabricCSS);
  fabricStyle.addStyle('ingectorStyle', ingector.ingectorStyle.ingectorCSS);
  initELement();
  initMainWindow();
  // 将接口注入到环境中
  // @ts-ignore
  window.fabricAPI = fabricAPI;
  // @ts-ignore
  window.top.fabricAPI = fabricAPI;
  // 运行外部脚本
  ingector.runEnd();
  // @ts-ignore
  _alert("Fabric注入成功")
}

export const init = {
  initSocket,
  initELement,
  initMainWindow,
  initFabricAPI
}
