import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentalSalePosition } from "./rentalSalePosition.entity";
import { User } from "../../users/user.entity";
import { Item } from "../../items/item.entity";


@Entity({ name: "rented_item" })
@Check(`"end_predicted" >= "start" AND "end" >= "start"`)
export class RentedItem {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "timestamp", name: "start" })
  start: string

  @Column({ type: "timestamp", name: "end_predicted" })
  endPredicted: string

  @Column({ type: "timestamp", name: "end", nullable: true })
  end: string

  @ManyToOne(() => RentalSalePosition, (rentalSalePosition) => rentalSalePosition.rentedItems, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "rental_sale_position_id", referencedColumnName: "id" })
  rentalSalePosition: RentalSalePosition

  @ManyToOne(() => User, (user) => user.startUserRentedItems, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "start_user_id", referencedColumnName: "id" })
  startUser: User

  @ManyToOne(() => User, (user) => user.endUserRentedItems, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "end_user_id", referencedColumnName: "id" })
  endUser: User

  @ManyToOne(() => Item, (item) => item.rentedItems, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "item_id", referencedColumnName: "id" })
  item: Item

}