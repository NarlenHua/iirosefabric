import { fabricAPI } from "./fabricAPI";
import { decoder } from "./decoder";
import { windowElementer } from "./windowElementer";
import { fabricStyle } from "../static/css/fabricCSS";


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
/**
 * 添加样式
 */
async function initStyle(id: string, css: string) {
  console.log('添加样式');
  let st = windowElementer.createItem('style');
  st.id = id;
  st.innerHTML = css;
  document.head.appendChild(st);
}

async function initMainWindow() {
  console.log('初始化窗口');
  // 一级菜单二级菜单
  let menu = fabricAPI.windowElementer.createMenu('fabricMianMenu', 'Fabric');
  let menuItem = fabricAPI.windowElementer.createMenuItem('打开或关闭fabric窗口');
  // 工作区
  let workSpace: HTMLElement = fabricAPI.windowElementer.createItem('div', `fabricMainWindow-workspace`, fabricStyle.class["fabric-window-workspace"])
  workSpace.innerHTML = '<h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1><h1>这里的文本内容是可以滚动的，滚动条方向是垂直方向。</h1>'
  let fabiricMianWindow = fabricAPI.windowElementer.createFabrcWindow('fabricMainWindow', 400, workSpace);
  // 关闭窗口
  fabricAPI.windowElementer.closeElement(fabiricMianWindow);
  console.log('窗口', fabiricMianWindow);
  menuItem.addEventListener('click', () => {
    fabricAPI.windowElementer.turnDisplay(fabiricMianWindow);
  });
  fabricAPI.someElements.movePanelHolder?.appendChild(fabiricMianWindow);
  console.log('移动', fabricAPI.someElements.movePanelHolder);
  fabricAPI.windowElementer.insertMenu(menu, [menuItem], 0, true);
}

/**
 * Fabric初始化
 */
async function initFabricAPI() {
  await initSocket();
  initStyle('fabricStyle', fabricStyle.fabricCSS);
  initELement();
  initMainWindow();
  // 将接口注入到环境中
  // @ts-ignore
  window.fabricAPI = fabricAPI;
  // @ts-ignore
  window.top.fabricAPI = fabricAPI;
}

export const init = {
  initSocket,
  initELement,
  initStyle,
  initMainWindow,
  initFabricAPI
}