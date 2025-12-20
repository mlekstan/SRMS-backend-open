import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DriveType } from "./driveType.entity";
import { copyToRow } from "../helper-functions/copyToRow";
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

  async updateOne(params: { id: string }, driveType: DriveTypeIface) {
    const { driveTypeData } = driveType;

    const driveTypeRow = this.driveTypesRpository.create({
      id: Number(params.id),
      name: driveTypeData.name
    });

    return await this.driveTypesRpository.save(driveTypeRow);
  }

  async findAll() {
    try {
      const driveTypes = await this.driveTypesRpository.find();
      return driveTypes;

    } catch (error) {
      throw error;
    }
  }

  async findOne(params: { id: string }) {
    const driveType = await this.driveTypesRpository.findOneOrFail({
      where: {
        id: Number(params.id)
      }
    });

    return driveType;
  }
}