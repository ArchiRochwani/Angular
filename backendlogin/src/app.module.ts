import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(
      {
        type:'mongodb',
        url:'"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"',
        autoLoadEntities:true,
        synchronize:true
      }
    ),MongooseModule,
     UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
