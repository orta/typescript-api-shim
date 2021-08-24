const fs = require("fs")
const expect = require("expect")

const {createTSShim} = require(".")

/** @type {import("./package.json")} */
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8")) 

console.log("Running tests")

const versions = Object.keys(pkg.dependencies)

const skip = ["ts-13"]

versions.forEach(v => {
    if(skip.includes(v)) return
    console.log(v)
    const brokenCode = `v ar abc = 123`
    const ts = require(v)
    const shimmed = createTSShim(ts)


})
