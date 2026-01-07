import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AddBranchDto } from "./dto/add-branch.dto";
import { BranchesService } from "./branches.service";
import { Branch } from "./branch.entity";

@Controller("branches")
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  /**
   * Create new branch
   * @remarks This operation allows you to create new company branch.
   */
  @Post()
  add(@Body() addBranchDto: AddBranchDto): Promise<Branch> {
    return this.branchesService.add(addBranchDto);
  }

  /**
   * Update exsisting branch
   * @remarks This operation allows you to update exsisting company branch.
   */
  @Put(":id")
  updateOne(
    @Param("id", ParseIntPipe) id: number, 
    @Body() updateBranchDto: AddBranchDto
  ) {
    return this.branchesService.updateOne(id, updateBranchDto);
  }

  /**
   * Find all branches
   * @remarks This operation allows you to get all exsisting company branches.
   */
  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  /**
   * Find one branch
   * @remarks This operation allows you to get one company branch by ID.
   */
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.branchesService.findOne(id);
  }
}

