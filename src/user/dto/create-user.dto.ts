import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'alex' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 22 })
  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  gender!: number;
}
