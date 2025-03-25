import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "gestion_fiscal", timestamps: false })
export class GestionFiscal extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  pais!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  tasa_impositiva!: number;
}
