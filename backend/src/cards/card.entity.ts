import { ApiHideProperty } from "@nestjs/swagger";
import { CardClient } from "../clients/cardClient.entity";
import { RentalSale } from "../rentalSale/entities/rentalSale.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "char", length: 13, name: "barcode" })
  barcode: string

  @Column({ type: "boolean", name: "is_temp", nullable: true })
  isTemp: boolean

  @OneToMany(() => CardClient, (cardClient) => cardClient.card)
  @ApiHideProperty()
  cardClients: CardClient[]

  @OneToMany(() => RentalSale, (rentalSale) => rentalSale.card)
  @ApiHideProperty()
  rentalSales: RentalSale[]
  
}