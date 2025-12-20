import { Branch } from "src/branches/branch.entity";
import { RentedItem } from "src/rentalSale/entities/rentedItem.entity";
import { Subcategory } from "src/subcategories/subcategory.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "item" })
export class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "full_name" })
  name: string

  @Column({ type: "varchar", length: 128, name: "short_name" })
  shortName: string

  @Column({ type: "char", length: 13, name: "barcode" })
  barcode: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "market_value" })
  marketValue: number

  @Column({ type: "boolean", name: "for_sale" })
  forSale: boolean

  @Column({ type: "numeric", precision: 9, scale: 2, name: "sell_price" })
  sellPrice: number

  @Column({ type: 'smallint', name: "status" })
  status: number

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: "item_subcategory_id", referencedColumnName: "id" })
  subcategory: Subcategory

  @ManyToOne(() => Branch)
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.item)
  rentedItems: RentedItem[]

}