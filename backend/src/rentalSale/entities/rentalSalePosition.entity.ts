import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentalSale } from "./rentalSale.entity";
import { Subcategory } from "src/subcategories/subcategory.entity";
import { RentedItem } from "./rentedItem.entity";


@Entity({ name: "rental_sale_position" })
export class RentalSalePosition {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "integer", name: "number_of_items" })
  numberOfItems: number

  @Column({ type: "interval", name: "rental_length" })
  rentalLength: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge" })
  charge: number

  @Column({ type: "numeric", precision: 9, scale: 2, name: "surcharge" })
  surcharge: number

  @ManyToOne(() => RentalSale, (rentalSale) => rentalSale.rentalSalePositions)
  @JoinColumn({ name: "rental_sale_id", referencedColumnName: "id" })
  rentalSale: RentalSale

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.rentalSalePositions)
  @JoinColumn({ name: "item_subcategory_id", referencedColumnName: "id" })
  subcategory: Subcategory

  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.rentalSalePosition)
  rentedItems: RentedItem[]

}