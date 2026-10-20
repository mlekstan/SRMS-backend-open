import { Branch } from "../branches/branch.entity";
import { RentedItem } from "../rentalSale/entities/rentedItem.entity";
import { Subcategory } from "../subcategories/subcategory.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "item" })
export class Item {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "varchar", length: 255, name: "full_name", unique: true })
  name: string

  @Column({ type: "varchar", length: 128, name: "short_name", unique: true, nullable: true })
  shortName: string

  @Column({ type: "char", length: 8, name: "barcode", unique: true })
  barcode: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "market_value", nullable: true })
  marketValue: string

  @Column({ type: "boolean", name: "for_sale" })
  forSale: boolean

  @Column({ type: "numeric", precision: 9, scale: 2, name: "sell_price", nullable: true })
  sellPrice: string

  @Column({ type: 'smallint', name: "status" })
  status: number

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.items, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "item_subcategory_id", referencedColumnName: "id" })
  subcategory: Subcategory

  @ManyToOne(() => Branch, (branch) => branch.items, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.item)
  rentedItems: RentedItem[]

}