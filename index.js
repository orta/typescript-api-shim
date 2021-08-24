const createTSShim = (ts) => {
    const version = ts.version || getVersion(ts)



    return {
        version,
        toJS: () => ""
    }

} 

function getVersion(ts) {
    const keys = Object.keys(ts)
    
}

module.exports = {
    createTSShim
}