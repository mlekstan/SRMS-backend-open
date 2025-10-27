import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddBranchDto } from "./dto/add-branch.dto";
import { BranchesService } from "./branches.service";

@Controller("branches")
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Post()
  add(@Body() addBranch: AddBranchDto) {
    return this.branchesService.add(addBranch)
  }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }
}