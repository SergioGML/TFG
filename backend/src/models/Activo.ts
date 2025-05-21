// backend/src/models/Activo.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "activos", timestamps: false })
export class Activo extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  coinmarketcap_id!: number;

  @Column({ type: DataType.STRING(10), allowNull: false, unique: true })
  simbolo!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  nombre!: string;
}
