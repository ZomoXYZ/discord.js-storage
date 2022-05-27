import { setFlag } from "./flags";
import { globalStorage, initGlobalCache } from './storage'

function test2() {
    let storage = globalStorage()
    storage.set({
        a: 'aaaaa',
        b: 'bbbbb',
        c: 'ccccc',
    })
}

function test() {
    setFlag('dir', './data')
    initGlobalCache({
        a: 'aaa',
        b: 'bbb',
    })
    let storage = globalStorage()
    console.log(storage.get())
    test2()
    console.log(storage.get())
}

test()
