import { Card } from "../cards/card.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { ApiHideProperty } from "@nestjs/swagger";


@Entity({ name: "card_client" })
export class CardClient {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Card, (card) => card.cardClients)
  @JoinColumn({name: "card_id", referencedColumnName: "id"})
  @ApiHideProperty()
  card: Card

  
  @ManyToOne(() => Client, (card) => card.clientCards, { nullable: true })
  @JoinColumn({name: "client_id", referencedColumnName: "id"})
  @ApiHideProperty()
  client: Client

  @Column({ type: "timestamp", name: "date_from" })
  dateFrom: Date

  @Column({ type: "timestamp", name: "date_to", nullable: true })
  dateTo: Date
}