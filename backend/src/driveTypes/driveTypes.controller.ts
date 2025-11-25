import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AddDriveTypeDto } from "./dto/add-driveType.dto";
import { DrvieTypesService } from "./driveTypes.service";


@Controller("drive-types")
export class DriveTypesController {
  constructor(private driveTypesService: DrvieTypesService) {}


  @Post()
  add(@Body() addDriveTypeDto: AddDriveTypeDto) {
    return this.driveTypesService.add(addDriveTypeDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateDriveTypeDto: AddDriveTypeDto) {
    return this.driveTypesService.updateOne(params, updateDriveTypeDto);
  }

  @Get()
  findAll() {
    return this.driveTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.driveTypesService.findOne(params);
  }
}