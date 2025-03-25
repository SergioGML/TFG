import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
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

  @Column({ type: DataType.STRING(20), allowNull: false })
  tipo_operacion!: string; // 'compra' o 'venta'

  // Campos para operación de compra
  @Column({ type: DataType.DECIMAL(12,2), allowNull: true })
  cantidad_invertida?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  cantidad_comprada?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  precio_compra?: number;

  // Campos para operación de venta
  @Column({ type: DataType.DECIMAL(12,2), allowNull: true })
  cantidad_obtenida?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  cantidad_vendida?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  precio_venta?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  precio_promedio_compra?: number;

  @Column({ type: DataType.DECIMAL(12,6), allowNull: true })
  precio_promedio_venta?: number;

  @Column({ type: DataType.DECIMAL(5,2), allowNull: true })
  ratio_beneficio?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fecha_transaccion!: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Activo)
  activo!: Activo;
}
