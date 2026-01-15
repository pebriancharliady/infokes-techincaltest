## Infokes

### Setup

```bash
bun install
```
Common error:
`Error: Cannot find module '@rollup/rollup-darwin-x64'`

This happens on my mac, to fix this run this instead to install dependencies:
```bash
bun install --cpu=x64
```
    
______
### Running the project

Frontend:
```bash
bun dev:frontend
```


Backend:
```bash
bun dev:backend
```
_____

This project was created using `bun init` in bun v0.4.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.