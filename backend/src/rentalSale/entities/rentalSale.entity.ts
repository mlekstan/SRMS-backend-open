import { Branch } from "../../branches/branch.entity";
import { Card } from "../../cards/card.entity";
import { User } from "../../users/user.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentalSalePosition } from "./rentalSalePosition.entity";


@Entity({ name: "rental_sale" })
@Check(`"charge_predicted" >= 0 AND "charge" >= 0 AND "surcharge" >= 0`)
export class RentalSale {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "timestamp", name: "sale_date" })
  saleDate: Date

  @Column({ type: "boolean", name: "action_required" })
  actionRequired: boolean

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge_predicted" })
  chargePredicted: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "charge" })
  charge: string

  @Column({ type: "numeric", precision: 9, scale: 2, name: "surcharge", default: 0 })
  surcharge: string

  @ManyToOne(() => User, (user) => user.rentalSales, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User

  @ManyToOne(() => Card, (card) => card.rentalSales, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "card_id", referencedColumnName: "id" })
  card: Card

  @ManyToOne(() => Branch, (branch) => branch.rentalSales, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

  @OneToMany(() => RentalSalePosition, (rentalSalePosition) => rentalSalePosition.rentalSale)
  rentalSalePositions: RentalSalePosition[]

}