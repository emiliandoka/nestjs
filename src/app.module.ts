import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoginModule } from './userLogin/login.module';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';
//import { AuthControllerfunc } from './userLogin/auth/auth.controller';
import { AuthMiddleware } from './userLogin/middlewares/auth.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        version: '14.5',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'nestjsdb',
          password: process.env.DB_PASSWORD,
          database: 'nestjsdb',
        },
      },
    }),

    UserModule,
    LoginModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
