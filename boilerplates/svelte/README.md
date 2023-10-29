# Typescript monorepo for Svelte v3 includes

* [preprocess](https://github.com/pyoner/svelte-typescript/tree/master/packages/preprocess)
* [template](https://github.com/pyoner/svelte-typescript/tree/master/packages/template)
* [types](https://github.com/pyoner/svelte-typescript/tree/master/packages/types)
* [Sapper template](https://github.com/pyoner/svelte-typescript/tree/master/packages/sapper-template)


# For Contributors

To install this monorepo you can use `lerna + npm`

```bash
cd svelte-typescript
npm i lerna -g
lerna bootstrap
```

or `lerna + yarn` see [use workspaces](https://github.com/lerna/lerna/tree/master/commands/bootstrap#--use-workspaces)
```bash
cd svelte-typescript
yarn global add lerna
lerna bootstrap --use-workspaces
```

or `yarn only`
```bash
cd svelte-typescript
yarn install
```
