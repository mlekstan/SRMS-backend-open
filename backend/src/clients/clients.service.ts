import { Injectable } from "@nestjs/common";
import { Client } from "./interfaces/client.interface";


@Injectable()
export class ClientsService {
  private readonly clients: Client[] = [];

  create(client: Client) {
    this.clients.push(client);
    console.log("Added:", client)
    console.log("Base:", this.clients)
    return client
  }
}