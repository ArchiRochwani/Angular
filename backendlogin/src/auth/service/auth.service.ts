import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';


@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({user});
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

}
