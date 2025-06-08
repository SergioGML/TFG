import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { Pais } from "./Pais";

@Table({ tableName: "tramos_fiscales", timestamps: false })
export class TramoFiscal extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Pais)
  @Column({ type: DataType.INTEGER, allowNull: false })
  pais_id!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  tramo_min!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  tramo_max!: number;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false })
  tasa_impositiva!: number;
}
