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

  async findAll() {
    const branches = await this.branchesRepository.find();
    return branches;
  }

}