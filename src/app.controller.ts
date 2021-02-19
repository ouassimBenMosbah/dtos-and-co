import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize/types';
import { GetPokemonsDTO } from './DTOs/pokemons.dto';
import { Pokemon } from './models/pokemon.model';

@Controller()
export class AppController {
  constructor(@InjectModel(Pokemon) private pokemonModel: typeof Pokemon) {}

  @Get()
  getQueryBack(@Query() query) {
    return query;
  }

  @Get('level1')
  async level1(@Query() query): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({ where: query });
  }

  @Get('level2')
  async level2(@Query() query: Partial<Pokemon>): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({
      where: query as WhereOptions,
    });
  }

  @Get('level3')
  async level3(
    @Query() query: Partial<Pokemon>,
    @Query('isAlive', ParseBoolPipe) isAlive: boolean,
  ): Promise<Pokemon[]> {
    delete query.isAlive;
    console.log(query, isAlive);
    return this.pokemonModel.findAll({
      where: { ...query, isAlive } as WhereOptions,
    });
  }

  @Get('level4-1')
  async level4(@Query() query: GetPokemonsDTO): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({
      where: query,
    });
  }

  @Get('level4-2')
  async level4_2(@Query() query: GetPokemonsDTO): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({
      where: query,
    });
  }

  @Get('level4-3')
  async level4_3(@Query() query: GetPokemonsDTO): Promise<Pokemon[]> {
    console.log(query);
    // const { populate, ...where } = query as any;
    return this.pokemonModel.findAll({
      where: { ...query },
    });
  }

  @Get('final-level')
  finalLevel(@Query() query: GetPokemonsDTO): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({
      where: { ...query },
    });
  }
}
