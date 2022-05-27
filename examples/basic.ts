import { setFlag, globalStorage, initGlobalCache } from '..'

function modifyStorage() {
    let storage = globalStorage()
    storage.set({
        a: 'aaaaa',
        b: 'bbbbb',
        c: 'ccccc',
    })
}

function main() {
    //change the storage directory
    setFlag('dir', './data')

    //initialize global cache with data
    initGlobalCache({
        a: 'aaa',
        b: 'bbb',
    })

    //get an instance of the global cache
    let storage = globalStorage()
    console.log(storage.get())

    //modify another instance of the global cache
    modifyStorage()
    console.log(storage.get())
}

main()
