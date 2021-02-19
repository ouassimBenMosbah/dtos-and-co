import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class Pokemon extends Model<Pokemon> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  pokemonId: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.BOOLEAN)
  isAlive: boolean;

  @Column(DataType.DATE)
  birthDate: Date;
}
