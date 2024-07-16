import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly price: number;

  @IsString()
  readonly size: string;

  @IsString()
  readonly color: string;

  @IsNumber()
  readonly likeCount: number;
}
