[Nest]: https://nestjs.com/
[typeorm]: https://typeorm.io/

# Api 2
This package serves as a sample on how can you use a backend for perhaps different
needs of a different backend project.

This project is based on the [Nest] cli, it uses [typeorm] and postgres
as a database engine.

Perhaps this can serve as an admin project for your customer facing API.
Also you should not feel obligated to use multiple backend packages if 
you want to use the same backend for admin/consumer endpoints/tasks you are free to do so
also you are free to use your own skeleton/framework/library needed
the important part is to reference the core libraries inside this/other backend projects you may have

```js
{
  "name": "@monosample/api2",
  "version": "0.0.1",
  //...
  "dependencies": {
    // ...
    "@nestjs/common": "^6.7.2",
    "@nestjs/core": "^6.7.2",
    "@monosample/lib": "1.0.0"
    // ...
  }
  // ...
}
```

To see samples on how the core library is used check `AuthController.ts`
in specific `ILoginParams` or `IAuthResponse`