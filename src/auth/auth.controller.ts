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
import { CreateUserDto, LoginDto } from 'src/users/dto/create-user.dto';
import { log } from 'console';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  signUp(@Body() createUsersDto: CreateUserDto): Promise<{ message: string }> {
    return this.authService.signUp(createUsersDto);
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
