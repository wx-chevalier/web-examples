# Slashd Run

**Slashd Run** is a tiny library that runs user-provided code into a **Web Worker**. 
Its main purpose is to allow data transformation through snippet of code, therefore some global capabilities are disabled.

A Web Worker cannot access the DOM therefore it cannot manipulate the webpage that use it.

Ideally, the application allows to execute some code provided by the user, alongside some data to get back a result.



### Develop locally:

Install dependencies:

```shell
npm i
```



Start the watcher

```shell
npm start 
```



### Install

Use your favorite package manager:

```shell
npm install @slashd/run
```

Then, include it in the browser:

```html
<script src="node_modules/dist/slashd-run.min.js"></script>
```

or with ES6 in a module or within a bundler:

```js
import SlashdRun from '@slashd/run'
```





### How to use

The library requires a one-off init somewhere in your code, i.e.:

```js
import SlashdRun from '@slashd/run'
SlashdRun.setup()
```



The `exe` method returns a promise, so you can use it with `await`:

```js
const myCode = `return Math.random() * param`

const res = await SlashdRun.exe(myCode, {param:20})

// res is i.e. 12.345657676
```



### Configuration

You can specify to load external libraries within the worker by adding them in the setup as an array of external paths:

```js
SlashdRun.setup(['https://unpkg.com/lodash', 'https://www.example.com/mylibrary.js'])
```

With the above setup, it's possible to use `lodash` in the provided code:

```js
const myCode = `_.difference(arr1, arr2);`

const res = await SlashdRun.exe(myCode, {arr1:[2, 1], arr2:[2, 3]})

// => [1]
```