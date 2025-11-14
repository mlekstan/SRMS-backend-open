import { Injectable } from "@nestjs/common";
import { BranchIface } from "./interfaces/branch.interface";
import { Repository } from "typeorm";
import { Branch } from "./branch.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BranchesService {
  private branchesRepository: Repository<Branch>

  constructor(
    @InjectRepository(Branch) branchesRepository: Repository<Branch>
  ) {
    this.branchesRepository = branchesRepository;
  }

  async add(branch: BranchIface) {
    try {
      const { branchData } = branch;

      const branchRow = this.branchesRepository.create({
        name: branchData.name,
        country: branchData.country,
        city: branchData.city,
        street: branchData.street,
        streetNumber: branchData.streetNumber,
        flatNumber: branchData.flatNumber,
        zipCode: branchData.zipCode
      });

      return await this.branchesRepository.save(branchRow);
    
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async updateOne(params: { id: string }, branch: BranchIface) {
    const { branchData } = branch;
    
    const branchRow = this.branchesRepository.create({
      id: Number(params.id),
      name: branchData.name,
      country: branchData.country,
      city: branchData.city,
      street: branchData.street,
      streetNumber: branchData.streetNumber,
      flatNumber: branchData.flatNumber,
      zipCode: branchData.zipCode
    });

    return this.branchesRepository.save(branchRow);
  }


  async findAll() {
    const branches = await this.branchesRepository.find();
    return branches;
  }

  async findOne(params: { id: string }) {
    return await this.branchesRepository.findOneOrFail({
      where: {
        id: Number(params.id)
      }
    });
  }
}