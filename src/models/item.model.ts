import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import SaleOrderItem from "./saleOrderItem.model";

@Table({
  timestamps: true,
  tableName: "items",
})
export default class Item extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplierId!: number;

  @HasMany(() => SaleOrderItem, "itemId")
  saleOrderItems!: SaleOrderItem[];
}
