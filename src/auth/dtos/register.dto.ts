import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DataWrapperResponse } from 'src/util/dtos/global.dto';

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  nama: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  tipeUser: string;

  @ApiProperty()
  @IsString()
  alamat: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  telepon: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;
}

export class RegisterResponse extends DataWrapperResponse {}
