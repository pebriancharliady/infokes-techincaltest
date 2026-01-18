## Infokes

Refer to docs/ for the frontned and backend flow diagrams

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
cd packages/backend && bun run seed
bun dev:backend
```
