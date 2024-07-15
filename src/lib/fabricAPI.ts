import { TinyEmitter } from 'tiny-emitter'
import { MessageClass } from "./message";
import { decoder } from './decoder'
import { encoder } from './encoder'
import { windowElementer } from './windowElementer'
import { fabricSVG } from '../static/svg/fabricSVG'
import { init } from './init'
/**
 * 定义了接口
 */
export interface FabricAPI {
  version: string,
  init: {
    sleep: (...param: any[]) => any,
    initContext: (...param: any[]) => any,
    initSocket: (...param: any[]) => any,
    initStyle: (...param: any[]) => any,
    initMainWindow: (...param: any[]) => any,
    initFabricAPI: (...param: any[]) => any,
  },
  emitter: TinyEmitter,
  MessageClass: {
    PublicMessage: {},
    PrivateMessage: {},
    UnkonwMessage: {}
  },
  encoder: {},
  decoder: {},
  fabricSVG: {},
  windowElementer: {
    createItem: (...param: any[]) => any,
    createFabrcWindow: (...param: any[]) => any,
    createMenu: (...param: any[]) => any,
    createMenuItem: (...param: any[]) => any,
    closeElement: (...param: any[]) => any,
    openElement: (...param: any[]) => any,
    turnDisplay: (...param: any[]) => any,
    insertMenu: (...param: any[]) => any,
  },
  topcontext: {
    iframe?: HTMLIFrameElement,
    window?: Window,
    document?: Document,
  },
  messageContext: {
    iframe?: HTMLIFrameElement,
    window?: Window,
    document?: Document,
  },
  socket: {
    beforeSend?: (param: string) => any,
    afterSend?: (param: string) => any,
    beforOnmessage?: (param: string) => any,
    afterOnmessage?: (param: string) => any,
    originalSend?: (param: any) => any,
    originalOnmessage?: (param: any) => any,
    onmessage?: (param: string) => any,
    send?: (param: any) => any,
  },
  someElements: {
    movePanelHolder?: Element | null,
    functionHolder?: Element | null,
    functionButtonGroupList?: Element[],
  }
}
/**
 * 
 */
export const fabricAPI: FabricAPI = {
  version: '0.0.1',
  init: init,
  emitter: new TinyEmitter(),
  MessageClass: {
    PublicMessage: MessageClass.PublicMessage,
    PrivateMessage: MessageClass.PrivateMessage,
    UnkonwMessage: MessageClass.UnkonwMessage
  },
  encoder: encoder,
  decoder: decoder,
  fabricSVG: fabricSVG,
  windowElementer: windowElementer,
  topcontext: {},
  messageContext: {},
  socket: {},
  someElements: {}
}
