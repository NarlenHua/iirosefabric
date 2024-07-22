export namespace MessageClass {
  export class PublicMessage {
    timeStamp: string
    headPortrait: string
    name: string
    message: string
    color: string
    gender: string
    uid: string
    title: string
    messageUid: string
    messageClass: string
    constructor(message_list: string[]) {
      this.timeStamp = message_list[0],
        this.headPortrait = message_list[1],
        this.name = message_list[2],
        this.message = message_list[3],
        this.color = message_list[4],
        this.gender = message_list[6],
        this.uid = message_list[8],
        this.title = message_list[9],
        this.messageUid = message_list[10],
        this.messageClass = "PublicMessage"
    }
  }
  export class PrivateMessage {
    timeStamp: string
    headPortrait: string
    name: string
    message: string
    color: string
    gender: string
    uid: string
    messageUid: string
    messageClass: string
    constructor(message_list: string[]) {
      this.timeStamp = message_list[0].slice(2),
        this.uid = message_list[1],
        this.name = message_list[2],
        this.headPortrait = message_list[3],
        this.message = message_list[4],
        this.color = message_list[5],
        this.gender = message_list[8],
        this.messageUid = message_list[10],
        this.messageClass = "PrivateMessage"
    }
  }
  export class HiddenMessage {
    messageName: string
    uid: string
    data: string
    messageClass: string
    constructor(message: string) {
      let temp;
      temp = message.match(/(?<=^[/]<).*(?=>[0-9|a-z]{13}:.*)/gm);
      this.messageName = (temp == null) ? '' : temp[0];
      temp = message.match(/(?<=^[/]<.*>)[0-9|a-z]{13}(?=:.*)/gm);
      this.uid = (temp == null) ? '' : temp[0];
      temp = message.match(/(?<=^[/]<.*>[0-9|a-z]{13}:).*/gm);
      this.data = (temp == null) ? '' : temp[0];
      this.messageClass = 'HidenMessage';
    }
  }
  export class UnkonwMessage {
    message: string
    messageClass: string
    constructor(message: string) {
      this.message = message
      this.messageClass = "UnkonwMessage"
    }
  }

}