import {MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from "@nestjs/common";
import {UserModules} from "./Modules/user.modules";
import {DatabaseConfig} from "./Config/connectionEnv";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./Modules/auth.module";
import {APP_PIPE} from "@nestjs/core";
import {UserController} from "./Controller/user.controller";

@Module({

  imports: [TypeOrmModule.forRoot(DatabaseConfig),
    UserModules,
    AuthModule,
  ],
  controllers: [UserController],
  
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



