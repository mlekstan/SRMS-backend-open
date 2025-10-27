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
    
  }

  async findAll() {
    const branches = await this.branchesRepository.find();
    return branches;
  }

}