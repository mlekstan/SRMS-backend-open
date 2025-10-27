import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "char", length: 13, name: "barcode" })
  barcode: string

  @Column({ type: "boolean", name: "is_temp", nullable: true })
  isTemp: boolean
}