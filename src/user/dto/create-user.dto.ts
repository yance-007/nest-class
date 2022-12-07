import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: 'alex007' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'abc@163.com' })
  @IsNotEmpty()
  @IsString()
  email: number;

  @ApiProperty({ example: 'alex' })
  @IsNotEmpty()
  @IsString()
  username: string;
}
