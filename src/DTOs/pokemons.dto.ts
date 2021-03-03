import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmpty,
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
  @Transform((params: TransformFnParams) => {
    return params.obj.isAlive === 'true';
  })
  isAlive: boolean;

  @IsOptional()
  @IsDate()
  @Transform((params: TransformFnParams) => {
    return new Date((params.value as Date).setUTCHours(0, 0, 0, 0));
  })
  birthDate: Date;
}

export class GetPokemonsDTO2 {
  pokemonId: number;
  name: string;
  isAlive: boolean;
  birthDate: Date;

  constructor(o) {
    this.pokemonId = o.pokemonId;
    this.name = o.name;
    this.isAlive = o.isAlive;
    this.birthDate = o.birthDate;
  }
}

// https://github.com/typestack/class-transformer/issues/550
