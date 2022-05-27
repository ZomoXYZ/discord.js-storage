import { Guild } from 'discord.js'
import { setFlag, globalStorage, guildStorage } from '..'
import { GuildStorage } from '../lib/storageclass'

const DefaultStorage = {
    pingCount: 0,
}

function main() {
    //change the storage directory
    setFlag('dir', './data/test')

    let globalStor = globalStorage()
    let guildStor = guildStorage({ id: '000' } as Guild) as
        | GuildStorage
        | undefined

    let globalJson = globalStor.getJson(DefaultStorage)
    let guildJson = guildStor?.getJson(DefaultStorage)

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
