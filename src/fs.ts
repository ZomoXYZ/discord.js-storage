import { Guild } from 'discord.js'
import { readFileSync, writeFileSync, ensureDirSync, ensureFileSync } from 'fs-extra'
import { getFlag } from './flags'

type storageTypes = 'global' | Guild

function filePath(storage: storageTypes) {
    if (storage === 'global') {
        return `${getFlag('dir')}/global.json`
    }
    return `${getFlag('dir')}/guild_${storage.id}.json`
}

export function readFile(storage: storageTypes) {
    let path = filePath(storage)
    ensureFileSync(path)
    return readFileSync(path).toString()
}

export function writeFile(storage: storageTypes, data: string) {
    ensureDirSync(getFlag('dir'))
    writeFileSync(filePath(storage), data)
}
