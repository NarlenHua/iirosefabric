import { decoder } from "./decoder";
import { FabricAPI } from "./fabricAPI";
export class FabricSocket {
    beforeSend: any;
    originalSend: any;
    afterSend: any;
    send: any;
    beforOnmessage: any;
    originalOnmessage: any;
    afterOnmessage: any;
    onmessage: any;
    /**
   * 异步延时函数
   * @param {时间毫秒} ms
   */
    async sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async initSocket(api: FabricAPI) {
        console.log('代理网络');
        for (let index = 0; index < 10; index++) {
            try {
                console.log('网络代理', index);
                // @ts-ignore
                if (window["socket"].__onmessage != undefined || window["socket"]._onmessage == undefined || window["socket"]._send == undefined) {
                    console.log('界面还没加载')
                    // 等待一下
                    await this.sleep(500);
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
        this.originalSend = window.socket.send;
        this.beforeSend = (param: string) => {
            console.debug(`发送消息"${param}"`);
            return true;
        }
        this.afterSend = (param: string) => {
            console.debug(`成功发送"${param}"`);
        }
        this.send = (param: any) => {
            if (this.beforeSend!(param) as boolean) {
                this.originalSend!(param);
                this.afterSend!(param as string);
            }
        }
        // 覆写原来的发送函数
        // @ts-ignore
        socket.send = this.send;
        // 接收
        // @ts-ignore
        this.originalOnmessage = socket._onmessage
        this.beforOnmessage = (param: any) => {
            console.debug('收到消息' + param);
            return true
        }
        this.afterOnmessage = (param: any) => {
            let tempMessageList = decoder.decodeMessage(param as string)
            for (let message of tempMessageList) {
                console.debug('准备触发事件' + message.messageClass)
                api.emitter.emit(message.messageClass, message)
            };
        }
        this.onmessage = (param: string) => {
            if (this.beforOnmessage(param)) {
                this.originalOnmessage(param);
                this.afterOnmessage(param);
            }
        }
        // 覆写接收函数
        // @ts-ignore
        socket._onmessage = this.onmessage;
    }
}
