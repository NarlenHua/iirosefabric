// import { TinyEmitter } from 'tiny-emitter';
// @ts-ignore
import { config } from '../../config';
import { encoder } from './encoder';
import { decoder } from './decoder'
import { FabricSocket } from './fabricSocket';
import { TinyEmitter } from 'tiny-emitter';
import { fabricSVG } from './fabricSVG'
import { fabricStyle } from './fabricStyle';
import { IirsoeElements } from './iiroseElement';
import { WindowElementer } from './windowElementer';
import { Ingector } from './ingector';


export class FabricAPI {
  version: string = config.version;
  fabricSVG = fabricSVG;
  fabricStyle = fabricStyle;
  encoder = encoder;
  decoder = decoder;
  emitter: TinyEmitter = new TinyEmitter();
  socket: FabricSocket = new FabricSocket();
  iiroseElements: IirsoeElements = new IirsoeElements();
  windowElementer: WindowElementer = new WindowElementer();
  ingector: Ingector = new Ingector();
  /**
   * 添加样式 
   * @param id style元素的id
   * @param css CSS代码
   */
  async addStyle(id: string, css: string) {
    console.log('添加样式', id);
    let st = document.createElement('style');
    st.id = id;
    st.innerHTML = css;
    document.head.appendChild(st);
  }
  // 初始化主窗口
  async initMainWindow() {
    console.log('初始化窗口');
    // 一级菜单二级菜单
    let menu = this.windowElementer.createMenu('fabricMianMenu', 'Fabric');
    let menuItem1 = this.windowElementer.createMenuItem('fabric设置');
    let menuItem2 = await this.ingector.creatIngectorWindow();
    // 工作区
    let workSpace: HTMLElement = this.windowElementer.createItem('div', `fabricMainWindow-workspace`, fabricStyle.class["fabric-window-workspace"]);

    let button0 = this.windowElementer.createItem('button', undefined, undefined, '打开Eruda');
    button0.style.backgroundColor = 'green';
    // @ts-ignore
    button0.onclick = () => { eruda.init(); eruda.position({ x: window.innerWidth - 100, y: window.innerHeight - 50 }); };
    let button1 = this.windowElementer.createItem('button', undefined, undefined, '关闭Eruda');
    button1.style.backgroundColor = 'yellow';
    // @ts-ignore
    button1.onclick = () => { eruda.destroy(); }
    let button2 = this.windowElementer.createItem('button', undefined, undefined, '设置是否自动启动Eruda');
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
    let button3 = this.windowElementer.createItem('button', undefined, undefined, '设置遇到错误是否自动重启');
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
    let button4 = this.windowElementer.createItem('button', undefined, undefined, '打开PageSpy');
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
    let button5 = this.windowElementer.createItem('button', undefined, undefined, '注入PageSpy');
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
    let button6 = this.windowElementer.createItem('button', undefined, undefined, '设置PageSpy服务器地址');
    button6.style.backgroundColor = 'yellow';
    // @ts-ignore
    button6.onclick = () => {
      let urlTemp = prompt("不要轻易输入陌生人给的调试服务器地址，远程调试人员将看到你的所有数据！！！\n请输入PageSpy服务器地址:");
      if (urlTemp != null && urlTemp != "") {
        localStorage.setItem('pageSpyURL', urlTemp);
      }
    }
    let button7 = this.windowElementer.createItem('button', undefined, undefined, '删除缓存');
    button7.style.backgroundColor = 'green';
    // @ts-ignore
    button7.onclick = async () => {
      await caches.delete('v');
      // @ts-ignore
      _alert('浏览器缓存已经删除');
    }

    let dis1 = this.windowElementer.createItem('p', undefined, undefined, '实验性：');
    let dis2 = this.windowElementer.createItem('div', undefined, undefined, '<a href="https://www.pagespy.org/">PageSpy远程调试工具官网</a>  具备调试修复功能，当因为网络等原因无法进入时，可以点击在右下角打开调试工具，运行"iirosesave()"将保存存档，运行"iiroserepair()"将尝试修复程序，修复后重载可能可以进入,运行"closeconsole()"将关闭调试工具。');
    workSpace.append(button0, button1, button2, button3, button7, dis1, button4, button5, button6, dis2);
    let fabiricMianWindow = this.windowElementer.createFabrcWindow('fabricMainWindow', 400, workSpace);
    // 关闭窗口
    this.windowElementer.closeElement(fabiricMianWindow);
    console.log('窗口', fabiricMianWindow);
    menuItem1.onclick = () => { this.windowElementer.turnDisplay(fabiricMianWindow); };
    this.iiroseElements.movePanelHolder?.appendChild(fabiricMianWindow);
    console.log('移动', this.iiroseElements.movePanelHolder);
    this.windowElementer.insertMenu(menu, [menuItem1, menuItem2], 0, true);
  }
  async initFabricAPI() {
    // 初始化socket
    await this.socket.initSocket(this);
    // 初始化
    await this.iiroseElements.initElements();
    await this.windowElementer.initWindowElementer(this);
    await this.ingector.initIngector(this);
    // 注入CSS
    await this.addStyle('fabricStyle', this.fabricStyle.fabricCSS);
    await this.addStyle('ingectorStyle', this.ingector.ingectorStyle.ingectorCSS);
    await this.initMainWindow();
    // 将接口注入到环境中
    // @ts-ignore
    window.fabricAPI = this;
    // @ts-ignore
    window.top.fabricAPI = this;
    // 运行外部脚本
    await this.ingector.runEnd();
    // 替换缓存里的
    await this.ingector.replaceHTML();
    // @ts-ignore
    _alert("Fabric注入成功")
  }
}
