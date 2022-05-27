import { Guild } from 'discord.js'
import { readFile, writeFile } from './fs'
import { GlobalStorage, GuildStorage } from './storageclass'
import { defaultJson, JSONObject } from './util'

var GlobalCache = ''
/** Map<guild id, stringified data> */
const GuildCache = new Map<string, string>()

export function initGlobalCache(defaultValue?: string | JSONObject) {
    if (GlobalCache.length === 0) {
        let data = readFile('global')
        GlobalCache = defaultJson(data, defaultValue)
    }
}

export function initGuildCache(
    guild: Guild,
    defaultValue?: string | JSONObject
) {
    if (!GuildCache.has(guild.id)) {
        let data = readFile(guild)
        GuildCache.set(guild.id, defaultJson(data, defaultValue))
    }
}

export function globalStorage() {
    initGlobalCache()

    let val = {
        get: () => GlobalCache,
        set: (val: string) => {
            GlobalCache = val
            writeFile('global', val)
        },
    }
    return new GlobalStorage(val)
}

export function guildStorage(guild: Guild) {
    initGuildCache(guild)

    let val = {
        get: () => GuildCache.get(guild.id) || '',
        set: (val: string) => {
            GuildCache.set(guild.id, val)
            writeFile(guild, val)
        },
    }
    return new GuildStorage(guild, val)
}
