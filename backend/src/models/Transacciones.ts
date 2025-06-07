import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Activo } from "./Activo";

@Table({ tableName: "transacciones", timestamps: false })
export class Transaccion extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @ForeignKey(() => Activo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  activo_id!: number;

  // RECOMENDACIÓN: enum restringido a 'compra' | 'venta'
  @Column({
    type: DataType.ENUM("compra", "venta"),
    allowNull: false,
  })
  tipo_operacion!: "compra" | "venta";

  // COMPRA
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  cantidad_invertida?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  cantidad_comprada?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  precio_compra?: number;

  // VENTA
  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  cantidad_vendida?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  precio_venta?: number;

  // OPCIONALES
  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  precio_promedio_compra?: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  precio_promedio_venta?: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  ratio_beneficio?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fecha_transaccion!: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Activo)
  activo!: Activo;
}
