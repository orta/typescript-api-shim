### TS API Shim

Provides a single API layer to any version of TypeScript. Right now the goal is to first just handle a generic "TS -> JS" conversion.

The goal is:

```ts
const ts = require("typescript")
const {createTSShim} = require("typescript-api-shim")
const shim = createTSShim(ts)

const code = `const hello: string = "world"`
const js = shim.toJS(code)
```

With any version of TypeScript. I'd like to also get consistent error messages, line numbers etc.

#### Contribute

```sh
git clone https://github.com/orta/typescript-api-shim
pnpm i

node test
```
