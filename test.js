const fs = require("fs")
const expect = require("expect")

const {createTSShim} = require(".")

/** @type {import("./package.json")} */
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8")) 

console.log("Running tests")

const versions = Object.keys(pkg.devDependencies)

const skip = ["ts-13"]

versions.forEach(v => {
    delete globalThis.TypeScript

    if (!v.includes("ts-")) return
    if (skip.includes(v)) return

    console.log(`Version: ${v}`)
    let ts = require(v) 
    if (Object.keys(ts).length === 0) ts = globalThis.TypeScript

    expect(ts).toBeDefined()
    
    const brokenCode = `v ar abc = 123`
    const shimmed = createTSShim(ts)
    
    expect(shimmed.version).toBeDefined()

    const transpiled = shimmed.toJS(brokenCode)
    console.log(`
----------
transpiled
----------

${transpiled}
`)
    expect(transpiled).not.toBe(undefined)

})
