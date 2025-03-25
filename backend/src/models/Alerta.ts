import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./User";
import { Activo } from "./Activo";

@Table({ tableName: "alertas", timestamps: false })
export class Alerta extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @ForeignKey(() => Activo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  activo_id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  tipo_alerta!: string; // "porcentaje" o "valor_absoluto"

  @Column({ type: DataType.FLOAT, allowNull: false })
  umbral!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  tipo_variacion!: string; // "incremento" o "decremento"

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  activo_alerta!: boolean;
}
