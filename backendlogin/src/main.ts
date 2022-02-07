import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

 //app.setGlobalPrefix('backendlogin');
  //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
 //app.get('/persons',(req,res)=>{
  //res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  //})
  await app.listen(3000);
}
bootstrap();
