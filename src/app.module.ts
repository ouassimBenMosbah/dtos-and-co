import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { Pokemon } from './models/pokemon.model';
import { TransactionInterceptor } from './transaction.interceptor';

@Module({
  controllers: [AppController],
  imports: [
    SequelizeModule.forFeature([Pokemon]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      models: [Pokemon],
      retryAttempts: 3,
      retryDelay: 5000,
      logging: false,
    }),
  ],
  providers: [
    TransactionInterceptor,
    { provide: 'SEQUELIZE', useExisting: Sequelize },
  ],
})
export class AppModule {}
