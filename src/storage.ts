import { Guild } from 'discord.js'
import { readFile, writeFile } from './fs'
import { GlobalStorage, GuildStorage, StorageValue } from './storageclass'
import { defaultJsonString, JSONObject } from './util'

var GlobalCache = ''
/** Map<guild id, stringified data> */
const GuildCache = new Map<string, string>()

export function initGlobalCache<T = JSONObject>(defaultValue?: string | T) {
    defaultValue = structuredClone(defaultValue)
    if (GlobalCache.length === 0) {
        let data = readFile('global')
        GlobalCache = defaultJsonString(data, defaultValue)
    }
}

export function initGuildCache<T = JSONObject>(
    guild: Guild,
    defaultValue?: string | T
) {
    defaultValue = structuredClone(defaultValue)
    if (!GuildCache.has(guild.id)) {
        let data = readFile(guild)
        GuildCache.set(guild.id, defaultJsonString(data, defaultValue))
    }
}

export function globalStorage<T = JSONObject>() {
    initGlobalCache()

    let val: StorageValue = {
        get: () => GlobalCache,
        set: (val: string) => {
            GlobalCache = val
            writeFile('global', val)
        },
    }
    return new GlobalStorage<T>(val)
}

export function guildStorage<T = JSONObject>(guild: Guild) {
    initGuildCache(guild)

    let val = {
        get: () => GuildCache.get(guild.id) || '',
        set: (val: string) => {
            GuildCache.set(guild.id, val)
            writeFile(guild, val)
        },
    }
    return new GuildStorage<T>(guild, val)
}
