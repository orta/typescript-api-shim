const createTSShim = (ts) => {
    const version = ts.version || getVersion(ts)



    return {
        version,
        toJS: (code) => transpile(ts, code),
        compile: (code) => compile(ts, code)
    }

} 

function getVersion(ts) {
    const keys = Object.keys(ts)
    
}

function transpile(ts, code) {
    // Object.keys(ts).forEach(key => console.log(key))
    // throw new Error('dfs')
    return ts.transpile(code)
}

function compile(ts, code) {
    var diagnostics = []
    var options = {
        target: 1 /* ES5 */,
        module: 0 /* None */,
        // Filename can be non-ts file.
        allowNonTsExtensions: true,
        // We are not returning a sourceFile for lib file when asked by the program, 
        // so pass --noLib to avoid reporting a file not found error.
        noLib: true,
        // We are not doing a full typecheck, we are not resolving the whole context,
        // so pass --noResolve to avoid reporting missing file errors.
        noResolve: true
    }

    // Parse
    var inputFileName = "module.ts";
    var sourceFile = ts.createSourceFile(inputFileName, code, options.target);
    // if (moduleName) {
    //     sourceFile.moduleName = moduleName;
    // }
    // Store syntactic diagnostics
    if (diagnostics && sourceFile.parseDiagnostics) {
        diagnostics.push.apply(diagnostics, sourceFile.parseDiagnostics);
    }
    var newLine = ts.getNewLineCharacter(options);
    // Output
    var outputText;
    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: function (fileName, target) { return fileName === inputFileName ? sourceFile : undefined; },
        writeFile: function (name, text, writeByteOrderMark) {
            ts.Debug.assert(outputText === undefined, "Unexpected multiple outputs for the file: " + name);
            outputText = text;
        },
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ""; },
        getNewLine: function () { return newLine; }
    };
    var program = ts.createProgram([inputFileName], options, compilerHost);
    if (diagnostics) {
        diagnostics.push.apply(diagnostics, program.getCompilerOptionsDiagnostics());
    }
    // Emit
    let emitResult = program.emit();

    // console.log(emitResult)
    // console.log(diagnostics)
    // console.log(outputText)
    return { outputText, diagnostics }
}


module.exports = {
    createTSShim
}