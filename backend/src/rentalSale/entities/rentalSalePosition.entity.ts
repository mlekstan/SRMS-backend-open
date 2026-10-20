import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentalSale } from "./rentalSale.entity";
import { RentedItem } from "./rentedItem.entity";
import { IntervalTransformer } from "src/price-list/entities/IntervalTransformer";
import { VehiclePrice } from "src/price-list/entities/vehicle-price.entity";


@Entity({ name: "rental_sale_position" })
@Check(`"charge_predicted" >= 0 AND "charge" >= 0 AND "surcharge" >= 0`)
export class RentalSalePosition {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "integer", name: "number_of_items" })
  numberOfItems: number

  @Column({ type: "interval", name: "rental_length", transformer: new IntervalTransformer() })
  rentalLength: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge_predicted" })
  chargePredicted: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge" })
  charge: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "surcharge", default: 0 })
  surcharge: string

  @ManyToOne(() => RentalSale, (rentalSale) => rentalSale.rentalSalePositions, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "rental_sale_id", referencedColumnName: "id" })
  rentalSale: RentalSale

  @ManyToOne(() => VehiclePrice, (vehiclePrice) => vehiclePrice.rentalSalePositions, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "vehicle_price_id", referencedColumnName: "id" })
  vehiclePrice: VehiclePrice

  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.rentalSalePosition)
  rentedItems: RentedItem[]

}