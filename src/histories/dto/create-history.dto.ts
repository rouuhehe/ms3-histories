import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty() @IsDateString() date!: string;
  @ApiProperty() @IsString() event!: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiProperty({
    required: false,
    type: Object,
    example: { weight: 12.3, comments: 'OK' },
  })
  @IsOptional()
  meta?: { weight?: number; comments?: string };
}
