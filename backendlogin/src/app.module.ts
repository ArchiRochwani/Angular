import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(
      {
        type:'mongodb',
        url:process.env.DATABASE_URL,
        autoLoadEntities:true,
        synchronize:true
      }
    ),MongooseModule,
    PersonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
