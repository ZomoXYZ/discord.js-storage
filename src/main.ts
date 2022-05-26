/*

initGlobalStorage()
initChannelStorage(channel/channels)

channelStorage(channel) => Storage

Storage {
    get() => string
    set(string | json)

    getJson() => json
}

*/

import { JSONObject } from './util'

class StorageBase {
    val: string
    fallbackJSON: JSONObject
    constructor(val: string | JSONObject, fallbackJSON?: JSONObject) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        if (fallbackJSON === undefined) {
            fallbackJSON = val.constructor() as JSONObject
        }
        this.val = val
        this.fallbackJSON = fallbackJSON
    }
    set(val: string | JSONObject) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        this.val = val
    }

    get(): string {
        return this.val
    }

    getJson(): JSONObject {
        let val
        try {
            val = JSON.parse(this.val)
        } catch (e) {
            val = {}
        }
        return val
    }
}
