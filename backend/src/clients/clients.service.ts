import { Injectable } from "@nestjs/common";
import { Client } from "./interfaces/client.interface";


@Injectable()
export class ClientsService {
  private readonly clients: Client[] = [];

  add(client: Client) {
    this.clients.push(client);
    console.log("ClientsBase:", this.clients)
    return client
  }
}