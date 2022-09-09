import { Guild } from 'discord.js'
import { setFlag, globalStorage, guildStorage } from '..'

interface StorageData {
    pings: number[]
}

const DefaultStorage: StorageData = {
    pings: [],
}

function main() {
    //change the storage directory
    setFlag('dir', './data/test')

    let globalStor = globalStorage<StorageData>()
    let guildStor = guildStorage<StorageData>({ id: '000' } as Guild)

    let globalJson = globalStor.getJson(DefaultStorage)
    let guildJson = guildStor.getJson(DefaultStorage)

    globalJson.pings.push(Date.now())
    console.log(globalJson, guildJson)

    if (guildJson) guildJson.pings.push(Date.now())
    console.log(globalJson, guildJson)

    globalStor.set(globalJson)
    if (guildStor && guildJson) guildStor.set(guildJson)
}

main()
// setTimeout(() => main(), 1000)
// setTimeout(() => main(), 2000)
