import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/models/dto/create-user.dto';
import { LoginUserDto } from 'src/user/models/dto/login-user.dto';
import { User } from 'src/user/models/user.interface';

@Injectable()
export class UserHelperService {

  createUserDtoToEntity(createUserDto: CreateUserDto): User{
    return {
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password
    };
  }

  loginUserDtoToEntity(loginUserDto: LoginUserDto): User{
    return {
      email: loginUserDto.email,
      password: loginUserDto.password
    };
  }

}
