import { CardClient } from "../clients/cardClient.entity";
import { RentalSale } from "../rentalSale/entities/rentalSale.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "char", length: 8, name: "barcode", unique: true })
  barcode: string

  @Column({ type: "boolean", name: "is_temp", nullable: true })
  isTemp: boolean

  @OneToMany(() => CardClient, (cardClient) => cardClient.card)
  cardClients: CardClient[]

  @OneToMany(() => RentalSale, (rentalSale) => rentalSale.card)
  rentalSales: RentalSale[]
  
}