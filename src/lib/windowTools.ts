import { fabricStyle } from "./fabricStyle";
import { fabricSVG } from "./fabricSVG";
import { iiroseElements } from "./iiroseElements";

export const windowTools = {
  /**
   * 创建标签元素
   * @param tag 标签类型
   * @param id id
   * @param className 要添加的类型
   * @param textContent 文本内容
   * @returns 创建好的标签
   */
  createItem(tag: string = 'div', id?: string, className?: string, textContent?: string): HTMLElement {
    let elementTemp = document.createElement(tag);
    (id == undefined) || (elementTemp.id = id);
    (className == undefined) || (elementTemp.classList.add(className));
    (textContent == undefined) || (elementTemp.textContent = textContent);
    return elementTemp;
  },

  /**
   * @param id 窗口id
   * @param width 窗口宽
   * @param workSpace 工作区元素
   * @param title 标题
   * @param height 窗口高
   * @returns 
   */
  createFabrcWindow(id: string, width: number, workSpace: HTMLElement = windowTools.createItem('div', `${id}-workspace`, fabricStyle.class["fabric-window-workspace"]), title: string = id, height: number = width / 4 * 3) {
    // 最外层窗口       
    let fabricWindow = windowTools.createItem('div', id, fabricStyle.class["fabric-window"]);
    fabricWindow.style.width = `${width}px`;
    fabricWindow.style.height = `${height + 20}px`;
    // 菜单栏
    let menubar = windowTools.createItem('div');
    menubar.classList.add(fabricStyle.class["fabric-window-menubar"]);
    // 标题栏
    let menubarTitle = windowTools.createItem('div');
    menubarTitle.classList.add(fabricStyle.class["fabric-window-menubartitle"]);
    menubarTitle.textContent = title;
    // 按键
    let minimizeButton = windowTools.createItem('div');
    minimizeButton.classList.add(fabricStyle.class["fabric-window-menubarbutton"]);
    minimizeButton.innerHTML = fabricSVG.min;
    let medimizeButton = windowTools.createItem('div');
    medimizeButton.classList.add(fabricStyle.class["fabric-window-menubarbutton"]);
    medimizeButton.innerHTML = fabricSVG.med;
    let maximizeButton = windowTools.createItem('div');
    maximizeButton.classList.add(fabricStyle.class["fabric-window-menubarbutton"]);
    maximizeButton.innerHTML = fabricSVG.max;
    let closeButton = windowTools.createItem('div');
    closeButton.classList.add(fabricStyle.class["fabric-window-menubarbutton"]);
    closeButton.innerHTML = fabricSVG.close;
    // 工作区
    // let workSpace = windowTools.createItem(workspaceTag, `${id}-workspace`, fabricStyle.class["fabric-window-workspace"]);
    // 添加按键功能
    minimizeButton.addEventListener('click', () => {
      windowTools.closeElement(fabricWindow);
    });
    closeButton.addEventListener('click', () => {
      windowTools.closeElement(fabricWindow);
    });
    // 组合
    menubar.appendChild(menubarTitle);
    menubar.appendChild(minimizeButton);
    menubar.appendChild(medimizeButton);
    menubar.appendChild(maximizeButton);
    menubar.appendChild(closeButton);
    fabricWindow.appendChild(menubar);
    fabricWindow.appendChild(workSpace);
    // 添加拖动功能
    let dragging = false
    let offsetX: number
    let offsetY: number
    menubarTitle.onmousedown = (e) => {
      console.log('按下')
      offsetX = e.clientX - fabricWindow.offsetLeft;
      offsetY = e.clientY - fabricWindow.offsetTop;
      (dragging == false) && (dragging = true);
      document.onmousemove = (e) => {
        if (dragging) {
          fabricWindow.style.left = `${e.clientX - offsetX}px`;
          fabricWindow.style.top = `${e.clientY - offsetY}px`;
        }
      }
      document.onmouseup = () => {
        console.log('抬起');
        dragging && (dragging = false);
        document.onmousemove = null
      }
    }
    // 拖拽功能适配移动端
    menubarTitle.ontouchstart = (e) => {
      console.log('按下')
      offsetX = e.touches[0].clientX - fabricWindow.offsetLeft;
      offsetY = e.touches[0].clientY - fabricWindow.offsetTop;
      (dragging == false) && (dragging = true);
      document.ontouchmove = (e) => {
        if (dragging) {
          fabricWindow.style.left = `${e.touches[0].clientX - offsetX}px`;
          fabricWindow.style.top = `${e.touches[0].clientY - offsetY}px`;
        }
      }
      document!.ontouchend = () => {
        console.log('抬起');
        dragging && (dragging = false);
        document.onmousemove = null;
      }

    }

    fabricWindow.style.left = `${(window.innerWidth - width) / 2}px`;
    fabricWindow.style.top = `${(window.innerHeight - height + 20) / 2}px`;
    return fabricWindow;
  },
  /**
   * 创建一个一级菜单
   * @param id 菜单id
   * @param name 菜单名字
   * @returns 菜单元素
   */
  createMenu(id: string, name: string): HTMLElement {
    // 一级菜单
    let fabricMenu = windowTools.createItem('div');
    fabricMenu.id = id;
    fabricMenu.classList.add("functionButton");
    fabricMenu.classList.add("functionButtonGroup");
    fabricMenu.innerHTML = `<span class="functionBtnIcon mdi-flag"></span><span class="functionBtnFont">${name}</span><span class="functionBtnGroupIcon"></span>`;
    return fabricMenu;
  },
  /**
   * 创建一个二级菜单元素
   * @returns 菜单元素
   */
  createMenuItem(name: string): HTMLElement {
    // 一级菜单
    let fabricMenuItem: HTMLElement = windowTools.createItem('div', undefined, 'functionButton');
    fabricMenuItem.innerHTML = `<span class="functionBtnIcon mdi-music-box-multiple" style=""></span><span class="functionBtnFont">${name}</span>`;
    return fabricMenuItem;
  },
  /**
   * 关闭元素显示
   * @param ele 要关闭的元素
   */
  closeElement(ele: HTMLElement) {
    ele.style.display = 'none';
  },
  /**
   * 打开元素显示
   * @param ele 要打开的元素
   */
  openElement(ele: HTMLElement) {
    ele.style.display = 'block';
  },
  /**
   * 翻转元素是否显示
   * @param ele 要控制显示的元素
   */
  turnDisplay(ele: HTMLElement) {
    // console.log("按下" + nextFlag);
    let displayFlag = window.getComputedStyle(ele).display;

    if (displayFlag == 'none')
      windowTools.openElement(ele);
    else
      windowTools.closeElement(ele);
  },

  /**
   * 添加菜单
   * @param Menu 一级菜单元素
   * @param items 二级菜单元素列表
   * @param num 要添加到哪个子元素（下标）之前，null表示添加到父元素的子元素列表最后
   * @param isbefore 是否添加到前面
   */
  insertMenu(Menu: HTMLElement, items: HTMLElement[], num: number, isbefore: boolean) {
    // 将二级菜单合并在一起。
    let functionItemBox: HTMLElement = windowTools.createItem('div', undefined, 'functionItemBox');
    for (let i = 0; i < items.length; i++) {
      console.log('插入元素', i, items[i]);
      functionItemBox.append(items[i]);
    }
    // 把二级菜单关上
    windowTools.closeElement(functionItemBox);
    Menu.addEventListener('click', () => {
      windowTools.turnDisplay(functionItemBox);
    });
    // 更新列表
    iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
    if (isbefore) {
      console.log('添加菜单', Menu);
      iiroseElements.functionButtonGroupList![num].before(Menu);
      iiroseElements.functionButtonGroupList![num].before(functionItemBox);
    } else {
      iiroseElements.functionButtonGroupList![num].after(functionItemBox);
      iiroseElements.functionButtonGroupList![num].after(Menu);
    }
    // 插入完成后也更新一下
    iiroseElements.functionButtonGroupList = [...document.querySelectorAll('.functionButton.functionButtonGroup')];
  }
}