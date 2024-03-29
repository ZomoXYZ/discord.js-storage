import { Guild } from 'discord.js'
import { setFlag, globalStorage, guildStorage } from '..'

interface StorageData {
    pingCount: number
}

const DefaultStorage: StorageData = {
    pingCount: 0,
}

function main() {
    //change the storage directory
    setFlag('dir', './data/test')

    let globalStor = globalStorage<StorageData>()
    let guildStor = guildStorage<StorageData>({ id: '000' } as Guild)

    let globalJson = globalStor.getJson(DefaultStorage)
    let guildJson = guildStor.getJson(DefaultStorage)

    globalJson.pingCount++
    console.log(globalJson, guildJson)

    if (guildJson) guildJson.pingCount++
    console.log(globalJson, guildJson)

    globalStor.set(globalJson)
    if (guildStor && guildJson) guildStor.set(guildJson)
}

main()
// setTimeout(() => main(), 1000)
// setTimeout(() => main(), 2000)
