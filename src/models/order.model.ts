import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import SaleOrderItem from "./saleOrderItem.model";

@Table({
  timestamps: true,
  tableName: "orders",
})
export default class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId!: number;

  @HasMany(() => SaleOrderItem, "orderId")
  saleOrderItems!: SaleOrderItem[];
}
