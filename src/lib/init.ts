import { fabricAPI } from "./fabricAPI";
import { decoder } from "./decoder";
import { windowElementer } from "./windowElementer";
import { fabricStyle } from "../static/css/fabricCSS";

/**
 * 异步延时函数
 * @param {时间毫秒} ms
 */
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/**
 * 初始化上下文
 * @returns 初始化是否成功
 */
async function initContext() {
  console.log('初始化DOC')
  fabricAPI.messageContext.document = document;
  fabricAPI.messageContext.window = window;
  fabricAPI.topcontext.window = window.top as Window | undefined;
  if (fabricAPI.messageContext.document == undefined || fabricAPI.messageContext.window == undefined)
    return false;
  else
    return true;
}

/**
 * 初始化网络代理
 * @returns 返回初始化是否成功
 */
async function initSocket() {
  console.log('代理网络');
  // 获取socket
  let socket: WebSocket | undefined = undefined;
  for (let index = 0; index < 30; index++) {
    // @ts-ignore
    if (fabricAPI.messageContext.window!.socket == undefined) {
      console.log('获取socket', index);
      sleep(100);
      continue;
    } else {
      // @ts-ignore
      socket = fabricAPI.messageContext.window!.socket;
      break;
    }
  }
  if (socket == undefined) return false;
  // 获取函数
  for (let i = 0; i < 30; i++) {
    // @ts-ignore
    if (!(socket.send != undefined && socket._onmessage != undefined && socket.__onmessage == undefined)) {
      console.debug('等待网络连接成功', i);
      // @ts-ignore
      console.debug(socket.send, socket.onmessage);
      await sleep(500);
      continue;
    } else {
      // 发送
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
      socket.send = fabricAPI.socket.send;
      // 接收
      // @ts-ignore
      fabricAPI.socket.originalOnmessage = socket._onmessage
      // @ts-ignore
      fabricAPI.socket.onmessage = socket.onmessage
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
      // @ts-ignore
      socket._onmessage = fabricAPI.socket.onmessage;
      break;
    }
  }
  // @ts-ignore
  if (!(socket.send != undefined && socket._onmessage != undefined && socket.__onmessage == undefined)) {
    console.error("网络代理失败");
    return false;
  } else {
    console.log("网络代理成功");
    return true;
  }
}

/**
 * 查找一些必要的节点
 */
async function initELement() {
  fabricAPI.someElements.movePanelHolder = fabricAPI.messageContext.document?.querySelector('#movePanelHolder');
  fabricAPI.someElements.functionHolder = fabricAPI.messageContext.document?.querySelector('#functionHolder');
  fabricAPI.someElements.functionButtonGroupList = [...fabricAPI.messageContext.document!.querySelectorAll('.functionButton.functionButtonGroup')];
}
/**
 * 添加样式
 */
async function initStyle(id: string, css: string) {
  console.log('添加样式');
  let st = windowElementer.createItem('style');
  st.id = id;
  st.innerHTML = css;
  fabricAPI.messageContext.document!.head.appendChild(st);
}

async function initMainWindow() {
  console.log('初始化窗口');
  let menu = fabricAPI.windowElementer.createMenu('fabricMianMenu', 'Fabric');
  let menuItem = fabricAPI.windowElementer.createMenuItem('打开或关闭fabric窗口');
  let fabiricMianWindow = fabricAPI.windowElementer.createFabrcWindow('fabricMainWindow', 800, 'div', 'fabricMainWindow');
  fabricAPI.windowElementer.closeElement(fabiricMianWindow);
  console.log('窗口', fabiricMianWindow);
  menuItem.addEventListener('click', () => {
    fabricAPI.windowElementer.turnDisplay(fabiricMianWindow);
  });
  // 关闭窗口
  fabricAPI.someElements.movePanelHolder?.appendChild(fabiricMianWindow);
  console.log('移动', fabricAPI.someElements.movePanelHolder);
  fabricAPI.windowElementer.insertMenu(menu, [menuItem], 0, true);
}

/**
 * Fabric初始化
 */
async function initFabricAPI() {
  await initContext();
  await initSocket();
  initStyle('fabricStyle', fabricStyle.fabricCSS);
  initELement();
  initMainWindow();
  // 添加一些其他元素
  // @ts-ignore
  fabricAPI.messageContext.window.fabricAPI = fabricAPI;
  // @ts-ignore
  window.top.fabricAPI = fabricAPI;
}

export const init = {
  sleep,
  initContext,
  initSocket,
  initELement,
  initStyle,
  initMainWindow,
  initFabricAPI
}