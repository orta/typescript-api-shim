const createTSShim = (ts) => {
    
    return {
        toJS: () => ""
    }

} 

module.exports = {
    createTSShim
}