import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentalSalePosition } from "./rentalSalePosition.entity";
import { User } from "../../users/user.entity";
import { Item } from "../../items/item.entity";


@Entity({ name: "rented_item" })
export class RentedItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "timestamp", name: "start" })
  start: string

  @Column({ type: "timestamp", name: "end_predicted" })
  endPredicted: string

  @Column({ type: "timestamp", name: "end", nullable: true })
  end: string

  @ManyToOne(() => RentalSalePosition, (rentalSalePosition) => rentalSalePosition.rentedItems)
  @JoinColumn({ name: "rental_sale_position_id", referencedColumnName: "id" })
  rentalSalePosition: RentalSalePosition

  @ManyToOne(() => User, (user) => user.startUserRentedItems)
  @JoinColumn({ name: "start_user_id", referencedColumnName: "id" })
  startUser: User

  @ManyToOne(() => User, (user) => user.endUserRentedItems)
  @JoinColumn({ name: "end_user_id", referencedColumnName: "id" })
  endUser: User

  @ManyToOne(() => Item, (item) => item.rentedItems)
  @JoinColumn({ name: "item_id", referencedColumnName: "id" })
  item: Item

}