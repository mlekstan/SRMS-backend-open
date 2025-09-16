import { Body, Controller, Post, Req } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { AddClientDto } from "./dto/add-client.dto";


@Controller("clients")
export class ClientsController {
  constructor(private clientsService: ClientsService) {}


  @Post("add")
  add(@Body() addClientDto: AddClientDto) {
    return this.clientsService.add(addClientDto);
  }
}