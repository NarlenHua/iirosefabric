function encodePublicMessage(message: string, color: string) {
    if (message === 'cut') {
        return `{0${JSON.stringify({
            m: message,
            mc: color,
            i: Math.random().toString().slice(2, 12)
        })}`
    }
    return JSON.stringify({
        m: message,
        mc: color,
        i: Math.random().toString().slice(2, 12)
    })
}
function encodePrivateMessage(uid: string, message: string, color: string) {
    return JSON.stringify({
        g: uid,
        m: message,
        mc: color,
        i: Math.random().toString().slice(2, 12)
    })
}

export const encoder = {
    'encodePublicMessage': encodePublicMessage,
    'encodePrivateMessage': encodePrivateMessage
}