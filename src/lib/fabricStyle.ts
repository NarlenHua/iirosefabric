import { windowElementer } from "./windowElementer";

/**
 * 添加样式
 */
async function addStyle(id: string, css: string) {
    console.log('添加样式');
    let st = windowElementer.createItem('style');
    st.id = id;
    st.innerHTML = css;
    document.head.appendChild(st);
}

export const fabricStyle = {
    'fabricCSS': '.fabric-window{position:absolute;z-index:1000;background-color:#c4d7d6;box-shadow:3px 3px 2px 1px #0f776d}.fabric-window-menubar{display:flex;flex-direction:row;height:20px;width:100%;background-color:#57c3c2}.fabric-window-menubartitle{text-align:center;height:100%;width:calc(100% - 80px);color:#000;background-color:#12aa9c;cursor:move}.fabric-window-menubarbutton{margin:1px;height:19px;width:19px;background-color:#428675;cursor:pointer}.fabric-window-workspace{overflow:scroll;height:calc(100% - 20px);width:100%;color:#000}.icon{width:100%;width:100%}',
    'class': {
        'fabric-window': 'fabric-window',
        'fabric-window-menubar': 'fabric-window-menubar',
        'fabric-window-menubartitle': 'fabric-window-menubartitle',
        'fabric-window-menubarbutton': 'fabric-window-menubarbutton',
        'fabric-window-workspace': 'fabric-window-workspace'
    },
    addStyle
} 