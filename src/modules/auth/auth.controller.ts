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
import { RolesGuard } from './roles.guard';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto, LoginDto } from 'src/modules/users/dto/create-user.dto';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  async signUp(
    @Body() createUsersDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUsersDto);
    return { message: 'User created successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  getProfile(@Request() req: any): Promise<any> {
    return req.user;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('admin-test')
  @Roles(Role.Admin)
  @ApiOkResponse({
    description: 'Returns the user object if the credentials are valid.',
  })
  async adminTest(@Request() req: any): Promise<any> {
    return req.user;
  }
}
