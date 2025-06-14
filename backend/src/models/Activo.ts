import { Table, Column, Model, DataType } from "sequelize-typescript";

//Definición del modelo Activo
@Table({ tableName: "activos", timestamps: false })
export class Activo extends Model {
  //Definición de las columnas del modelo Activo
  // id: número entero autoincremental, clave primaria
  // coinmarketcap_id: número entero, clave única, no nulo
  // simbolo: cadena de texto de hasta 10 caracteres, clave única, no nula
  // nombre: cadena de texto de hasta 100 caracteres, no nula
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  coinmarketcap_id!: number;

  @Column({ type: DataType.STRING(10), allowNull: false, unique: true })
  simbolo!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  nombre!: string;
}
