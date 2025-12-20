import { Branch } from "src/branches/branch.entity";
import { Card } from "src/cards/card.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentalSalePosition } from "./rentalSalePosition.entity";


@Entity({ name: "rental_sale" })
export class RentalSale {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "timestamp", name: "sale_date" })
  saleDate: Date

  @Column({ type: "boolean", name: "action_required" })
  actionRequired: boolean

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge_predicted" })
  chargePredicted: number

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge" })
  charge: number

  @Column({ type: "numeric", precision: 9, scale: 2, name: "surcharge" })
  surcharge: number

  @ManyToOne(() => User, (user) => user.rentalSales)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User

  @ManyToOne(() => Card, (card) => card.rentalSales)
  @JoinColumn({ name: "card_id", referencedColumnName: "id" })
  card: Card

  @ManyToOne(() => Branch, (branch) => branch.rentalSales)
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

  @OneToMany(() => RentalSalePosition, (rentalSalePosition) => rentalSalePosition.rentalSale)
  rentalSalePositions: RentalSalePosition[]

}