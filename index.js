const createTSShim = (ts) => {
    const version = ts.version || getVersion(ts)



    return {
        version,
        toJS: (code) => transpile(ts, code)
    }

} 

function getVersion(ts) {
    const keys = Object.keys(ts)
    
}

function transpile(ts, code) {
    return ts.transpile(code)
}

module.exports = {
    createTSShim
}