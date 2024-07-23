import { decoder } from "./decoder";
import { emitter } from "./emitter";

export let fabricSocket = {
    // 发送消息
    beforeSend(param: string): string | null {
        console.log(`发送消息"${param}"`);
        return param;
    },
    originalSend(param: any) { return param; },
    afterSend(param: string) {
        console.log(`成功发送"${param}"`);
    },
    send(param: any) {
        let temp: string | null = fabricSocket.beforeSend(param);
        if (temp != null) {
            fabricSocket.originalSend!(temp);
            fabricSocket.afterSend!(temp);
        }
    },
    // 接收消息
    beforOnmessage(param: any) {
        console.log(`收到消息 "${param}"`);
        return param;
    },
    originalOnmessage(param: string) { return param; },
    afterOnmessage(param: any) {
        let tempMessageList = decoder.decodeMessage(param as string)
        console.debug(`收到消息 "${param}"`);
        for (let message of tempMessageList) {
            console.debug('准备触发事件', message.messageClass, message);
            emitter.emit(message.messageClass, message)
        };
    },
    onmessage(param: string) {
        let temp: string | null = fabricSocket.beforOnmessage(param);
        if (temp != null) {
            fabricSocket.originalOnmessage(temp);
            fabricSocket.afterOnmessage(temp);
        }
    }
}
