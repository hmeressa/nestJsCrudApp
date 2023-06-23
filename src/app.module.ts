import {MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from "@nestjs/common";
import {UserModules} from "./Modules/user.modules";
import {DatabaseConfig} from "./Config/connectionEnv";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./Modules/auth.module";
import {APP_PIPE} from "@nestjs/core";
import {AuthMiddleware} from "./Middleware/auth.middleware";
import * as path from "path";

@Module({

  imports: [TypeOrmModule.forRoot(DatabaseConfig),
    UserModules,
    AuthModule],
  
  controllers: [],
  
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}


  // export class AppModule implements NestModule{
  // configure(consumer: MiddlewareConsumer): any {
  //   consumer

  //       .apply(AuthMiddleware)
  //       .exclude(
  //           { path : "auth", method : RequestMethod.POST},
  //                  { path : "", method : RequestMethod.POST})
  //       .forRoutes("*")
  // }



