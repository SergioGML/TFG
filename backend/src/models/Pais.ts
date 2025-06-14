import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { User } from "./Usuario";
import { TramoFiscal } from "./TramoFiscal";

@Table({ tableName: "paises", timestamps: false })
export class Pais extends Model {
  // Definición de las columnas del modelo Pais
  // id: número entero autoincremental, clave primaria
  // nombre: cadena de texto de hasta 100 caracteres, clave única, no nula
  // usuarios: relación uno a muchos con el modelo User
  // tramosFiscales: relación uno a muchos con el modelo TramoFiscal
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  nombre!: string;

  @HasMany(() => User)
  usuarios!: User[];

  @HasMany(() => TramoFiscal)
  tramosFiscales!: TramoFiscal[];
}
