import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DriveType } from "./driveType.entity";
import { copyToRow } from "src/helper-functions/copyToRow";
import { DriveTypeIface } from "./interfaces/driveType.interface";


@Injectable()
export class DrvieTypesService {
  private driveTypesRpository: Repository<DriveType>

  constructor(@InjectRepository(DriveType) driveTypesRepository: Repository<DriveType>) {
    this.driveTypesRpository = driveTypesRepository;
  }

  async add(driveType: DriveTypeIface) {
    try {
      const driveTypeRow = new DriveType();
      
      copyToRow(driveTypeRow, driveType);

      return (
        await this.driveTypesRpository.save(driveTypeRow)
      );

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const driveTypes = await this.driveTypesRpository.find();
      return driveTypes;

    } catch (error) {
      throw error;
    }
  }
}