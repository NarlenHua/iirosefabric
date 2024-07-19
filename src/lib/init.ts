import { fabricAPI } from "./fabricAPI";
import { decoder } from "./decoder";
import { fabricStyle } from "./fabricStyle";
// import { erudatool } from "./eruadtool";
import { ingector } from "./ingector";
import { windowElementer } from "./windowElementer";

/**
 * 初始化网络代理
 * @returns 返回初始化是否成功
 */
async function initSocket() {
  console.log('代理网络');
  // @ts-ignore
  if (socket == undefined) {
    console.error("socket不存在！");
    return false;
  }
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
  let openButton = windowElementer.createItem('button', undefined, undefined, '打开调试工具');
  openButton.style.backgroundColor = 'green';
  // @ts-ignore
  openButton.onclick = () => { eruda.init(); };
  let closeButton = windowElementer.createItem('button', undefined, undefined, '关闭调试工具');
  closeButton.style.backgroundColor = 'yellow';
  // @ts-ignore
  closeButton.onclick = () => { eruda.destroy(); }
  let dis = windowElementer.createItem('p', undefined, undefined, '具备调试修复功能，当因为网络等原因无法进入时，可以点击在右下角打开调试工具，运行"iirosesave()"将保存存档，运行"iiroserepair()"将尝试修复程序，修复后重载可能可以进入,运行"closeconsole()"将关闭调试工具。');
  workSpace.append(openButton, closeButton, dis);
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
}

export const init = {
  initSocket,
  initELement,
  initMainWindow,
  initFabricAPI
}
