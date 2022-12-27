import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { JwtService } from './services/jwt.service';
import { AuthJwtMiddleware } from './middleware';
import Models from './models';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'Admin123',
      database: 'monosample',
      schema: 'public',
      entities: [...Models],
      synchronize: false
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [JwtService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthJwtMiddleware)
      .forRoutes({ path: 'api', method: RequestMethod.ALL });
  }

}
