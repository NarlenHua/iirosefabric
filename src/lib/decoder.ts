import { MessageClass } from "./message";
function decodeMessage(message: string) {
  let messageObjList = []
  if (message.search(/^"[^"].*/gm) == 0) {
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      let message_list = temp_list[i].split('>')
      messageObjList.push(new MessageClass.PublicMessage(message_list))
    }
  } else if (message.search(/^"".*/gm) == 0) {
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      let message_list = temp_list[i].split('>')
      messageObjList.push(new MessageClass.PrivateMessage(message_list))
    }
  } else {
    messageObjList.push(new MessageClass.UnkonwMessage(message))
  }
  return messageObjList;
}
export const decoder = {
  decodeMessage,
}