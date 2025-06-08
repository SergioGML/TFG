import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { User } from "./Usuario";
import { TramoFiscal } from "./TramoFiscal";

@Table({ tableName: "paises", timestamps: false })
export class Pais extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  nombre!: string;

  @HasMany(() => User)
  usuarios!: User[];

  @HasMany(() => TramoFiscal)
  tramosFiscales!: TramoFiscal[];
}
