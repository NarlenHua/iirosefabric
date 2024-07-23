export let fabricSocket: any = {
    beforeSend(param: string): string | null { return param; },
    originalSend(param: string) { return param; },
    afterSend(param: string) { return param; },
    send(param: any) { return param; },
    beforOnmessage(param: any) { return param; },
    originalOnmessage(param: string) { return param; },
    afterOnmessage(param: any) { return param; },
    onmessage(param: string) { return param; }
}
