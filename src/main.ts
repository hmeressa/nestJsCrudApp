import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Global, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*app.useGlobalPipes(new ValidationPipe())*/
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.enableCors({
    origin : 'http://localhost:3000',
    credentials : true
  })
   await app.listen(3000);
}
 bootstrap().then(()=>{
   console.log(`The application is successfully started wit the address of http://localhost:${3000}/api/user`)
 })
   .catch((error)=>{
     console.log(error.error)
   });
