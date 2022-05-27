const { build } = require('esbuild')

const define = {
    TOKEN: `"${process.argv[2]}"`,
}

build({
    entryPoints: ['examples/basic.ts'],
    outfile: 'examples/basic.js',

    target: 'es6',
    platform: 'node',
    format: 'cjs',

    define,
})

build({
    entryPoints: ['examples/test.ts'],
    outfile: 'examples/test.js',

    target: 'es6',
    platform: 'node',
    format: 'cjs',

    define,
})
