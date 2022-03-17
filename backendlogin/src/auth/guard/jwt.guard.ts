import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*we'll create a protected route that checks for a valid JWT on the request.*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
