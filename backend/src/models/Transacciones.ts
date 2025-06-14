import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./Usuario";
import { Activo } from "./Activo";

@Table({ tableName: "transacciones", timestamps: false })
// Definición del modelo Transaccion
// - id: número entero autoincremental, clave primaria
// - user_id: número entero, clave foránea que referencia al modelo User
// - activo_id: número entero, clave foránea que referencia al modelo Activo
// - tipo_operacion: cadena de texto que puede ser "compra" o "venta", no nula
// - cantidad_invertida: número decimal con 12 dígitos y 2 decimales, puede ser nulo
// - cantidad_comprada: número decimal con 12 dígitos y 6 decimales, puede ser nulo
// - precio_compra: número decimal con 12 dígitos y 6 decimales, puede ser nulo
// - cantidad_vendida: número decimal con 12 dígitos y 6 decimales, puede ser nulo
// - precio_venta: número decimal con 12 dígitos y 6 decimales, puede ser nulo
// - precio_promedio_compra: número decimal con 18 dígitos y 10 decimales, puede ser nulo
// - precio_promedio_venta: número decimal con 18 dígitos y 10 decimales, puede ser nulo
// - ratio_beneficio: número decimal con 18 dígitos y 10 decimales, puede ser nulo
export class Transaccion extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @ForeignKey(() => Activo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  activo_id!: number;

  @Column({
    type: DataType.ENUM("compra", "venta"),
    allowNull: false,
  })
  tipo_operacion!: "compra" | "venta";

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  cantidad_invertida?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  cantidad_comprada?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  precio_compra?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  cantidad_vendida?: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  precio_venta?: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  precio_promedio_compra?: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  precio_promedio_venta?: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: true })
  ratio_beneficio?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fecha_transaccion!: Date;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;

  @BelongsTo(() => Activo)
  activo!: Activo;
}
