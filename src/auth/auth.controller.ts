import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  getProfile(@Request() req: any): any {
    return req.user;
  }
}
