import { Card } from "../cards/card.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";


@Entity({ name: "card_client" })
export class CardClient {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Card, (card) => card.cardClients)
  @JoinColumn({ name: "card_id", referencedColumnName: "id" })
  card: Card

  
  @ManyToOne(() => Client, (client) => client.clientCards, { nullable: true })
  @JoinColumn({ name: "client_id", referencedColumnName: "id" })
  client: Client

  @Column({ type: "timestamp", name: "date_from" })
  dateFrom: Date

  @Column({ type: "timestamp", name: "date_to", nullable: true })
  dateTo: Date
}