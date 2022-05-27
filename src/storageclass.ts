import { JSONObject } from './util'
import { Guild } from 'discord.js'

export interface StorageValue {
    get(): string
    set(val: string): void
}

export class StorageBase {
    val: StorageValue

    constructor(val: StorageValue) {
        this.val = val
    }
    set(val: string | JSONObject) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        this.val.set(val)
    }

    get(): string {
        return this.val.get()
    }

    getJson<T extends JSONObject>(): T {
        let val
        try {
            val = JSON.parse(this.val.get())
        } catch (e) {
            val = {}
        }
        return val
    }
}

export class GlobalStorage extends StorageBase {}

export class GuildStorage extends StorageBase {
    public guild: Guild

    constructor(guild: Guild, val: StorageValue) {
        super(val)
        this.guild = guild
    }
}
