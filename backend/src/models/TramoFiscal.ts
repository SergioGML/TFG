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
  // Definición de las columnas del modelo TramoFiscal
  // id: número entero autoincremental, clave primaria
  // pais_id: número entero, clave foránea que referencia al modelo Pais
  // tramo_min: número decimal con 10 dígitos y 2 decimales, no nulo
  // tramo_max: número decimal con 10 dígitos y 2 decimales, no nulo
  // tasa_impositiva: número decimal con 5 dígitos y 2 decimales, no nulo
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
