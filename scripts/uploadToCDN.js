// @ts-check

// 

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs")

const exec = (cmd, opts) => {
  console.log(`> ${cmd} ${opts ? JSON.stringify(opts) : ""}`);
  try {
    return execSync(cmd, opts);
  } catch (error) {
    console.error(error.message);
  }
};
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
})
