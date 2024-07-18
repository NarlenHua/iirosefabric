import { fabricAPI } from "./fabricAPI";
import { fabricStyle } from "./fabricStyle";
import { windowElementer } from "./windowElementer";

// 样式
const ingectorStyle = {
  'ingectorCSS': '.ingector-table{background-color:#cd9f9f;width:100%;table-layout:fixed;text-align:center}.ingector-title{background-color:#b99}.ingector-linkname{background-color:#ffd0d0}.ingector-link{background-color:#fdb8b8}.ingector-choice{background-color:#ff9f9f}.ingector-table input{width:90%;text-align:center}.ingector-table button{width:90%;text-align:center}',
  'class': {
    'ingector-text': 'ingector-text',
    'ingector-table': 'ingector-table',
    'ingector-linkname': 'ingector-linkname',
    'ingector-link': 'ingector-link',
    'ingector-choice': 'ingector-choice'
  }
}

// 保存
// @ts-ignore
function iirosesave() { Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")); try { Utils.service.saveStatus(0) } catch (e) { sendBug(e, "saveStatus") } for (var t, o = {}, i = 0, a = localStorage.length; i < a; ++i)o[t = localStorage.key(i)] = localStorage.getItem(t); var e = JSON.stringify(o), s = new Date, s = [s.getFullYear(), Utils.smallTools.zeroFill(s.getMonth() + 1), Utils.smallTools.zeroFill(s.getDate())].join("-") + "_" + [Utils.smallTools.zeroFill(s.getHours()), Utils.smallTools.zeroFill(s.getMinutes()), Utils.smallTools.zeroFill(s.getSeconds())].join("-"), r = uid + "_" + s + ".bak.iirose", s = pako.gzip(e, { level: 9 }), e = new Uint8Array(s.length + 3); e[0] = 2, e[1] = 33, e[s.length + 2] = 77, e.set(s, 2), e = new Blob([e]), 5 == device ? Utils.blobToDataURL(e, function (e) { Main.saveFile(e, r) }) : Utils.service.downloadBlob(e, r) }
// 修复
// @ts-ignore
function iiroserepair() { localStorage.removeItem('functionPos'); location.reload(true); }
// 打开调试工具
// @ts-ignore
function openconsole() { eruda.init(); }
// 关闭调试工具
// @ts-ignore
function closeconsole() { eruda.destroy(); }

function runBegain() {
  let er = document.createElement('script');
  er.src = "https://cdn.bootcdn.net/ajax/libs/eruda/3.1.0/eruda.min.js";
  document.body.append(er);
  // @ts-ignore
  er.onload = () => { eruda.init(); eruda.position({ x: window.innerWidth - 20, y: window.innerHeight - 20 }); }
  // 把保存、退出、尝试修复函数注入到环境中
  // @ts-ignore
  window.iirosesave = () => { Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")); try { Utils.service.saveStatus(0) } catch (e) { sendBug(e, "saveStatus") } for (var t, o = {}, i = 0, a = localStorage.length; i < a; ++i)o[t = localStorage.key(i)] = localStorage.getItem(t); var e = JSON.stringify(o), s = new Date, s = [s.getFullYear(), Utils.smallTools.zeroFill(s.getMonth() + 1), Utils.smallTools.zeroFill(s.getDate())].join("-") + "_" + [Utils.smallTools.zeroFill(s.getHours()), Utils.smallTools.zeroFill(s.getMinutes()), Utils.smallTools.zeroFill(s.getSeconds())].join("-"), r = uid + "_" + s + ".bak.iirose", s = pako.gzip(e, { level: 9 }), e = new Uint8Array(s.length + 3); e[0] = 2, e[1] = 33, e[s.length + 2] = 77, e.set(s, 2), e = new Blob([e]), 5 == device ? Utils.blobToDataURL(e, function (e) { Main.saveFile(e, r) }) : Utils.service.downloadBlob(e, r) };
  // @ts-ignore
  window.iiroserepair = () => { localStorage.removeItem('functionPos'); location.reload(true); }
  // @ts-ignore
  window.openconsole = () => { eruda.init(); };
  // @ts-ignore
  window.closeconsole = () => { eruda.destroy(); };
  // 注入js
  let temp = localStorage.getItem(`externalResources0`);
  let data: [string, string, number][] = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log(data);
  }
  // 将读取到的js注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let jsTemp = document.createElement('script');
      jsTemp.src = data[i][1];
      document.body.append(jsTemp);
    }
}

function runEnd() {
  // 注入js
  let temp = localStorage.getItem(`externalResources0`);
  let data: [string, string, number][] = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log(data);
  }
  // 将读取到的js注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let jsTemp = document.createElement('script');
      jsTemp.src = data[i][1];
      document.body.append(jsTemp);
    }
  // 注入CSS
  temp = localStorage.getItem(`externalResources1`);
  data = [];
  if (temp == null) return;
  else {
    data = JSON.parse(temp);
    console.log(data);
  }
  // 将读取到的CSS注入
  for (let i = 0; i < data.length; i++)
    if (data[i][2] == 0) {
      let linkTemp = document.createElement('link');
      // 设置 <link> 元素的属性
      linkTemp.rel = 'stylesheet'; // 指定为样式表
      linkTemp.type = 'text/css';   // 指定类型为CSS
      linkTemp.href = data[i][1]; // 设置CSS文件的路径
      // 将 <link> 元素添加到 <head> 元素中
      document.head.appendChild(linkTemp);
    }
}
/**
  * message页面请求拦截注入外部js和函数
  * @param scripturls js外部链接
  * @param functions 函数列表
*/

async function replaceHTML(scripturls?: string[], functions?: Array<() => void>) {
  let message: string = (await (await fetch('https://iirose.com/messages.html?timestamp=new%20Date().getTime()')).text());
  let scriptTemp: string = `<script>${runBegain}${runBegain.name}();</script>`;
  if (scripturls != undefined)
    for (let i = 0; i < scripturls.length; i++)
      scriptTemp = scriptTemp + `<scrpit src="${scripturls[i]}"></script>`
  if (functions != undefined)
    for (let i = 0; i < functions.length; i++)
      scriptTemp = scriptTemp + `<scrpit>${functions[i]}${functions[i].name}();</script>`
  let newMessage: string = message.slice(0, message.length - 14) + scriptTemp + message.slice(message.length - 14);
  // 打开花园的缓存,将缓存写入
  await (await caches.open('v')).put(
    '/messages.html',
    new Response(new Blob(
      [newMessage]),
      { status: 200, statusText: "OK" }));
  // let x = await (await caches.match('/messages.html')).text();
  // console.log(x.slice(x.length - 150));

}

// 创建一个表格的一行
function createTabletr(name: HTMLElement, link: HTMLElement, choice: HTMLElement) {
  let tabletr = windowElementer.createItem('tr');
  let nametd = windowElementer.createItem('td', undefined, ingectorStyle.class["ingector-linkname"]);
  nametd.append(name);
  let linktd = windowElementer.createItem('td', undefined, ingectorStyle.class["ingector-link"]);
  linktd.append(link);
  let choicetd = windowElementer.createItem('td', undefined, ingectorStyle.class["ingector-choice"]);
  choicetd.append(choice);
  tabletr.append(nametd, linktd, choicetd);
  return tabletr;
}

// 创建一个外部资源表格
async function createTable(tableType: number, writeButton: HTMLElement, readButton: HTMLElement, addButton: HTMLElement): Promise<HTMLElement> {
  let tableElements: [HTMLElement, HTMLElement, HTMLElement, HTMLElement][] = [];
  let tableValues: [string, string, number][] = [];
  console.log('表格类型：', tableType);
  let table = windowElementer.createItem('table', undefined, ingectorStyle.class["ingector-table"]);
  let titleTemp = ''
  switch (tableType) {
    case 0:
      titleTemp = '加载后注入的js';
      break;
    case 1:
      titleTemp = '加载后注入的CSS';
      break;
    case 2:
      titleTemp = '加载前注入的js';
      break;
    // 默认加载前注入js
    default:
      titleTemp = '未知的资源';
  }
  table.innerHTML = `<thead><tr><th colspan="3" class="ingector-title">${titleTemp}</th></tr><tr><th>名称</th><th>链接</th><th>选项</th></tr></thead>`;
  let tablebody = windowElementer.createItem('tbody');
  let tabletr = createTabletr(writeButton, readButton, addButton)
  tablebody.append(tabletr);
  table.append(tablebody);
  function addline(lineValue?: [string, string, number]) {
    let name: HTMLInputElement = windowElementer.createItem('input') as HTMLInputElement;
    let link = windowElementer.createItem('input') as HTMLInputElement;
    let choice = windowElementer.createItem('button') as HTMLButtonElement;
    let value: [string, string, number];
    if (lineValue != undefined) {
      value = lineValue;
      [name.value, link.value] = [lineValue[0], lineValue[1]];
      switch (lineValue[2]) {
        case 0:
          choice.innerHTML = '保存';
          break;
        case 1:
          choice.innerHTML = '删除';
          break;
        case 2:
          choice.innerHTML = '禁用';
          break;
        default:
          choice.innerHTML = '其他';
          break;
      }
    } else {
      name.value = `第${tableElements.length + 1}个资源`;
      link.value = '';
      choice.innerHTML = '保存';
      value = [name.value, link.value, 0];
    }
    // 更换选项
    choice.onclick = () => {
      value[2] = (value[2] + 1) >= 3 ? 0 : (value[2] + 1);
      switch (value[2]) {
        case 0:
          choice.innerHTML = '保存';
          break;
        case 1:
          choice.innerHTML = '删除';
          break;
        case 2:
          choice.innerHTML = '禁用';
          break;
        default:
          choice.innerHTML = '其他';
          break;
      }
    }
    let newTabletr = createTabletr(name, link, choice);
    tablebody.insertBefore(newTabletr, tabletr);
    tableValues.splice(tableValues.length, 0, value);
    tableElements.splice(tableElements.length, 0, [name, link, choice, newTabletr]);
  }
  // 添加元素
  addButton.onclick = () => { addline() };
  // 保存数据
  writeButton.onclick = () => {
    // 更新数据并删除不合理的,表中的最后一行按钮并不在这个变量中，所以循环不需要减一来避免删除最后一排按钮
    for (let i = 0; i < tableValues.length; i++) {
      // @ts-ignore
      if (tableElements[i][0].value == '') { tableValues[i][0].value = `第${tableElements.length + 1}个资源`; tableElements[i][0].value = `第${tableElements.length + 1}个资源`; }
      // @ts-ignore
      else tableValues[i][0] = tableElements[i][0].value;
      // @ts-ignore
      tableValues[i][1] = tableElements[i][1].value;
      if (tableValues[i][1] == '' || tableValues[i][2] == 1) {
        // 删除这一行
        tableValues.splice(i, 1);
        // 删掉元素
        tableElements[i][3].remove();
        tableElements.splice(i, 1);
        // 减一，防止漏掉下一行，因为下一行的下标变成了这一行
        i--;
      }
    }
    localStorage.setItem(`externalResources${tableType}`, JSON.stringify(tableValues));
    alert('写入完成');
  }
  // 读取数据
  readButton.onclick = () => {
    let temp = localStorage.getItem(`externalResources${tableType}`)
    let data: [string, string, number][] = [];
    if (temp == null) return;
    else {
      data = JSON.parse(temp);
      console.log(data);
    }
    // 清空两个变量，删除元素
    tableValues = [];
    for (let i = 0; i < tableElements.length; i++)
      tableElements[i][3].remove();
    tableElements = [];
    // 显示读取到的
    for (let i = 0; i < data.length; i++)
      addline(data[i]);
  }
  return table;
}

/**
 * 生成管理注入js文件列表的窗口,并返回控制它开关的二级菜单
 */
async function creatIngectorWindow() {
  // 二级菜单
  let menuItem = windowElementer.createMenuItem('设置注入的资源');
  // 工作区
  let workSpace: HTMLElement = windowElementer.createItem('div', `ingectorjsWindow-workspace`, fabricStyle.class["fabric-window-workspace"])
  let table0 = await createTable(
    0,
    windowElementer.createItem('button', undefined, undefined, '写入'),
    windowElementer.createItem('button', undefined, undefined, '读取'),
    windowElementer.createItem('button', undefined, undefined, '添加')
  );
  let table1 = await createTable(
    1,
    windowElementer.createItem('button', undefined, undefined, '写入'),
    windowElementer.createItem('button', undefined, undefined, '读取'),
    windowElementer.createItem('button', undefined, undefined, '添加')
  );
  let table2 = await createTable(
    2,
    windowElementer.createItem('button', undefined, undefined, '写入'),
    windowElementer.createItem('button', undefined, undefined, '读取'),
    windowElementer.createItem('button', undefined, undefined, '添加')
  );
  let disc = windowElementer.createItem('p', undefined, undefined, '使用方法,设置选项后并不会立刻保存，需点击写入才可以，所有资源下载进入才能加载。可以设置三种状态，删除将会在写入后移除，保存会在写入后保存在本地，禁用将不会启动。写入是将当前设置的写入到本地，这样设置的才起作用。');
  let disc0 = windowElementer.createItem('p', undefined, undefined, '大多数js脚本都可以使用这个，它运行在界面加载后。');
  let disc1 = windowElementer.createItem('p', undefined, undefined, '大多数css文件都可以使用这个，它的加载也在界面加载后。');
  let disc2 = windowElementer.createItem('p', undefined, undefined, '下面设置的脚本，在界面加载时会运行，它在下次启动后会写入到缓存，即使删掉fabric也依旧会运行。');
  workSpace.append(disc, disc0, table0, disc1, table1, disc2, table2);
  let fabiricMianWindow = windowElementer.createFabrcWindow('ingectorjsWindow', 300, workSpace, '设置注入的资源', 400);
  // 关闭窗口
  // windowElementer.closeElement(fabiricMianWindow);
  console.log('窗口', fabiricMianWindow);
  menuItem.onclick = () => { windowElementer.turnDisplay(fabiricMianWindow); };
  fabricAPI.someElements.movePanelHolder?.appendChild(fabiricMianWindow);

  // 返回控制它的二级菜单
  return menuItem;
}


export const ingector = {
  ingectorStyle,
  iirosesave,
  iiroserepair,
  openconsole,
  closeconsole,
  runBegain,
  runEnd,
  creatIngectorWindow,
  replaceHTML
}