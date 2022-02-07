import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
/*services.AddCors(c=>{
    c.AddPolicy("AllowOrigin", options=> options.AllowAnyOrigin())
  })*/
}
