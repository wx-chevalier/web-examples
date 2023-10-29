import { Controller, Post, Body, BadRequestException, Logger, ServiceUnavailableException, HttpStatus, HttpCode } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserOptions, isValidPassword, ILoginParams, IAuthResponse, ISignUpParams, } from '@monosample/lib';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '../services/jwt.service';

@Controller('auth')
export class AuthController {

  constructor(private $jwt: JwtService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: ILoginParams): Promise<IAuthResponse> {
    const user = await User.findByEmailOrUsername(email, true);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new BadRequestException('Invalid Credentials');
    }

    const loggedInUser: Partial<IUserOptions> = { id: user.id, email: user.email, username: user.username };
    const token = this.$jwt.issueJwt({ user: loggedInUser });

    return { token, user: loggedInUser };
  }

  @Post('signup')
  async signup(@Body() userParams: ISignUpParams): Promise<IAuthResponse> {
    const [usedEmail, usedUsername] = await Promise.all([
      User.exists(userParams.email),
      User.exists(userParams.username)
    ]);

    if (usedEmail) {
      throw new BadRequestException('Email already in use.');
    } else if (usedUsername) {
      throw new BadRequestException('Username already in use.');
    }

    if (!userParams.password || !isValidPassword(userParams.password)) {
      throw new BadRequestException('Please ensure password rules.');
    }

    const newUser = new User(userParams);

    newUser.password = await hash(userParams.password, 10);

    try {
      await newUser.save();
    } catch (error) {
      Logger.error(error.message);
      throw new ServiceUnavailableException('Server is not available at the moment, please try again in 5 minutes.');
    }
    const user: Partial<IUserOptions> = { id: newUser.id, email: newUser.email, username: newUser.username };
    const token = this.$jwt.issueJwt({ user });
    return { token, user };
  }
}
