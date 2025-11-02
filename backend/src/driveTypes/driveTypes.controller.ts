import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddDriveTypeDto } from "./dto/add-driveType.dto";
import { DrvieTypesService } from "./driveTypes.service";


@Controller("drive-types")
export class DriveTypesController {
  constructor(private driveTypesService: DrvieTypesService) {}


  @Post()
  add(@Body() addDriveTypeDto: AddDriveTypeDto) {
    return this.driveTypesService.add(addDriveTypeDto);
  }

  @Get()
  findAll() {
    return this.driveTypesService.findAll();
  }
}