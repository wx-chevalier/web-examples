[Koa]: https://koajs.com/
[Mongoose]: https://mongoosejs.com/
[Kosta]: https://github.com/AngelMunoz/Kosta

# Api 1
This package serves as a sample on how can you use a backend for perhaps different
needs of a different backend project.

This project is based on a small [Koa] skeleton ([Kosta]) which uses [Mongoose] and mongodb
as a database engine.

Perhaps this can serve as an admin project for your customer facing API.
Also you should not feel obligated to use multiple backend packages if 
you want to use the same backend for admin/consumer endpoints/tasks you are free to do so
also you are free to use your own skeleton/framework/library needed
the important part is to reference the core libraries inside this/other backend projects you may have

```js
{
  "name": "@monosample/api1",
  "version": "0.0.1",
  //...
  "dependencies": {
    // ...
    "mongoose": "5.6.0",
    "winston": "3.2.1",
    "@monosample/lib": "1.0.0"
    // ...
  }
  // ...
}
```

To see samples on how the core library is used check `src/actions/auth.ts`
in specific `ILoginParams` or `IAuthResponse`