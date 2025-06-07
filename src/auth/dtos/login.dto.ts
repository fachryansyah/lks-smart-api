import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DataWrapperResponse } from 'src/util/dtos/global.dto';

export class LoginRequest {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginResponse extends DataWrapperResponse {}
