import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { AddClientDto } from "./dto/add-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";


@Controller("clients")
export class ClientsController {
  constructor(private clientsService: ClientsService) {}


  @Post()
  add(@Body() addClientDto: AddClientDto) {
    return this.clientsService.add(addClientDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.updateOne(params, updateClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.clientsService.findOne(params);
  }
}