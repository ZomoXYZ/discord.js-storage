import { defaultJson, JSONObject } from './util'
import { Guild } from 'discord.js'

export interface StorageValue {
    get(): string
    set(val: string): void
}

export class StorageBase<T = JSONObject> {
    val: StorageValue

    constructor(val: StorageValue) {
        this.val = val
    }
    set(val: string | T) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        this.val.set(val)
    }

    get(): string {
        return this.val.get()
    }

    getJson(defaultValue: T): T {
        defaultValue = structuredClone(defaultValue)
        try {
            let val = JSON.parse(this.val.get())
            if (defaultValue) {
                val = defaultJson(val, defaultValue)
            }
            return val
        } catch (e) {
            if (defaultValue) {
                return defaultValue
            }

            return {} as T
        }
    }
}

export class GlobalStorage<T = JSONObject> extends StorageBase<T> {}

export class GuildStorage<T = JSONObject> extends StorageBase<T> {
    public guild: Guild

    constructor(guild: Guild, val: StorageValue) {
        super(val)
        this.guild = guild
    }
}
