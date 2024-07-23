
export declare const fabricSocket: {
    beforeSend(_param: string): string | null;
    originalSend(_param: string): string;
    afterSend(_param: string): void;
    send(_param: any): any;
    beforOnmessage(_param: string): string | null;
    originalOnmessage(_param: string): string;
    afterOnmessage(_param: string): void;
    onmessage(_param: any): any;
}
