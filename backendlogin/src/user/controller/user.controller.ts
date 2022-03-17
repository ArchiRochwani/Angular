import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { LoginUserDto } from '../models/dto/login-user.dto';
import { LoginResponseI } from '../models/login-response.interface';
import { User } from '../models/user.interface';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const userEntity: User = this.userHelperService.createUserDtoToEntity(createUserDto);
    return this.userService.create(userEntity);
  }

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({ page, limit, route: 'http://localhost:3000/users' });
  }

  @Get('/findall')
  async main()
  {
    console.log("hello");
    return this.userService.main();
  }
  // @Get('/find-by-username')
  //  async findAllByUsername(@Query('username') username: string) {
  //   return this.userService.findAllByUsername(username);
  //  }


  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
    const userEntity: User = this.userHelperService.loginUserDtoToEntity(loginUserDto);
    const jwt: string = await this.userService.login(userEntity);
    return {
      access_token: jwt, //by authorization service
      token_type: 'JWT', //type of token ,generally string bearer
      expires_in: 10000 //respond if auth token expires
    };
  }
}
