import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "char", length: 13, name: "barcode" })
  cardBarcode: string

  @Column({ type: "boolean", name: "is_temp" })
  isTemp: boolean
}