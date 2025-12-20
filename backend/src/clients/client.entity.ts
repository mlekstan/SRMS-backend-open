import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CardClient } from "./cardClient.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity({ name: "client" })
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 40, name: "first_name" })
  firstName: string

  @Column({ type: "varchar", length: 40, name: "middle_name", nullable: true })
  middleName: string

  @Column({ type: "varchar", length: 80, name: "last_name" })
  lastName: string

  @Column({ type: "varchar", length: 60, name: "country", nullable: true })
  country: string

  @Column({ type: "varchar", length: 100, name: "city", nullable: true })
  city: string

  @Column({ type: "varchar", length: 100, name: "street", nullable: true })
  street: string

  @Column({ type: "smallint", name: "street_number", nullable: true })
  streetNumber: number

  @Column({ type: "smallint", name: "flat_number", nullable: true })
  flatNumber: number

  @Column({ type: "varchar", length: 10, name: "zip_code", nullable: true })
  zipCode: string

  @Column({ type: "varchar", length: 254, name: "email", nullable: true })
  email: string

  @Column({ type: "varchar", length: 7, name: "area_code", nullable: true })
  areaCode: string

  @Column({ type: "varchar", length: 13, name: "phone_number", nullable: true })
  phoneNumber: string

  @Column({ type: "varchar", length: 15, name: "identity_card_number", nullable: true })
  identityCardNumber: string

  @Column({ type: "timestamp", name: "date_joined" })
  dateJoined: Date

  @OneToMany(() => CardClient, (cardClient) => cardClient.client)
  @ApiHideProperty()
  clientCards: CardClient[]
}