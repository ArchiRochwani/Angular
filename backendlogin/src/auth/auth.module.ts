import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';
import { AuthService } from './service/auth.service';

@Module({
    imports:[
        JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:async(configService:ConfigService)=>({
            secret:configService.get('JWT_SECRET'),
            signOptions:{expiresIn:'10000s'}
        })
    })
],
providers:[AuthService],
exports:[AuthService]
})
export class AuthModule {}
