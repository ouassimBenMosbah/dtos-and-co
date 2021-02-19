import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetPokemonsDTO {
  @IsOptional()
  @IsInt()
  pokemonId: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isAlive: boolean;

  @IsOptional()
  @IsDate()
  @Transform(
    (params: TransformFnParams) =>
      new Date((params.value as Date).setUTCHours(0, 0, 0, 0)),
  )
  birthDate: Date;
}

// https://github.com/typestack/class-transformer/issues/550
// @Transform((params: TransformFnParams) => {
//   return params.obj.isAlive === 'true';
// })
