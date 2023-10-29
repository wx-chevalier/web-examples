import { Controller, BadRequestException, Logger, ServiceUnavailableException, Get, Param } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserOptions, IPaginatedResult } from '@monosample/lib';
import { JwtService } from '../services/jwt.service';

@Controller('api/users')
export class UsersController {

  constructor(private $jwt: JwtService) { }

  @Get('')
  async Users(): Promise<IPaginatedResult<Partial<IUserOptions>>> {
    const [list, count] = await User.findAndCount();
    return { list, count };
  }

  @Get(':id')
  async signup(@Param('id') id: number): Promise<Partial<IUserOptions>> {
    const user = await User.findOne(id);
    return user;
  }
}
