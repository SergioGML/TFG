import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Pais } from "./Pais";

@Table({ tableName: "usuarios", timestamps: false })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @ForeignKey(() => Pais)
  @Column({ type: DataType.INTEGER, allowNull: true })
  pais_id!: number | null;

  @BelongsTo(() => Pais)
  pais!: Pais;
}
