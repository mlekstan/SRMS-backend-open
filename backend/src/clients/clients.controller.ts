import { Body, Controller, Post, Req } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";


@Controller("clients")
export class ClientsController {
  constructor(private clientService: ClientsService) {}


  @Post("add")
  add(@Body() createClientDto: CreateClientDto) {
    return this.clientService.add(createClientDto);
  }
}