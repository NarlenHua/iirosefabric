import { messageClass } from "./messageClass";
function decodeMessage(message: string) {
  let messageObjList = []
  if (/^"[^"].*/gm.test(message)) {
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      let message_list = temp_list[i].split('>')
      messageObjList.push(new messageClass.PublicMessage(message_list))
    }
  } else if (/^"".*/gm.test(message)) {
    let temp_list = message.slice(1).split('<')
    for (let i = temp_list.length - 1; i >= 0; i--) {
      let message_list = temp_list[i].split('>')
      messageObjList.push(new messageClass.PrivateMessage(message_list))
    }
  } else if (/^[/]<.*>[0-9|a-z]{13}:.*/gm.test(message)) {
    messageObjList.push(new messageClass.HiddenMessage(message));
  }
  return messageObjList;
}
export const decoder = {
  decodeMessage,
}