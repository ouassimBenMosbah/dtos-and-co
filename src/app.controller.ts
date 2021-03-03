import {
  Body,
  Controller,
  Get,
  ParseBoolPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import { GetPokemonsDTO, GetPokemonsDTO2 } from './DTOs/pokemons.dto';
import { Pokemon } from './models/pokemon.model';
import { TransactionParam } from './transaction-param.decorator';
import { TransactionInterceptor } from './transaction.interceptor';

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
      where: new GetPokemonsDTO2(query),
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
  async level4_3(
    @TransactionParam() transaction: Transaction,
    @Query() query: GetPokemonsDTO,
  ): Promise<Pokemon[]> {
    console.log(query);
    // const { populate, ...where } = query as any;
    return this.pokemonModel.findAll({
      where: { ...query },
      transaction,
    });
  }

  @Get('final-level')
  finalLevel(@Query() query: GetPokemonsDTO): Promise<Pokemon[]> {
    console.log(query);
    return this.pokemonModel.findAll({
      where: { ...query },
    });
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('transactions')
  async transactions(
    @Body() query: GetPokemonsDTO,
    @TransactionParam() transaction: Transaction,
  ): Promise<[number, Pokemon[]]> {
    const { pokemonId, ...attributeToUpdate } = query;
    await this.pokemonModel.update(
      { ...attributeToUpdate },
      {
        where: { pokemonId: pokemonId },
        transaction,
      },
    );

    return this.pokemonModel.update(
      { ...attributeToUpdate },
      {
        where: { pokemonId: undefined },
        transaction,
      },
    );
  }
}
