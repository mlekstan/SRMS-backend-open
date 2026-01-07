import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Subcategory } from "./subcategory.entity";
import { Vehicle } from "./vehicle.entity";
import { ElectricVehicle } from "./electricVehicle.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { SubcategoryIface } from "./interfaces/subcategory.interface";


@Injectable()
export class SubcategoriesService {
  private dataSource: DataSource
  private subcategoriesRepository: Repository<Subcategory>
  private vehiclesRepository: Repository<Vehicle>
  private electricVehicleRepository: Repository<ElectricVehicle>

  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(Subcategory) subcategoriesRepository: Repository<Subcategory>,
    @InjectRepository(Vehicle) vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(ElectricVehicle) electricVehicleRepository: Repository<ElectricVehicle>
  ) {
    this.dataSource = dataSource;
    this.subcategoriesRepository = subcategoriesRepository;
    this.vehiclesRepository = vehiclesRepository;
    this.electricVehicleRepository = electricVehicleRepository;
  }

  async add(subcategory: SubcategoryIface) {
    const { subcategoryData, vehicleData, electricVehicleData } = subcategory;

    try {
      await this.dataSource.transaction(async (manager) => {
        const subcategoryRow = manager.create(Subcategory, {
          name: subcategoryData.name,
          category: { id: subcategoryData.categoryId }
        });

        await manager.save(subcategoryRow);
        
        if (subcategoryData.categoryId === 1) {
          const vehicleRow = manager.create(Vehicle, {
            id: subcategoryRow.id,
            curbWeight: vehicleData.curbWeight,
            maxLoad: vehicleData.maxLoad,
            minAge: vehicleData.minAge,
            maxAge: vehicleData.maxAge,
            driveType: { id: vehicleData.driveTypeId }
          });

          await manager.save(vehicleRow);

          if (vehicleData.driveTypeId === 2) {
            const electricVehicleRow = manager.create(ElectricVehicle, {
              id: vehicleRow.id,
              enginePower: electricVehicleData.enginePower,
              batteryVoltage: electricVehicleData.batteryVoltage,
              batteryCapacity: electricVehicleData.batteryCapacity
            });

            await manager.save(electricVehicleRow);
          }
        } 
      });

      return subcategory;
    
    } catch (error) {
      throw error;
    }
  }

  async updateOne(params: { id: string }, subcategory: SubcategoryIface) {
    const { subcategoryData, vehicleData, electricVehicleData } = subcategory;
    const id = Number(params.id);

    return this.dataSource.transaction(async (manager) => {

      await manager.update(Subcategory, id, {
        name: subcategoryData.name,
        category: { id: subcategoryData.categoryId }
      });

      if (subcategoryData.categoryId !== 1) {
        await manager.delete(ElectricVehicle, { id });
        await manager.delete(Vehicle, { id });
        return subcategory;
      }

      await manager.save(Vehicle, {
        id,
        curbWeight: vehicleData.curbWeight,
        maxLoad: vehicleData.maxLoad,
        minAge: vehicleData.minAge,
        maxAge: vehicleData.maxAge,
        driveType: { id: vehicleData.driveTypeId }
      });

      if (vehicleData.driveTypeId !== 2) {
        await manager.delete(ElectricVehicle, { id });
        return subcategory;
      }

      await manager.save(ElectricVehicle, {
        id,
        enginePower: electricVehicleData.enginePower,
        batteryVoltage: electricVehicleData.batteryVoltage,
        batteryCapacity: electricVehicleData.batteryCapacity
      });

      return subcategory;
    });
  }

  async findAll(categoryId: number) {
    const where = categoryId ? { category: { id: categoryId } } : {};

    const subcategories = await this.subcategoriesRepository.find({
      where,
      relations: {
        category: true
      },
      select: {
        id: true,
        name: true,
        category: {
          id: true,
          name: true,
        }
      },
    });

    return subcategories;
  }

  async findOne(params: { id: string }) {
    const subcategoryRow = await this.subcategoriesRepository.findOneOrFail({
      relations: {
        category: true,
      },
      where: {
        id: Number(params.id)
      },
      select: {
        id: true,
        name: true,
        category: {
          id: true,
          name: true
        },
      }
    });

    const vehicleRow = await this.vehiclesRepository.findOne({
      relations: {
        driveType: true,
        electricVehicle: true,
      },
      where: {
        id: Number(params.id)
      },
      select: {
        id: true,
        curbWeight: true,
        maxLoad: true,
        minAge: true,
        maxAge: true,
        driveType: {
          id: true,
          name: true
        },
        electricVehicle: {
          id: true,
          enginePower: true,
          batteryVoltage: true,
          batteryCapacity: true,
        }
      }
    });

    const result = { ...subcategoryRow, vehicle: vehicleRow };

    return result;
  }

}